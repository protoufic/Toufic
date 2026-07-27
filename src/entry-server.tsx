import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { FounderPage } from './pages/Founder';
import { HomePage } from './pages/Home';
import { MediaPage } from './pages/Media';
import { MissionPage } from './pages/Mission';
import { NotFoundPage } from './pages/NotFound';
import { PartnersPage } from './pages/Partners';
import { ProofPage } from './pages/Proof';
import { WarsawPage } from './pages/Warsaw';

const pages: Record<string, React.ComponentType> = {
  '/': HomePage,
  '/mission': MissionPage,
  '/proof': ProofPage,
  '/founder': FounderPage,
  '/partners': PartnersPage,
  '/warsaw': WarsawPage,
  '/media': MediaPage,
  '/404': NotFoundPage,
};

export function renderRoute(pathname: string) {
  const Page = pages[pathname] || NotFoundPage;
  return renderToStaticMarkup(
    <StaticRouter location={pathname}>
      <Page />
    </StaticRouter>,
  );
}
