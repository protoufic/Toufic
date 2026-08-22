import { spawn } from "node:child_process";
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
  console.log(`Smoke test passed for ${routes.length} routes.`);
} finally {
  server.kill("SIGTERM");
}
