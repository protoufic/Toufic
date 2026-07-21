export function openContactPanel(intent: 'partnership' | 'media' | 'general' = 'partnership') {
  window.dispatchEvent(new CustomEvent('open-contact-panel', { detail: { intent } }));
}
