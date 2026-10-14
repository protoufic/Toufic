import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Heart, Building2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ContactPanel } from './ContactPanel';
import { openContactPanel } from '../utils/contact';
import { site } from '../data/mission';
import { preloadRoute } from '../utils/preload';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/mission', label: 'Mission' },
  { href: '/proof', label: 'Proof' },
  { href: '/founder', label: 'Founder' },
  { href: '/support', label: 'Support' },
  { href: '/sponsor', label: 'Sponsor' },
  { href: '/partners', label: 'Partners' },
  { href: '/media', label: 'Media' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="site-shell">
          <nav className="site-nav" aria-label="Primary navigation">
            <Link to="/" className="site-brand" aria-label="Toufic Abou Ali — Six Continents. One Mission. home">
              <span className="site-brand-mark"><img src="/assets/img/brand/toufic-mark.svg" alt="" /></span>
              <span className="site-brand-copy">
                <strong>Toufic Abou Ali</strong>
                <small>Six Continents. One Mission.</small>
              </span>
            </Link>

            <div className="site-nav-links">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className={location.pathname === link.href ? 'active' : ''} onPointerEnter={() => preloadRoute(link.href)} onFocus={() => preloadRoute(link.href)} onTouchStart={() => preloadRoute(link.href)}>
                  {link.label}
                </Link>
              ))}
            </div>

            <Link className="header-cta header-support-cta" to="/sponsor/argentina" onPointerEnter={() => preloadRoute('/sponsor/argentina')} onFocus={() => preloadRoute('/sponsor/argentina')}>
              Sponsor Argentina
              <ArrowUpRight size={15} />
            </Link>

            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mobile-menu-inner">
                {navLinks.map((link) => (
                  <Link key={link.href} to={link.href} className={location.pathname === link.href ? 'active' : ''} onClick={() => setMobileMenuOpen(false)} onPointerEnter={() => preloadRoute(link.href)} onFocus={() => preloadRoute(link.href)} onTouchStart={() => preloadRoute(link.href)}>
                    {link.label}
                  </Link>
                ))}
                <Link className="mobile-support-link" to="/sponsor/argentina" onClick={() => setMobileMenuOpen(false)}>Sponsor Argentina <ArrowUpRight size={18} /></Link>
                <button onClick={() => { setMobileMenuOpen(false); openContactPanel('partnership'); }}><Building2 size={18} /> Discuss a Company Partnership</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {location.pathname !== '/support' && !location.pathname.startsWith('/sponsor') && (
        <Link className="global-support-sticky" to="/support"><Heart size={17} fill="currentColor" /> Fund the Mission</Link>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div className="footer-lead">
          <span className="footer-kicker">SIX CONTINENTS. ONE MISSION.</span>
          <h2>6 full distance races. 6 continents. Before 21.</h2>
          <div className="footer-primary-actions">
            <Link className="button-primary" to="/sponsor/argentina">Sponsor Argentina <ArrowUpRight size={16} /></Link>
            <Link className="text-link" to="/support">Fund the Mission <Heart size={16} /></Link>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h3>Website</h3>
            {navLinks.map((link) => <Link key={link.href} to={link.href} onPointerEnter={() => preloadRoute(link.href)} onFocus={() => preloadRoute(link.href)}>{link.label}</Link>)}
            <Link to="/warsaw" onPointerEnter={() => preloadRoute('/warsaw')} onFocus={() => preloadRoute('/warsaw')}>IRONMAN 70.3 Warsaw</Link>
          </div>
          <div>
            <h3>Connect</h3>
            <a href={`mailto:${site.email}`}>Email</a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={site.strava} target="_blank" rel="noreferrer">Strava</a>
            <a href={site.sira} target="_blank" rel="noreferrer">Sira</a>
          </div>
        </div>
      </div>

      <div className="site-shell footer-bottom">
        <p>© {new Date().getFullYear()} Toufic Abou Ali.</p>
        <p>Independent athlete-led mission. Commercial placements remain subject to creative approval, physical production feasibility and race rules. Guinness World Records and IRONMAN® names and marks do not imply sponsorship, partnership or endorsement.</p>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-root">
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <ContactPanel />
    </div>
  );
}
