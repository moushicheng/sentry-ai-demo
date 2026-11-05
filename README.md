# Acme Shop — Sentry AI demo

A small Next.js (App Router) shop used to evaluate Sentry's AI features (Seer Autofix, AI-detected issues, Code Review, Replay summaries, Seer Agent) on frontend + backend telemetry.

The app intentionally contains real-world-style bugs and performance problems. Do not use it as a reference implementation.

## Stack

- Next.js 16 (App Router, route handlers as the backend)
- `@sentry/nextjs` 11: errors, tracing, session replay, browser profiling, logs, user feedback
- Source maps are uploaded at build time when `SENTRY_AUTH_TOKEN` is set

## Setup

1. Create a Sentry project (platform: Next.js) and copy its DSN.
2. Create an auth token with `project:releases` / `project:write` scope for source map upload.
3. `cp .env.example .env.local` and fill in the values.
4. Install and run:

   ```bash
   npm install
   npm run build && npm run start   # production build: minified bundles + uploaded source maps
   # or
   npm run dev
   ```

5. In Sentry:
   - Install the GitHub integration and add this repository.
   - Seer settings: connect the repository to the project (Seer > Projects).
   - Optional: enable Code Review for the repository.

## User flows

Open http://localhost:3000 and follow the flows on the home page:

| Page | What to do |
|---|---|
| `/products/[id]` | Open several products and click "Add to cart" |
| `/search` | Keyboard only: type `head`, press ArrowDown a few times, keep typing ` kids`, press Enter |
| `/cart` | Apply coupon `WINTER15`; place an order (also with an empty cart) |
| `/orders` | Open the page |
| `/reports` | Wait for reports to load, toggle the sort order a few times |

Each flow can be repeated to accumulate events (Autofix runs automatically once an issue has ≥ 10 events).

## Resetting

After Seer opens a fix PR you can review and merge it, or reset `main` to the initial commit to replay the evaluation.
