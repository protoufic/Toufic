import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { applyRouteSeo } from './utils/seo';

const HomePage = lazy(() => import('./views/Home').then((module) => ({ default: module.HomePage })));
const MissionPage = lazy(() => import('./views/Mission').then((module) => ({ default: module.MissionPage })));
const WarsawPage = lazy(() => import('./views/Warsaw').then((module) => ({ default: module.WarsawPage })));
const ProofPage = lazy(() => import('./views/Proof').then((module) => ({ default: module.ProofPage })));
const FounderPage = lazy(() => import('./views/Founder').then((module) => ({ default: module.FounderPage })));
const PartnersPage = lazy(() => import('./views/Partners').then((module) => ({ default: module.PartnersPage })));
const MediaPage = lazy(() => import('./views/Media').then((module) => ({ default: module.MediaPage })));
const NotFoundPage = lazy(() => import('./views/NotFound').then((module) => ({ default: module.NotFoundPage })));

function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }
    document.documentElement.dataset.route = location.pathname;
    applyRouteSeo(location.pathname);
  }, [location.pathname, location.hash]);
  return null;
}

function RouteLoader() {
  return <div className="route-loader" role="status" aria-label="Loading page"><span /></div>;
}

function SiteRoutes() {
  return (
    <>
      <RouteEffects />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/proof" element={<ProofPage />} />
          <Route path="/founder" element={<FounderPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/warsaw" element={<WarsawPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/story" element={<FounderPage />} />
          <Route path="/record" element={<ProofPage />} />
          <Route path="/ironman" element={<WarsawPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  if (typeof window === 'undefined') {
    return <MemoryRouter initialEntries={[initialPath]}><SiteRoutes /></MemoryRouter>;
  }
  return <BrowserRouter><SiteRoutes /></BrowserRouter>;
}
