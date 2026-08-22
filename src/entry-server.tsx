import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { FounderPage } from './views/Founder';
import { HomePage } from './views/Home';
import { MediaPage } from './views/Media';
import { MissionPage } from './views/Mission';
import { NotFoundPage } from './views/NotFound';
import { PartnersPage } from './views/Partners';
import { ProofPage } from './views/Proof';
import { WarsawPage } from './views/Warsaw';

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
