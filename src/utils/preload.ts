const routeLoaders: Record<string, () => Promise<unknown>> = {
  '/mission': () => import('../views/Mission'),
  '/proof': () => import('../views/Proof'),
  '/founder': () => import('../views/Founder'),
  '/partners': () => import('../views/Partners'),
  '/warsaw': () => import('../views/Warsaw'),
  '/media': () => import('../views/Media'),
};

const requested = new Set<string>();

export function preloadRoute(path: string) {
  const loader = routeLoaders[path];
  if (!loader || requested.has(path)) return;
  requested.add(path);
  void loader().catch(() => requested.delete(path));
}
