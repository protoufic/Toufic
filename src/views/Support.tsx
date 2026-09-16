import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Copy, ExternalLink, Globe2, Heart, MapPin, Share2, ShieldCheck, WalletCards, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { publicSupporters, supportConfig, type LocalPaymentMethodKey } from '../data/support';
import { trackSupportEvent } from '../utils/supportAnalytics';

type Region = 'international' | 'lebanon';

function money(value: number, currency: string) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function GoFundMeChoice({ onFollow }: { onFollow: () => void }) {
  const payment = supportConfig.payments.gofundme;
  return (
    <a
      className="support-payment-choice"
      href={payment.url!}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => {
        trackSupportEvent('gofundme_click', { method: 'gofundme', destination_ready: true });
        onFollow();
      }}
    >
      <span className="support-payment-icon"><WalletCards size={21} /></span>
      <span>
        <strong>{payment.label}</strong>
        <small>{payment.description}</small>
      </span>
      <ExternalLink size={18} aria-hidden="true" />
    </a>
  );
}

const localWalletEvents = {
  whish: 'whish_click',
  omt: 'omt_click',
  purpl: 'purpl_click',
  mymonty: 'mymonty_click',
} as const;

function LocalWalletChoice({ method, onSelect }: { method: LocalPaymentMethodKey; onSelect: (method: LocalPaymentMethodKey) => void }) {
  const payment = supportConfig.payments[method];

  return (
    <button className="support-payment-choice" onClick={() => onSelect(method)}>
      <span className="support-payment-icon"><WalletCards size={21} /></span>
      <span>
        <strong>{payment.label}</strong>
        <small>{payment.description}</small>
      </span>
      <ArrowRight size={18} aria-hidden="true" />
    </button>
  );
}

function PaymentSheet({ onClose }: { onClose: () => void }) {
  const [region, setRegion] = useState<Region | null>(null);
  const [selectedLocalWallet, setSelectedLocalWallet] = useState<LocalPaymentMethodKey | null>(null);
  const [copyStatus, setCopyStatus] = useState('Copy number');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => dialogRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const goBack = () => {
    if (selectedLocalWallet) {
      setSelectedLocalWallet(null);
      setCopyStatus('Copy number');
      return;
    }
    setRegion(null);
  };

  const selectLocalWallet = (method: LocalPaymentMethodKey) => {
    setSelectedLocalWallet(method);
    trackSupportEvent(localWalletEvents[method], { method, destination_ready: true });
  };

  const copyLocalNumber = async () => {
    let copied = false;

    try {
      await navigator.clipboard.writeText(supportConfig.localTransfer.copyValue);
      copied = true;
    } catch {
      const input = document.createElement('textarea');
      input.value = supportConfig.localTransfer.copyValue;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      copied = document.execCommand('copy');
      input.remove();
    }

    if (!copied) {
      setCopyStatus('Select number above');
      return;
    }

    setCopyStatus('Number copied');
    trackSupportEvent('local_number_copy', { method: selectedLocalWallet });
    window.setTimeout(() => setCopyStatus('Copy number'), 1800);
  };

  const title = selectedLocalWallet
    ? `Transfer with ${supportConfig.payments[selectedLocalWallet].label}.`
    : region
      ? 'Choose a payment method.'
      : 'Where are you supporting from?';

  return (
    <div className="support-sheet-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="support-sheet" role="dialog" aria-modal="true" aria-labelledby="support-sheet-title" tabIndex={-1} ref={dialogRef}>
        <button className="support-sheet-close" onClick={onClose} aria-label="Close payment choices"><X size={22} /></button>

        {region && (
          <button className="support-sheet-back" onClick={goBack}>
            <ArrowLeft size={16} /> {selectedLocalWallet ? 'Back to Lebanese wallets' : 'Choose another location'}
          </button>
        )}

        <p className="support-kicker">SECURE ROUTE</p>
        <h2 id="support-sheet-title">{title}</h2>

        {!region && (
          <div className="support-region-grid">
            <button onClick={() => { setRegion('international'); trackSupportEvent('payment_region_selected', { region: 'international' }); }}>
              <Globe2 size={24} />
              <span><strong>International</strong><small>GoFundMe</small></span>
              <ArrowRight size={19} />
            </button>
            <button onClick={() => { setRegion('lebanon'); trackSupportEvent('payment_region_selected', { region: 'lebanon' }); }}>
              <MapPin size={24} />
              <span><strong>Lebanon</strong><small>Whish or OMT Pay</small></span>
              <ArrowRight size={19} />
            </button>
          </div>
        )}

        {region === 'international' && (
          <div className="support-methods">
            <GoFundMeChoice onFollow={onClose} />
            <p>{supportConfig.payments.gofundme.feeNote}</p>
            <p>Toufic Abou Ali organizes this fundraiser in France and receives the withdrawals for documented mission costs.</p>
          </div>
        )}

        {region === 'lebanon' && !selectedLocalWallet && (
          <div className="support-methods">
            <LocalWalletChoice method="whish" onSelect={selectLocalWallet} />
            <LocalWalletChoice method="omt" onSelect={selectLocalWallet} />
            <details className="support-more-wallets">
              <summary><span>More Lebanese wallets</span><small>Purpl and MyMonty</small></summary>
              <div>
                <LocalWalletChoice method="purpl" onSelect={selectLocalWallet} />
                <LocalWalletChoice method="mymonty" onSelect={selectLocalWallet} />
              </div>
            </details>
            <p>The receiving number appears only after you choose a wallet.</p>
          </div>
        )}

        {region === 'lebanon' && selectedLocalWallet && (
          <div className="support-local-transfer">
            <p>Open {supportConfig.payments[selectedLocalWallet].label}, choose a wallet transfer, then use this receiving number.</p>
            <div className="support-wallet-number">
              <span><small>Receiving number</small><strong>{supportConfig.localTransfer.displayNumber}</strong></span>
              <button onClick={copyLocalNumber} aria-label={`Copy ${supportConfig.localTransfer.displayNumber}`}>
                {copyStatus === 'Number copied' ? <Check size={18} /> : <Copy size={18} />}
                {copyStatus}
              </button>
            </div>
            <ol>
              <li>Choose USD or LBP if the wallet offers that choice.</li>
              <li>Enter the amount you want to send.</li>
              <li>Before confirming, verify that the recipient shown is <strong>{supportConfig.localTransfer.recipientName}</strong>.</li>
            </ol>
            <p className="support-wallet-fee-note">{supportConfig.payments[selectedLocalWallet].feeNote}</p>
          </div>
        )}

        <div className="support-sheet-trust">
          <ShieldCheck size={18} />
          <p>Toufic.co does not collect card or wallet details. Payment happens on the selected provider.</p>
        </div>
      </div>
    </div>
  );
}

function FundingProgress() {
  const { funding } = supportConfig;
  const percentage = useMemo(() => {
    if (!funding.isVerified || funding.goal === null || funding.cashReceived === null || funding.goal === 0) return 0;
    return Math.min(100, Math.max(0, (funding.cashReceived / funding.goal) * 100));
  }, [funding]);

  return (
    <section className="support-section support-funding" aria-labelledby="funding-title">
      <div className="support-shell support-funding-grid">
        <div>
          <p className="support-kicker">MISSION FUNDING</p>
          <h2 id="funding-title">Every number should earn your trust.</h2>
          <p className="support-intro">Cash received powers the public progress meter. Commitments and in kind support stay separate and are never counted as cash.</p>
        </div>

        <div className="support-progress-card">
          {funding.isVerified && funding.goal !== null && funding.cashReceived !== null ? (
            <>
              <div className="support-progress-numbers">
                <span><small>Cash received</small><strong>{money(funding.cashReceived, funding.currency)}</strong></span>
                <span><small>Public cash target</small><strong>{money(funding.goal, funding.currency)}</strong></span>
              </div>
              <div className="support-progress-track" aria-label={`${Math.round(percentage)}% funded`}>
                <span style={{ width: `${percentage}%` }} />
              </div>
              <div className="support-progress-meta">
                <span>{Math.round(percentage)}% funded</span>
                <span>Updated {funding.updatedAt}</span>
              </div>
              <p className="support-milestone-note">{funding.milestoneNote}</p>
              {(funding.committedCash !== null || funding.inKindValue !== null) && (
                <div className="support-separate-value">
                  {funding.committedCash !== null && <span><small>Committed, not received</small><strong>{money(funding.committedCash, funding.currency)}</strong></span>}
                  {funding.inKindValue !== null && <span><small>In kind support</small><strong>{money(funding.inKindValue, funding.currency)}</strong></span>}
                </div>
              )}
            </>
          ) : (
            <div className="support-progress-pending">
              <span className="support-progress-seal"><ShieldCheck size={25} /></span>
              <div>
                <strong>Public total held for verification</strong>
                <p>The working budget exists, but paid costs, cash received, commitments and in kind help still need to be reconciled. No invented percentage is shown.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="support-shell support-budget-list" aria-label="What support pays for">
        {supportConfig.budgetCategories.map((category, index) => (
          <div key={category}><span>{String(index + 1).padStart(2, '0')}</span><strong>{category}</strong></div>
        ))}
      </div>
    </section>
  );
}

export function SupportPage() {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState('Share');
  const [showMobileSticky, setShowMobileSticky] = useState(false);

  useEffect(() => {
    trackSupportEvent('support_landing_view');
  }, []);

  useEffect(() => {
    const onScroll = () => setShowMobileSticky(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closePayments = useCallback(() => setPaymentOpen(false), []);

  const openPayments = (placement: string) => {
    trackSupportEvent('support_cta_click', { placement });
    setPaymentOpen(true);
  };

  const share = async () => {
    trackSupportEvent('share_click', { placement: 'page' });
    const shareData = {
      title: 'Six Continents. One Mission.',
      text: 'Help Toufic Abou Ali reach the next starting line.',
      url: supportConfig.canonicalUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(supportConfig.canonicalUrl);
      setShareStatus('Link copied');
      window.setTimeout(() => setShareStatus('Share'), 1800);
    } catch {
      setShareStatus('Share');
    }
  };

  const consentHref = supportConfig.supporterConsentUrl || `mailto:${supportConfig.contactEmail}?subject=The%20Starting%20Line%20credit%20choice&body=Please%20add%20me%20to%20The%20Starting%20Line.%0A%0ADisplay%20choice%3A%20full%20name%20%2F%20initials%20%2F%20anonymous%0ACountry%3A%20show%20%2F%20keep%20private%0AContribution%20amount%3A%20show%20%2F%20keep%20private%0AName%20or%20initials%20to%20display%3A%20`;

  return (
    <div className="support-page">
      <a href="#support-main" className="skip-link">Skip to main content</a>

      <header className="support-header">
        <div className="support-shell support-header-inner">
          <Link to="/" className="support-brand" aria-label="Toufic Abou Ali home">
            <img src="/assets/img/brand/toufic-mark.svg" alt="" />
            <span><strong>Toufic Abou Ali</strong><small>Six Continents Before 21</small></span>
          </Link>
          <div className="support-header-actions">
            <button onClick={share}><Share2 size={17} /> {shareStatus}</button>
            <Link to="/partners" onClick={() => trackSupportEvent('partner_enquiry_click', { placement: 'header' })}>Partner</Link>
          </div>
        </div>
      </header>

      <main id="support-main">
        <section className="support-hero">
          <img className="support-hero-image" src="/assets/img/mission/scene-01-poster.webp" alt="Toufic Abou Ali standing at a starting line" fetchPriority="high" />
          <div className="support-hero-shade" />
          <div className="support-shell support-hero-content">
            <p className="support-kicker">6 CONTINENTS. 1 MISSION.</p>
            <h1>Help get me to the next starting line.</h1>
            <div className="support-next-race">
              <span>NEXT</span>
              <div><strong>{supportConfig.nextRace.name}</strong><small>{supportConfig.nextRace.city}, {supportConfig.nextRace.country}</small></div>
              <time dateTime="2026-11-01">{supportConfig.nextRace.date}</time>
            </div>
            <button className="support-main-cta" onClick={() => openPayments('hero')}>
              Support the mission <Heart size={19} fill="currentColor" />
            </button>
            <p className="support-provider-note"><ShieldCheck size={15} /> Payment opens on a verified provider. Toufic.co never handles card details.</p>
          </div>
        </section>

        <section className="support-section support-route" aria-labelledby="route-title">
          <div className="support-shell">
            <div className="support-section-heading">
              <p className="support-kicker">MISSION PROGRESS</p>
              <h2 id="route-title">Six starting lines across six continents.</h2>
              <p>South America is the active chapter. Each next line is reached only through disciplined preparation, safe travel and transparent support.</p>
            </div>
            <div className="support-route-grid">
              {supportConfig.route.map((stop) => (
                <article key={stop.number} className={stop.status === 'Next' ? 'active' : ''}>
                  <span>{stop.number}</span>
                  <div><small>{stop.status}</small><h3>{stop.continent}</h3><p>{stop.detail}</p></div>
                  <i aria-hidden="true" />
                </article>
              ))}
            </div>
            <a className="support-official-race" href={supportConfig.nextRace.officialUrl} target="_blank" rel="noreferrer noopener">
              Official race information <ExternalLink size={15} />
            </a>
          </div>
        </section>

        <FundingProgress />

        <section className="support-section support-story" aria-labelledby="story-title">
          <div className="support-shell support-story-grid">
            <div className="support-story-lead">
              <p className="support-kicker">WHO IS TOUFIC?</p>
              <h2 id="story-title">A Lebanese athlete building a global test of endurance.</h2>
              <p>Toufic Abou Ali is a 20 year old University of Montpellier student, endurance athlete, entrepreneur, and Co Founder and Co CEO of Sira.</p>
            </div>
            <div className="support-story-points">
              <article><span>01</span><div><h3>The mission</h3><p>Complete six full distance races across six continents before turning 21.</p></div></article>
              <article><span>02</span><div><h3>Why six continents</h3><p>Six full distance starts turn one race into a global test of preparation, travel, recovery and endurance.</p></div></article>
              <article><span>03</span><div><h3>Why before 21</h3><p>The age deadline makes every decision and every starting line time critical.</p></div></article>
              <article><span>04</span><div><h3>The next race</h3><p>IRONMAN San Juan in Argentina on 1 November 2026.</p></div></article>
              <article><span>05</span><div><h3>Where support goes</h3><p>Race access, travel, bicycle transport, accommodation, equipment, health, training, nutrition and documentation.</p></div></article>
              <article><span>06</span><div><h3>How funds stay clear</h3><p>Cash received, commitments and in kind help stay separate. Public supporter details require consent.</p></div></article>
            </div>
          </div>
        </section>

        <section className="support-section support-trust" aria-labelledby="trust-title">
          <div className="support-shell support-trust-grid">
            <div>
              <p className="support-kicker">TRUST</p>
              <h2 id="trust-title">Independent mission. Clear language.</h2>
              <p>No organization named on this page is presented as a sponsor or endorser. Media names describe appearances or coverage only.</p>
            </div>
            <div className="support-trust-copy">
              <ShieldCheck size={28} />
              <h3>Record status</h3>
              <p>Official Guinness World Records attempt in progress. The application was accepted and official guidelines were issued. No record is claimed. Final recognition remains subject to completion of the attempt and Guinness World Records evidence review.</p>
            </div>
          </div>
          <div className="support-shell support-media-proof">
            <span>MEDIA APPEARANCES AND COVERAGE</span>
            {supportConfig.mediaProof.length > 0 ? supportConfig.mediaProof.map((outlet) => (
              <a key={outlet.name} href={outlet.url} target="_blank" rel="noreferrer noopener">
                <strong>{outlet.name}</strong><small>{outlet.description}</small>
              </a>
            )) : <div><strong>Proof being connected</strong><small>Only verified source links will appear here</small></div>}
          </div>
        </section>

        <section className="support-section support-wall" aria-labelledby="wall-title">
          <div className="support-shell">
            <div className="support-section-heading">
              <p className="support-kicker">THE STARTING LINE</p>
              <h2 id="wall-title">Every person here helped the mission reach another starting line.</h2>
              <p>Supporters appear only with clear consent. You can show your name, initials or remain anonymous. Country and contribution amount are separate choices.</p>
            </div>

            <div className="supporter-wall" aria-live="polite">
              {publicSupporters.length > 0 ? publicSupporters.map((supporter) => (
                <article key={supporter.id}>
                  <span>{supporter.displayName.slice(0, 2).toUpperCase()}</span>
                  <div><strong>{supporter.displayName}</strong><small>{supporter.showCountry && supporter.country ? supporter.country : 'Country private'}</small></div>
                  <em>{supporter.showAmount && supporter.amount && supporter.currency ? money(supporter.amount, supporter.currency) : 'Amount private'}</em>
                </article>
              )) : (
                <div className="supporter-wall-empty">
                  <div className="supporter-route-dots" aria-hidden="true">{supportConfig.route.map((stop) => <span key={stop.number}>{stop.number}</span>)}</div>
                  <strong>The line is ready for its first approved names.</strong>
                  <p>No supporter is displayed until their visibility choices are recorded.</p>
                </div>
              )}
            </div>

            <a className="support-consent-link" href={consentHref} onClick={() => trackSupportEvent('supporter_consent_click')}>
              Choose how I appear <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="support-final">
          <div className="support-shell">
            <p className="support-kicker">THE NEXT LINE IS SAN JUAN</p>
            <h2>Six continents. Six starting lines. One mission.</h2>
            <button className="support-main-cta" onClick={() => openPayments('final')}>
              Support the mission <Heart size={19} fill="currentColor" />
            </button>
            <div className="support-final-links">
              <Link to="/partners" onClick={() => trackSupportEvent('partner_enquiry_click', { placement: 'footer' })}>Partner with the mission</Link>
              <a href={`mailto:${supportConfig.contactEmail}?subject=Media%20enquiry%20for%20Six%20Continents`} onClick={() => trackSupportEvent('media_enquiry_click', { placement: 'footer' })}>Media enquiry</a>
              <button onClick={share}>{shareStatus}</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="support-footer">
        <div className="support-shell">
          <p>© {new Date().getFullYear()} Toufic Abou Ali</p>
          <p>This is an independent athlete led mission. IRONMAN and Guinness World Records names identify the race series and official attempt context only. No sponsorship, partnership or endorsement is implied.</p>
        </div>
      </footer>

      {showMobileSticky && <button className="support-mobile-sticky" onClick={() => openPayments('mobile_sticky')}>Support the mission <Heart size={17} fill="currentColor" /></button>}
      {paymentOpen && <PaymentSheet onClose={closePayments} />}
    </div>
  );
}
