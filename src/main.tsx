import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AppErrorBoundary } from './components/AppErrorBoundary';

const preloadReloadKey = 'toufic-preload-reload-at';
const preloadReloadWindowMs = 15_000;

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();

  const now = Date.now();
  const previousReload = Number(sessionStorage.getItem(preloadReloadKey) || 0);

  // Reload once when an older cached page asks for a chunk removed by a newer
  // deployment. The time guard prevents a permanent reload loop when the
  // visitor is offline or a browser extension blocks the request.
  if (!Number.isFinite(previousReload) || now - previousReload > preloadReloadWindowMs) {
    sessionStorage.setItem(preloadReloadKey, String(now));
    window.location.reload();
  }
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement, {
  onUncaughtError: (error) => console.error('Uncaught website error', error),
  onRecoverableError: (error) => console.error('Recoverable website error', error),
}).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
);

// Clear the one-reload guard only after the latest build has remained loaded
// long enough to prove that its chunks are usable.
window.addEventListener('load', () => {
  window.setTimeout(() => sessionStorage.removeItem(preloadReloadKey), preloadReloadWindowMs);
}, { once: true });
