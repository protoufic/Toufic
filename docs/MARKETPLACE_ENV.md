# Argentina marketplace environment

The public 3D marketplace does not require database credentials to render.

The custom partnership form posts to `/api/partnership-lead`. Configure these server-side Vercel variables before relying on database intake:

- `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`)
- `SUPABASE_SERVICE_ROLE_KEY`

Never expose `SUPABASE_SERVICE_ROLE_KEY` to client-side code.

Self-serve checkout remains intentionally disabled in Supabase until production, legal, Stripe webhook, success/status route, real-device and physical-placement QA are complete.
