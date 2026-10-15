import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const URL_BASE = 'https://eicjgsjkeqiceldcfwjp.supabase.co/rest/v1';

async function publicRead(path: string) {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!key) throw new Error('Public data key is not configured');
  const response = await fetch(URL_BASE + path, {
    headers: { apikey: key },
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error('Published data unavailable');
  return response.json();
}

export async function GET() {
  try {
    // RLS plus explicit published/verified filters; no service-role key.
    const [events, bests] = await Promise.all([
      publicRead('/proof_events?select=slug,title,event_date,date_label,location,discipline,distance_label,time_label,result_label,is_podium,featured,images,links,notes&published=eq.true&verified=eq.true&order=event_date.desc.nullslast&limit=150'),
      publicRead('/performance_bests?select=code,label,distance_label,performance_label,result_type,evidence_url,note,sort_order&published=eq.true&order=sort_order.asc&limit=20'),
    ]);
    return NextResponse.json(
      { ok: true, events, bests },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120', 'X-Content-Type-Options': 'nosniff' } },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Verified proof is temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
