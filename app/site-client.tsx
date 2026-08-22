"use client";

import App from "@/src/App";

export function SiteClient({ initialPath = "/" }: { initialPath?: string }) {
  return <App initialPath={initialPath} />;
}
