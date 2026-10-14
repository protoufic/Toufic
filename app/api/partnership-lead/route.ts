import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.email || !body.contactName) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false, error: 'Partnership intake is not configured yet.' }, { status: 503 });
  }

  const response = await fetch(supabaseUrl + '/rest/v1/partnership_leads', {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: 'Bearer ' + serviceKey,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      company_name: body.companyName || null,
      contact_name: body.contactName,
      email: body.email,
      budget_band: body.budgetBand || null,
      desired_outcomes: Array.isArray(body.desiredOutcomes) ? body.desiredOutcomes : [],
      contribution_modes: Array.isArray(body.contributionModes) ? body.contributionModes : [],
      source: 'sponsor_argentina_custom',
      status: 'new',
      notes: body.notes || null,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, error: 'Could not save partnership request.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
