import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Bike,
  Building2,
  Camera,
  Check,
  Copy,
  ExternalLink,
  Globe2,
  Heart,
  HeartPulse,
  MapPin,
  MessageCircle,
  Plane,
  Share2,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { publicSupporters, supportConfig } from '../data/support';
import { trackSupportEvent } from '../utils/supportAnalytics';

type Region = 'lebanon' | null;

type SupportArea = {
  icon: typeof Plane;
  title: string;
  copy: string;
};

const supportAreas: SupportArea[] = [
  { icon: Ticket, title: 'Race entries', copy: 'Help unlock the starting lines.' },
  { icon: Plane, title: 'Flights', copy: 'Move athlete and bike across continents.' },
  { icon: Bike, title: 'Bike transport', copy: 'Get the race bike there safely.' },
  { icon: BedDouble, title: 'Accommodation', copy: 'Cover race-week stays and recovery.' },
  { icon: HeartPulse, title: 'Health & safety', copy: 'Medical, insurance and race readiness.' },
  { icon: Camera, title: 'Evidence', copy: 'Document the attempt clearly and properly.' },
];

function money(value: number, currency: string) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function copyText(value: string, onSuccess: () => void, onFailure: () => void) {
  const fallback = () => {
    const input = document.createElement('textarea');
    input.value = value;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    copied ? onSuccess() : onFailure();
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(value).then(onSuccess).catch(fallback);
  } else {
    fallback();
  }
}

function supporterClaimHref() {
  const message = [
    'Hi Toufic, I just supported the Six Continents mission.',
    '',
    'Payment name: ',
    'Name I want shown: ',
    'Country: show / private',
    'Contribution amount: show / private',
    'I would like my support associated with: ',
    '',
    'Please confirm my supporter spot. Thank you!',
  ].join('\n');

  return `https://wa.me/${supportConfig.supporterWhatsApp}?text=${encodeURIComponent(message)}`;
}

function PaymentSheet({ onClose }: { onClose: () => void }) {
  const [region, setRegion] = useState<Region>(null);
  const [copyStatus, setCopyStatus] = useState<'number' | 'note' | null>(null);
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

  const copyNumber = () => {
    copyText(
      supportConfig.localTransfer.copyValue,
      () => {
        setCopyStatus('number');
        trackSupportEvent('local_number_copy', { method: 'lebanon_any_wallet' });
        window.setTimeout(() => setCopyStatus(null), 1600);
      },
      () => setCopyStatus(null),
    );
  };

  const copyNote = () => {
    copyText('SIX', () => {
      setCopyStatus('note');
      trackSupportEvent('support_note_copy', { note: 'SIX' });
      window.setTimeout(() => setCopyStatus(null), 1600);
    }, () => setCopyStatus(null));
  };

  return (
    <div className="support-v2-sheet-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="support-v2-sheet" role="dialog" aria-modal="true" aria-labelledby="support-sheet-title" tabIndex={-1} ref={dialogRef}>
        <button className="support-v2-sheet-close" onClick={onClose} aria-label="Close payment choices"><X size={21} /></button>

        {region === 'lebanon' && (
          <button className="support-v2-sheet-back" onClick={() => setRegion(null)}><ArrowLeft size={16} /> Back</button>
        )}

        {region === null ? (
          <>
            <p className="support-v2-kicker">ONE QUICK CHOICE</p>
            <h2 id="support-sheet-title">Where are you supporting from?</h2>
            <p className="support-v2-sheet-intro">Pick one. The next step is the payment route.</p>

            <div className="support-v2-region-grid">
              <a
                href={supportConfig.payments.gofundme.url!}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => {
                  trackSupportEvent('gofundme_click', { method: 'gofundme', destination_ready: true });
                  onClose();
                }}
              >
                <span className="support-v2-region-icon"><Globe2 size={24} /></span>
                <span><strong>International</strong><small>Go straight to GoFundMe</small></span>
                <ExternalLink size={19} />
              </a>

              <button onClick={() => {
                setRegion('lebanon');
                trackSupportEvent('payment_region_selected', { region: 'lebanon' });
              }}>
                <span className="support-v2-region-icon"><MapPin size={24} /></span>
                <span><strong>Lebanon</strong><small>Whish · OMT · Purpl · MyMonty</small></span>
                <ArrowRight size={19} />
              </button>
            </div>

            <div className="support-v2-sheet-trust"><ShieldCheck size={17} /><span>Toufic.co never collects your card or wallet details.</span></div>
          </>
        ) : (
          <>
            <p className="support-v2-kicker">LEBANON</p>
            <h2 id="support-sheet-title">Send it to one number.</h2>
            <p className="support-v2-sheet-intro">Use Whish, OMT Pay, Purpl or MyMonty. No need to choose a wallet here.</p>

            <div className="support-v2-wallet-strip" aria-label="Supported Lebanese wallet routes">
              <span>Whish</span><span>OMT Pay</span><span>Purpl</span><span>MyMonty</span>
            </div>

            <div className="support-v2-copy-card">
              <div><small>Receiving number</small><strong>{supportConfig.localTransfer.displayNumber}</strong><span>{supportConfig.localTransfer.recipientName}</span></div>
              <button onClick={copyNumber}>{copyStatus === 'number' ? <Check size={17} /> : <Copy size={17} />}{copyStatus === 'number' ? 'Copied' : 'Copy number'}</button>
            </div>

            <div className="support-v2-note-card">
              <div><small>If your wallet has a note field</small><strong>Write: SIX</strong><p>If it does not, just send the transfer and message us after.</p></div>
              <button onClick={copyNote}>{copyStatus === 'note' ? <Check size={16} /> : <Copy size={16} />}{copyStatus === 'note' ? 'Copied' : 'Copy SIX'}</button>
            </div>

            <ol className="support-v2-payment-steps">
              <li>Open your wallet and send any amount you choose.</li>
              <li>Before confirming, check that the recipient is <strong>{supportConfig.localTransfer.recipientName}</strong>.</li>
              <li>Then message us once so we can confirm your support and, if you want, add you to the Mission Wall.</li>
            </ol>

            <a className="support-v2-claim-button" href={supporterClaimHref()} target="_blank" rel="noreferrer" onClick={() => trackSupportEvent('supporter_consent_click', { placement: 'payment_sheet' })}>
              <MessageCircle size={18} /> I sent it — claim my supporter spot
            </a>

            <p className="support-v2-fee-note">Your wallet provider shows the final currency, recipient and any applicable fee before you confirm.</p>
          </>
        )}
      </div>
    </div>
  );
}

function FundingProgress({ onFund }: { onFund: () => void }) {
  const { funding } = supportConfig;
  const percentage = useMemo(() => {
    if (!funding.isVerified || funding.goal === null || funding.cashReceived === null || funding.goal === 0) return 0;
    return Math.min(100, Math.max(0, (funding.cashReceived / funding.goal) * 100));
  }, [funding]);

  return (
    <section className="support-v2-section support-v2-funding" aria-labelledby="funding-title">
      <div className="support-v2-shell support-v2-funding-grid">
        <div className="support-v2-section-heading support-v2-section-heading-left">
          <p className="support-v2-kicker">WHERE THE MONEY GOES</p>
          <h2 id="funding-title">Help cover a real part of the journey.</h2>
          <p>Race entries, flights, the bike, a bed, health and evidence. Simple things that decide whether I reach each starting line.</p>
          <button className="support-v2-primary" onClick={onFund}>Fund the mission <Heart size={18} fill="currentColor" /></button>
        </div>

        <div className="support-v2-progress-card">
          <div className="support-v2-progress-head">
            <span><small>Cash received</small><strong>{money(funding.cashReceived ?? 0, funding.currency)}</strong></span>
            <span><small>Mission cash target</small><strong>{money(funding.goal ?? 0, funding.currency)}</strong></span>
          </div>
          <div className="support-v2-progress-track" aria-label={`${Math.round(percentage)}% funded`}><span style={{ width: `${percentage}%` }} /></div>
          <div className="support-v2-progress-meta"><strong>{Math.round(percentage)}% funded</strong><span>Updated {funding.updatedAt}</span></div>
          {funding.committedCash !== null && funding.committedCash > 0 && (
            <p className="support-v2-commitment"><strong>{money(funding.committedCash, funding.currency)} committed</strong> but not counted as cash until received.</p>
          )}
        </div>
      </div>

      <div className="support-v2-shell support-v2-area-grid">
        {supportAreas.map((area) => (
          <article key={area.title}>
            <area.icon size={22} />
            <h3>{area.title}</h3>
            <p>{area.copy}</p>
          </article>
        ))}
      </div>
      <div className="support-v2-shell"><p className="support-v2-budget-note">You can tell us what part of the mission matters most to you when you claim your supporter spot. Unless specifically agreed otherwise, support is used across verified mission costs where it is needed most.</p></div>
    </section>
  );
}

function FoundingWall({ onFund }: { onFund: () => void }) {
  const foundingSupporters = publicSupporters
    .filter((supporter) => (supporter.foundingNumber ?? 0) <= 100)
    .slice(0, 100);
  const foundingCount = Math.max(supportConfig.foundingSupporterCount, foundingSupporters.length);
  const nextNumber = String(Math.min(100, foundingCount + 1)).padStart(3, '0');
  const supporterByNumber = new Map(foundingSupporters.map((supporter, index) => [supporter.foundingNumber ?? index + 1, supporter]));

  return (
    <section className="support-v2-section support-v2-wall" id="mission-wall" aria-labelledby="wall-title">
      <div className="support-v2-shell">
        <div className="support-v2-wall-head">
          <div className="support-v2-section-heading support-v2-section-heading-left">
            <p className="support-v2-kicker">THE FOUNDING 100</p>
            <h2 id="wall-title">One record attempt. Hundreds of names behind it.</h2>
            <p>The first 100 verified supporters can permanently hold a numbered Founding Supporter spot. You decide whether your name, country and amount are public.</p>
          </div>
          <div className="support-v2-founding-count"><strong>{String(foundingCount).padStart(2, '0')}</strong><span>/ 100</span><small>FOUNDING SUPPORTERS</small></div>
        </div>

        <div className="support-v2-dot-wall" aria-label={`${foundingCount} of 100 Founding Supporter spots claimed`}>
          {Array.from({ length: 100 }).map((_, index) => {
            const foundingNumber = index + 1;
            const supporter = supporterByNumber.get(foundingNumber);
            const claimed = foundingNumber <= foundingCount;
            return (
              <span
                key={index}
                className={claimed ? 'claimed' : ''}
                title={supporter ? `#${String(foundingNumber).padStart(3, '0')} ${supporter.displayName}` : claimed ? `Founding Supporter #${String(foundingNumber).padStart(3, '0')}` : `Founding Supporter #${String(foundingNumber).padStart(3, '0')} open`}
                aria-label={supporter ? `Founding Supporter ${foundingNumber}: ${supporter.displayName}` : claimed ? `Founding Supporter spot ${foundingNumber} claimed privately` : `Founding Supporter spot ${foundingNumber} open`}
              >{claimed ? String(foundingNumber).padStart(2, '0') : ''}</span>
            );
          })}
        </div>

        {foundingSupporters.length > 0 ? (
          <div className="support-v2-supporter-list">
            {foundingSupporters.map((supporter, index) => (
              <article key={supporter.id}>
                <span>#{String(supporter.foundingNumber ?? index + 1).padStart(3, '0')}</span>
                <div><strong>{supporter.displayName}</strong><small>{supporter.showCountry && supporter.country ? supporter.country : 'Country private'}</small></div>
                <em>{supporter.showAmount && supporter.amount && supporter.currency ? money(supporter.amount, supporter.currency) : 'Amount private'}</em>
              </article>
            ))}
          </div>
        ) : (
          <div className="support-v2-first-spot">
            <Sparkles size={24} />
            <div><strong>Founding Supporter #{nextNumber} is open.</strong><p>No names are invented. The wall starts with the first verified supporter who chooses to appear.</p></div>
            <button onClick={onFund}>Claim it by supporting <ArrowRight size={17} /></button>
          </div>
        )}

        <div className="support-v2-wall-actions">
          <button className="support-v2-primary" onClick={onFund}>Become part of the mission <Heart size={18} fill="currentColor" /></button>
          <a href={supporterClaimHref()} target="_blank" rel="noreferrer" onClick={() => trackSupportEvent('supporter_consent_click', { placement: 'wall' })}><MessageCircle size={17} /> Already supported? Claim your spot</a>
        </div>
      </div>
    </section>
  );
}

export function SupportPage() {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState('Share');
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    trackSupportEvent('support_landing_view');
  }, []);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closePayments = useCallback(() => setPaymentOpen(false), []);
  const openPayments = (placement: string) => {
    trackSupportEvent('support_cta_click', { placement });
    setPaymentOpen(true);
  };

  const share = async () => {
    trackSupportEvent('share_click', { placement: 'support_page' });
    const shareData = {
      title: 'Six Continents. One Mission.',
      text: 'Help Toufic reach six starting lines across six continents as part of an official Guinness World Records attempt.',
      url: supportConfig.canonicalUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(supportConfig.canonicalUrl);
      setShareStatus('Copied');
      window.setTimeout(() => setShareStatus('Share'), 1600);
    } catch {
      setShareStatus('Share');
    }
  };

  return (
    <div className="support-v2-page">
      <a href="#support-main" className="skip-link">Skip to main content</a>

      <header className="support-v2-header">
        <div className="support-v2-shell support-v2-header-inner">
          <Link to="/" className="support-v2-brand" aria-label="Toufic Abou Ali home">
            <img src="/assets/img/brand/toufic-mark.svg" alt="" />
            <span><strong>Toufic Abou Ali</strong><small>Six Continents. One Mission.</small></span>
          </Link>
          <div className="support-v2-header-actions">
            <button onClick={share}><Share2 size={16} /><span>{shareStatus}</span></button>
            <Link to="/partners" onClick={() => trackSupportEvent('partner_enquiry_click', { placement: 'header' })}><Building2 size={16} /><span>Company?</span></Link>
          </div>
        </div>
      </header>

      <main id="support-main">
        <section className="support-v2-hero">
          <div className="support-v2-shell support-v2-hero-grid">
            <div className="support-v2-hero-copy">
              <div className="support-v2-status-pill"><ShieldCheck size={16} /> Official Guinness World Records attempt in progress</div>
              <p className="support-v2-kicker">6 CONTINENTS · 6 STARTING LINES · 1 MISSION</p>
              <h1>Help me reach the next starting line.</h1>
              <p className="support-v2-hero-intro">I’m Toufic, a Lebanese athlete preparing to complete six full distance IRONMAN races on six continents as part of a Guinness World Records attempt.</p>
              <p className="support-v2-hero-simple">Your support helps pay for the real things that get me there: races, flights, the bike, a place to sleep, health and evidence.</p>

              <div className="support-v2-next-race">
                <span>NEXT START</span>
                <div><strong>{supportConfig.nextRace.name}</strong><small>{supportConfig.nextRace.city}, {supportConfig.nextRace.country}</small></div>
                <time dateTime="2026-11-01">{supportConfig.nextRace.date}</time>
              </div>

              <button className="support-v2-primary support-v2-hero-cta" onClick={() => openPayments('hero')}>Fund the mission <Heart size={19} fill="currentColor" /></button>
              <div className="support-v2-hero-trust">
                <span><Check size={14} /> Application accepted</span>
                <span><Check size={14} /> Official guidelines issued</span>
                <span><ShieldCheck size={14} /> No record claimed yet</span>
              </div>
            </div>

            <figure className="support-v2-hero-art">
              <img src="/assets/img/support/six-continents-one-mission.webp" alt="Six Continents, One Mission — Toufic Abou Ali Guinness World Records attempt in progress" fetchPriority="high" />
              <figcaption>Support the journey before the result exists.</figcaption>
            </figure>
          </div>
        </section>

        <section className="support-v2-belonging">
          <div className="support-v2-shell support-v2-belonging-grid">
            <div>
              <p className="support-v2-kicker">YOU ARE NOT JUST SENDING MONEY</p>
              <h2>You become part of the mission.</h2>
            </div>
            <div>
              <p>If you support and want to be public, your name can live on the Mission Wall. The first 100 verified supporters get a permanent numbered Founding Supporter spot.</p>
              <a href="#mission-wall">See the Founding 100 <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <FundingProgress onFund={() => openPayments('funding')} />

        <FoundingWall onFund={() => openPayments('founding_wall')} />

        <section className="support-v2-section support-v2-celebration">
          <div className="support-v2-shell support-v2-celebration-grid">
            <div className="support-v2-celebration-mark"><Users size={34} /><span>LEBANON</span></div>
            <div>
              <p className="support-v2-kicker">IF WE MAKE HISTORY</p>
              <h2>We celebrate together.</h2>
              <p>If the attempt is completed successfully and a celebration is held in Lebanon, our plan is to invite verified supporters and recognize the people who helped make the journey possible.</p>
              <small>Final venue, capacity, timing and event details will be confirmed later. Guinness World Records recognition is not guaranteed and remains subject to successful completion and evidence review.</small>
            </div>
          </div>
        </section>

        <section className="support-v2-section support-v2-trust" aria-labelledby="trust-title">
          <div className="support-v2-shell">
            <div className="support-v2-section-heading">
              <p className="support-v2-kicker">WHY YOU CAN TRUST WHAT YOU SEE</p>
              <h2 id="trust-title">The attempt is real. The result is not promised.</h2>
              <p>The application was accepted and official guidelines were issued. No record is claimed. Final recognition depends on completing the attempt and passing Guinness World Records evidence review.</p>
            </div>

            <div className="support-v2-media-grid">
              {supportConfig.mediaProof.map((outlet) => (
                <a key={outlet.name} href={outlet.url} target="_blank" rel="noreferrer noopener">
                  <span>MEDIA</span><strong>{outlet.name}</strong><small>{outlet.description}</small><ExternalLink size={16} />
                </a>
              ))}
              <Link to="/proof"><span>PROOF</span><strong>Race archive</strong><small>Results, photos and athletic history</small><ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="support-v2-section support-v2-partner">
          <div className="support-v2-shell support-v2-partner-card">
            <div><Building2 size={27} /><p className="support-v2-kicker">REPRESENT A COMPANY?</p><h2>Do not donate like an individual. Own a real part of the mission.</h2><p>Travel, insurance, accommodation, bicycle support, health, race access and content can become clear company roles with defined value.</p></div>
            <Link to="/partners" onClick={() => trackSupportEvent('partner_enquiry_click', { placement: 'support_partner_section' })}>See partnership opportunities <ArrowRight size={17} /></Link>
          </div>
        </section>

        <section className="support-v2-final">
          <div className="support-v2-shell">
            <p className="support-v2-kicker">THE NEXT STARTING LINE IS ARGENTINA</p>
            <h2>One name may appear on the record.<br />Hundreds of names can stand behind it.</h2>
            <button className="support-v2-primary" onClick={() => openPayments('final')}>Fund the mission <Heart size={19} fill="currentColor" /></button>
            <div className="support-v2-final-links">
              <a href={supporterClaimHref()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Already supported? Claim your spot</a>
              <button onClick={share}><Share2 size={16} /> {shareStatus} the mission</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="support-v2-footer">
        <div className="support-v2-shell">
          <p>© {new Date().getFullYear()} Toufic Abou Ali</p>
          <p>Independent athlete-led mission. Guinness World Records and IRONMAN names identify the attempt and race context only. No sponsorship, partnership or endorsement is implied.</p>
        </div>
      </footer>

      {showSticky && <button className="support-v2-sticky" onClick={() => openPayments('sticky')}>Fund the mission <Heart size={17} fill="currentColor" /></button>}
      {paymentOpen && <PaymentSheet onClose={closePayments} />}
    </div>
  );
}
