import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AppErrorBoundary } from './components/AppErrorBoundary';

const reloadKey = 'toufic-latest-build-reload';

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  const current = `${window.location.pathname}${window.location.search}`;
  if (sessionStorage.getItem(reloadKey) !== current) {
    sessionStorage.setItem(reloadKey, current);
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

requestAnimationFrame(() => {
  document.documentElement.dataset.appReady = 'true';
  sessionStorage.removeItem(reloadKey);
});
