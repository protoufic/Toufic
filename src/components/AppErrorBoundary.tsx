import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Website render error', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="app-error-fallback" role="alert">
        <div className="app-error-card">
          <p className="eyebrow">Toufic Abou Ali · Six Continents</p>
          <h1>The website did not finish loading.</h1>
          <p>Please reload once. The page will reconnect to the newest version.</p>
          <div className="app-error-actions">
            <button type="button" className="button-primary" onClick={() => window.location.reload()}>
              Reload website
            </button>
            <a className="button-quiet" href="/mission">Open the mission</a>
          </div>
        </div>
      </main>
    );
  }
}
