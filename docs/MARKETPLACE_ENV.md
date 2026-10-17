# Argentina marketplace environment

The public 3D marketplace renders without browser database credentials.

## Partnership intake

`/api/partnership-lead` proxies requests to the deployed Supabase Edge Function:

`partnership-lead`

The edge function:
- validates required contact fields
- rate-limits by a hashed request IP bucket
- writes with the Supabase service role only inside the function
- tags the lead to the Argentina race
- allows toufic.co, localhost development, and Vercel preview origins

No Supabase service-role key is exposed to the browser or stored in the repository.

## Checkout

Self-serve checkout remains intentionally disabled in Supabase until production legal documents, Stripe webhook deployment, success/status route, physical-placement checks, and real-device QA are complete.
