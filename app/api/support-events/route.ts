import { NextRequest } from 'next/server';

const allowedEvents = new Set([
  'support_landing_view',
  'support_cta_click',
  'payment_region_selected',
  'gofundme_click',
  'whish_click',
  'omt_click',
  'purpl_click',
  'mymonty_click',
  'local_number_copy',
  'support_note_copy',
  'partner_enquiry_click',
  'media_enquiry_click',
  'supporter_consent_click',
  'share_click',
]);

function cleanText(value: unknown, maxLength = 120) {
  return typeof value === 'string' ? value.slice(0, maxLength) : null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || !allowedEvents.has(body.event)) {
      return Response.json({ error: 'Unsupported event' }, { status: 400 });
    }

    const record = {
      event: body.event,
      occurredAt: new Date().toISOString(),
      country: cleanText(request.headers.get('x-vercel-ip-country'), 3),
      pagePath: cleanText(body.page_path),
      source: cleanText(body.utm_source),
      medium: cleanText(body.utm_medium),
      campaign: cleanText(body.utm_campaign),
      content: cleanText(body.utm_content),
      referrerHost: cleanText(body.referrer_host),
      placement: cleanText(body.placement),
      region: cleanText(body.region),
      method: cleanText(body.method),
      destinationReady: typeof body.destination_ready === 'boolean' ? body.destination_ready : null,
    };

    // Structured Vercel logs provide a minimal first party record without card details,
    // names, email addresses, precise location, IP storage or supporter amounts.
    console.info('support_event', JSON.stringify(record));
    return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
