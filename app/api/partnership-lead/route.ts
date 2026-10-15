import { NextResponse } from 'next/server';

const EDGE_URL = 'https://eicjgsjkeqiceldcfwjp.supabase.co/functions/v1/partnership-lead';
const MAX_BYTES = 16_384;
const budgetBands = new Set(['', 'under_2500', '2500_10000', '10000_25000', '25000_plus']);

function failed(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status, headers: { 'Cache-Control': 'no-store' } });
}

function bounded(value: unknown, max: number): string | null {
  if (typeof value !== 'string' || value.length > max) return null;
  return value.trim();
}

async function readLimited(request: Request): Promise<unknown> {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let size = 0;
  let text = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) throw new Error('Payload too large');
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text);
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin) {
    let requestOrigin: string;
    try { requestOrigin = new URL(request.url).origin; }
    catch { return failed(400, 'Invalid request URL.'); }
    if (origin !== requestOrigin) return failed(403, 'Cross-origin requests are not accepted.');
  }
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return failed(415, 'Send JSON content.');
  }
  const contentLength = request.headers.get('content-length');
  if (contentLength && Number(contentLength) > MAX_BYTES) return failed(413, 'Request is too large.');

  let data: unknown;
  try { data = await readLimited(request); }
  catch { return failed(400, 'Invalid or oversized request.'); }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return failed(400, 'Invalid form data.');

  const body = data as Record<string, unknown>;
  // Honeypot: keep the existing Edge Function's no-op response for bots.
  if (typeof body.website === 'string' && body.website.trim()) return NextResponse.json({ ok: true });
  const contactName = bounded(body.contactName, 120);
  const email = bounded(body.email, 200)?.toLowerCase();
  const companyName = bounded(body.companyName ?? '', 160);
  const budgetBand = bounded(body.budgetBand ?? '', 80);
  const notes = bounded(body.notes ?? '', 3000);
  const desired = body.desiredOutcomes;
  const modes = body.contributionModes;
  if (!contactName || contactName.length < 2 || !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      companyName === null || budgetBand === null || !budgetBands.has(budgetBand) ||
      notes === null || !Array.isArray(desired) || !Array.isArray(modes) ||
      desired.length < 1 || desired.length > 10 || modes.length > 10 ||
      !desired.every((x) => typeof x === 'string' && x.length <= 120 && (x === 'custom_brand_partnership' || /^placement:[a-z0-9_-]{2,80}$/.test(x))) ||
      !modes.every((x) => x === 'sponsorship')) {
    return failed(400, 'Please check the submitted details.');
  }
  try {
    const response = await fetch(EDGE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactName, email, companyName, budgetBand, notes, desiredOutcomes: desired, contributionModes: modes }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    if (response.status === 429) return failed(429, 'Too many requests. Please try later.');
    if (!response.ok) return failed(502, 'Partnership service could not save the request.');
    const result = await response.json().catch(() => null);
    if (!result || result.ok !== true) return failed(502, 'Partnership service did not confirm the request.');
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return failed(503, 'Partnership service temporarily unavailable.');
  }
}
