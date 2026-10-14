import { ArrowRight, BadgeDollarSign, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function SponsorPage() {
  return (
    <Layout>
      <div className="sponsor-gateway">
        <section className="sponsor-gateway-hero">
          <div className="site-shell sponsor-gateway-grid">
            <div>
              <p className="eyebrow">SPONSOR THE MISSION</p>
              <h1>Own a visible part of the next starting line.</h1>
              <p>Argentina is the first live sponsorship chapter: scarce placements on the trisuit, helmet and bike, plus custom full-takeover partnerships for brands that want more than a logo.</p>
              <div className="sponsor-gateway-actions">
                <Link className="button-primary" to="/sponsor/argentina">Explore Argentina <ArrowRight size={16} /></Link>
                <Link className="button-quiet" to="/partners">Discuss a custom partnership</Link>
              </div>
            </div>
            <div className="sponsor-gateway-visual">
              <img src="/assets/3d/argentina/poster_full_front.webp" alt="Toufic-inspired athlete sponsorship model" />
              <div className="sponsor-gateway-stat"><strong>13</strong><span>core placements</span></div>
            </div>
          </div>
        </section>
        <section className="section sponsor-principles">
          <div className="site-shell">
            <div className="section-heading"><p className="eyebrow">BUILT FOR SCARCITY</p><h2>Fewer spots. Higher signal.</h2><p>The launch inventory stays deliberately tight instead of covering every surface with small logos.</p></div>
            <div className="sponsor-principle-grid">
              <article><BadgeDollarSign /><h3>Deterministic pricing</h3><p>Each placement has a visible takeover ladder. No hidden auction mechanics.</p></article>
              <article><Layers3 /><h3>Real surfaces</h3><p>Placements map to fitted 3D geometry on the trisuit, helmet and bike.</p></article>
              <article><Sparkles /><h3>Custom takeover</h3><p>A larger partner can own the chest, full trisuit, bike, helmet or the whole race canvas.</p></article>
              <article><ShieldCheck /><h3>Approval controlled</h3><p>Creative and physical production remain subject to review before race-day application.</p></article>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
