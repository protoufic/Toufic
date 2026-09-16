export type SupportEventName =
  | 'support_landing_view'
  | 'support_cta_click'
  | 'payment_region_selected'
  | 'gofundme_click'
  | 'whish_click'
  | 'omt_click'
  | 'purpl_click'
  | 'mymonty_click'
  | 'local_number_copy'
  | 'partner_enquiry_click'
  | 'media_enquiry_click'
  | 'supporter_consent_click'
  | 'share_click';

type EventParameters = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function campaignContext() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  let referrerHost = '';

  if (document.referrer) {
    try {
      referrerHost = new URL(document.referrer).hostname;
    } catch {
      referrerHost = '';
    }
  }

  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || undefined,
    referrer_host: referrerHost || undefined,
    page_path: window.location.pathname,
  };
}

export function trackSupportEvent(name: SupportEventName, parameters: EventParameters = {}) {
  if (typeof window === 'undefined') return;

  const detail = {
    event: name,
    ...campaignContext(),
    ...parameters,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(detail);
  window.gtag?.('event', name, detail);
  window.dispatchEvent(new CustomEvent('toufic:support-event', { detail }));

  const body = JSON.stringify(detail);
  if (navigator.sendBeacon) {
    const queued = navigator.sendBeacon('/api/support-events', new Blob([body], { type: 'application/json' }));
    if (queued) return;
  }

  void fetch('/api/support-events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
