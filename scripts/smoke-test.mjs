import { spawn } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const host = "127.0.0.1";
const port = 3344;
const routes = [
  "/",
  "/partners",
  "/proof",
  "/mission",
  "/founder",
  "/warsaw",
  "/media",
  "/support",
  "/story",
  "/record",
  "/ironman",
];

const server = spawn(
  process.execPath,
  [resolve("node_modules/next/dist/bin/next"), "start", "--hostname", host, "--port", String(port)],
  { stdio: ["ignore", "pipe", "pipe"], env: process.env },
);

let logs = "";
const ready = new Promise((resolveReady, reject) => {
  const timer = setTimeout(() => reject(new Error(`Server did not become ready.\n${logs}`)), 15_000);
  const inspect = (chunk) => {
    logs += chunk.toString();
    if (logs.includes("Ready")) {
      clearTimeout(timer);
      resolveReady();
    }
  };
  server.stdout.on("data", inspect);
  server.stderr.on("data", inspect);
  server.once("exit", (code) => reject(new Error(`Server exited with code ${code}.\n${logs}`)));
});

try {
  await ready;
  for (const route of routes) {
    const response = await fetch(`http://${host}:${port}${route}`);
    if (response.status !== 200) {
      throw new Error(`${route} returned HTTP ${response.status}`);
    }
    await response.arrayBuffer();
  }

  const supportResponse = await fetch(`http://${host}:${port}/support`);
  const supportHtml = await supportResponse.text();
  const requiredSupportContent = [
    '€30,000',
    '€1,000',
    'Annahar',
    'Noursat',
    'Télé Liban',
    'One record attempt. Hundreds of names behind it.',
  ];

  for (const expected of requiredSupportContent) {
    if (!supportHtml.includes(expected)) {
      throw new Error(`/support is missing required content: ${expected}`);
    }
  }

  if (supportHtml.includes('76 923 943')) {
    throw new Error('/support exposes the local wallet number before a visitor chooses Lebanon');
  }

  const chunkRoot = resolve('dist/static/chunks');
  const chunkFiles = (await readdir(chunkRoot, { recursive: true })).filter((path) => path.endsWith('.js'));
  const supportScripts = await Promise.all(chunkFiles.map((path) => readFile(resolve(chunkRoot, path), 'utf8')));
  const supportClientCode = supportScripts.join('\n');
  for (const expected of ['https://gofund.me/5612179bc', '76 923 943', 'Purpl', 'MyMonty']) {
    if (!supportClientCode.includes(expected)) {
      throw new Error(`/support client code is missing payment configuration: ${expected}`);
    }
  }

  const acceptedEvent = await fetch(`http://${host}:${port}/api/support-events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'purpl_click', method: 'purpl' }),
  });
  if (acceptedEvent.status !== 204) {
    throw new Error(`Allowed analytics event returned HTTP ${acceptedEvent.status}`);
  }

  const rejectedEvent = await fetch(`http://${host}:${port}/api/support-events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'unsupported_event' }),
  });
  if (rejectedEvent.status !== 400) {
    throw new Error(`Unsupported analytics event returned HTTP ${rejectedEvent.status}`);
  }

  console.log(`Smoke test passed for ${routes.length} routes, support content, and analytics allowlist.`);
} finally {
  server.kill("SIGTERM");
}
