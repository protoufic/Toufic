const routeLoaders: Record<string, () => Promise<unknown>> = {
  '/mission': () => import('../pages/Mission'),
  '/proof': () => import('../pages/Proof'),
  '/founder': () => import('../pages/Founder'),
  '/partners': () => import('../pages/Partners'),
  '/warsaw': () => import('../pages/Warsaw'),
  '/media': () => import('../pages/Media'),
};

const requested = new Set<string>();

export function preloadRoute(path: string) {
  const loader = routeLoaders[path];
  if (!loader || requested.has(path)) return;
  requested.add(path);
  void loader().catch(() => requested.delete(path));
}
