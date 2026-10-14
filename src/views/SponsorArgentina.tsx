import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Bike, Check, ChevronRight, Crown, Gauge, ImagePlus, Layers3, LockKeyhole, Mail, ShieldCheck, Sparkles, Upload, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MarketplaceScene } from '../components/MarketplaceScene';
import { argentinaMarketplace, argentinaSpots, type MarketplaceAsset, type SponsorSpot } from '../data/marketplace';

const money = (value: number) => '$' + value.toLocaleString('en-US');

const modeMeta: Record<MarketplaceAsset, { label: string; icon: typeof Bike }> = {
  athlete: { label: 'Trisuit', icon: Layers3 },
  helmet: { label: 'Helmet', icon: ShieldCheck },
  bike: { label: 'Bike', icon: Bike },
};

function PartnershipForm({ selectedSpot, onClose }: { selectedSpot: SponsorSpot | null; onClose: () => void }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState('sending');
    const payload = {
      contactName: String(form.get('contactName') || ''),
      email: String(form.get('email') || ''),
      companyName: String(form.get('companyName') || ''),
      budgetBand: String(form.get('budgetBand') || ''),
      desiredOutcomes: selectedSpot ? ['placement:' + selectedSpot.id] : ['custom_brand_partnership'],
      contributionModes: ['sponsorship'],
      notes: String(form.get('notes') || ''),
    };
    try {
      const response = await fetch('/api/partnership-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setState(response.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="market-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="market-modal" role="dialog" aria-modal="true" aria-labelledby="market-partnership-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="market-modal-close" type="button" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <p className="eyebrow">{selectedSpot ? 'PLACEMENT REQUEST' : 'CUSTOM PARTNERSHIP'}</p>
        <h2 id="market-partnership-title">{selectedSpot ? 'Request ' + selectedSpot.label : 'Take over more than a spot.'}</h2>
        <p className="market-modal-intro">{selectedSpot ? 'Send your details and we will confirm creative fit, physical placement and the commercial path before anything is charged.' : 'Full trisuit, helmet, bike, chest takeover, full race and multi-race packages are handled directly.'}</p>
        {state === 'sent' ? (
          <div className="market-form-success"><BadgeCheck size={28} /><strong>Request received.</strong><p>We will continue the partnership discussion directly.</p></div>
        ) : (
          <form className="market-form" onSubmit={submit}>
            <label><span>Name *</span><input name="contactName" required autoComplete="name" /></label>
            <label><span>Email *</span><input name="email" required type="email" autoComplete="email" /></label>
            <label><span>Company / brand</span><input name="companyName" autoComplete="organization" /></label>
            <label><span>Budget range</span><select name="budgetBand" defaultValue=""><option value="">Choose a range</option><option value="under_2500">Under $2.5K</option><option value="2500_10000">$2.5K–$10K</option><option value="10000_25000">$10K–$25K</option><option value="25000_plus">$25K+</option></select></label>
            <label className="market-form-wide"><span>What do you want to build?</span><textarea name="notes" rows={4} placeholder="Logo placement, full trisuit, bike livery, helmet takeover, content activation, multi-race package…" /></label>
            {state === 'error' && <p className="market-form-error">The form could not save yet. Email <a href="mailto:protoufic@gmail.com?subject=Toufic.co%20sponsorship">protoufic@gmail.com</a> and include the same details.</p>}
            <button className="button-primary market-form-submit" disabled={state === 'sending'} type="submit">{state === 'sending' ? 'Sending…' : 'Send partnership request'} <ArrowRight size={16} /></button>
          </form>
        )}
      </div>
    </div>
  );
}

export function SponsorArgentinaPage() {
  const [mode, setMode] = useState<MarketplaceAsset>('athlete');
  const [selectedSpot, setSelectedSpot] = useState<SponsorSpot | null>(argentinaSpots[0]);
  const [logoUrl, setLogoUrl] = useState<string>();
  const [partnershipOpen, setPartnershipOpen] = useState(false);

  const modeSpots = useMemo(() => argentinaSpots.filter((spot) => spot.asset === mode), [mode]);

  const selectSpot = (spot: SponsorSpot) => {
    setMode(spot.asset);
    setSelectedSpot(spot);
  };

  const uploadLogo = (file?: File) => {
    if (!file) return;
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogoUrl(URL.createObjectURL(file));
  };

  return (
    <Layout>
      <div className="market-page">
        <section className="market-topbar">
          <div className="site-shell market-topbar-inner">
            <Link to="/sponsor"><ArrowLeft size={15} /> Sponsor</Link>
            <span>Argentina · Race 01</span>
            <div><i /> Marketplace build preview</div>
          </div>
        </section>

        <section className="market-hero">
          <div className="site-shell market-hero-head">
            <div>
              <p className="eyebrow">SOUTH AMERICA · ARGENTINA</p>
              <h1>Put your mark on the next starting line.</h1>
            </div>
            <div className="market-hero-meta">
              <span><small>CORE INVENTORY</small><strong>13 spots</strong></span>
              <span><small>MARKET CLOSE</small><strong>{argentinaMarketplace.closeLabel}</strong></span>
              <span><small>CHECKOUT</small><strong>Final QA first</strong></span>
            </div>
          </div>
        </section>

        <section className="market-workspace">
          <div className="site-shell market-workspace-grid">
            <div className="market-stage-column">
              <div className="market-mode-tabs" role="tablist" aria-label="Marketplace asset">
                {(Object.keys(modeMeta) as MarketplaceAsset[]).map((asset) => {
                  const Icon = modeMeta[asset].icon;
                  return <button key={asset} className={mode === asset ? 'active' : ''} onClick={() => { setMode(asset); setSelectedSpot(argentinaSpots.find((spot) => spot.asset === asset) || null); }}><Icon size={15} /> {modeMeta[asset].label}</button>;
                })}
              </div>
              <MarketplaceScene mode={mode} spots={modeSpots} selectedSpot={selectedSpot?.asset === mode ? selectedSpot : null} logoUrl={logoUrl} onSelect={selectSpot} />
              <div className="market-stage-footer">
                <span><Gauge size={15} /> Interactive production geometry</span>
                <span><ShieldCheck size={15} /> Creative approval required</span>
                <span><LockKeyhole size={15} /> Checkout remains disabled until final QA</span>
              </div>
            </div>

            <aside className="market-panel">
              {selectedSpot ? (
                <>
                  <div className="market-panel-head">
                    <div><span className={'market-tier market-tier-' + selectedSpot.tier}>{selectedSpot.tier}</span><small>{modeMeta[selectedSpot.asset].label}</small></div>
                    <h2>{selectedSpot.label}</h2>
                    <p>One of {argentinaMarketplace.coreCount} deliberately scarce core placements for Argentina.</p>
                  </div>

                  <div className="market-price-block">
                    <span>Opening takeover</span>
                    <strong>{money(selectedSpot.nextPrice)}</strong>
                    <small>Current level 1 · USD</small>
                  </div>

                  <label className="market-upload">
                    <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={(event) => uploadLogo(event.target.files?.[0])} />
                    <ImagePlus size={20} />
                    <span><strong>{logoUrl ? 'Replace preview artwork' : 'Preview your logo here'}</strong><small>PNG, JPG, WebP or SVG · preview only</small></span>
                    <Upload size={16} />
                  </label>

                  <div className="market-checklist">
                    <span><Check size={15} /> Fitted sponsor overlay</span>
                    <span><Check size={15} /> Dedicated camera focus</span>
                    <span><Check size={15} /> Logo orientation tested</span>
                    <span><Check size={15} /> Physical print confirmation still required</span>
                  </div>

                  <button className="button-primary market-request-button" onClick={() => setPartnershipOpen(true)}>Request this placement <ArrowRight size={16} /></button>
                  <p className="market-checkout-note">Self-serve payment activates only after legal, production, webhook and real-device QA. No charge is taken from this preview.</p>
                </>
              ) : <div className="market-empty-panel">Choose a placement to inspect it.</div>}
            </aside>
          </div>
        </section>

        <section className="market-inventory section">
          <div className="site-shell">
            <div className="section-heading section-heading-wide"><p className="eyebrow">13 CORE PLACEMENTS</p><h2>Scarcity is part of the product.</h2><p>We are not covering every available centimeter with micro-logos. These are the core launch surfaces.</p></div>
            <div className="market-inventory-grid">
              {argentinaSpots.map((spot, index) => (
                <button key={spot.id} className={'market-inventory-card ' + (selectedSpot?.id === spot.id ? 'active' : '')} onClick={() => selectSpot(spot)}>
                  <span className="market-inventory-index">{String(index + 1).padStart(2, '0')}</span>
                  <div><small>{modeMeta[spot.asset].label} · {spot.tier}</small><strong>{spot.label}</strong></div>
                  <span className="market-inventory-price">{money(spot.basePrice)}</span>
                  <ChevronRight size={17} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="market-custom section">
          <div className="site-shell market-custom-card">
            <div>
              <p className="eyebrow">WANT MORE THAN A SPOT?</p>
              <h2>Take over the canvas.</h2>
              <p>A larger partner can discuss both chest panels, a full trisuit, full bike, full helmet, all equipment, an entire race or a multi-race activation.</p>
              <div className="market-custom-tags">{argentinaMarketplace.customModes.map((modeName) => <span key={modeName}>{modeName}</span>)}</div>
            </div>
            <div className="market-custom-action">
              <Crown size={38} />
              <strong>Custom partnership</strong>
              <p>Built manually around your brand, creative ambition, race scope and rights package.</p>
              <button className="button-primary" onClick={() => { setSelectedSpot(null); setPartnershipOpen(true); }}>Discuss a takeover <Sparkles size={16} /></button>
              <a href="mailto:protoufic@gmail.com?subject=Toufic.co%20custom%20partnership"><Mail size={15} /> Or email directly</a>
            </div>
          </div>
        </section>
      </div>
      {partnershipOpen && <PartnershipForm selectedSpot={selectedSpot} onClose={() => setPartnershipOpen(false)} />}
    </Layout>
  );
}
