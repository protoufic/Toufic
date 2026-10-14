import { NextResponse } from 'next/server';

const PARTNERSHIP_EDGE_URL = 'https://eicjgsjkeqiceldcfwjp.supabase.co/functions/v1/partnership-lead';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const response = await fetch(PARTNERSHIP_EDGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  }).catch(() => null);

  if (!response) {
    return NextResponse.json({ ok: false, error: 'Partnership service unavailable.' }, { status: 503 });
  }

  const payload = await response.json().catch(() => ({ ok: false, error: 'Unexpected partnership service response.' }));
  return NextResponse.json(payload, { status: response.status });
}
