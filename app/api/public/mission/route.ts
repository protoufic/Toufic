import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const BASE = 'https://eicjgsjkeqiceldcfwjp.supabase.co/rest/v1';
export async function GET() {
  try {
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!key) throw new Error('Missing publishable key');
    const response = await fetch(BASE + '/races?select=slug,title,city,country,continent,race_date,status,registration_status,public_summary,sort_order&published=eq.true&order=sort_order.asc&limit=6', {
      headers: { apikey: key }, cache: 'no-store', signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Unavailable');
    const races = await response.json();
    if (!Array.isArray(races) || races.length !== 6) throw new Error('Incomplete route');
    return NextResponse.json({ ok: true, races }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120', 'X-Content-Type-Options': 'nosniff' },
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Mission route unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
