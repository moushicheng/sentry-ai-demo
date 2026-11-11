export type RumType = 'sentry' | 'datadog';

/**
 * RUM vendor this build reports to. Set `NEXT_PUBLIC_RUM_TYPE` before `next build` / `next dev`
 * (it is inlined into client bundles at build time). Defaults to Sentry.
 */
export const RUM_TYPE: RumType = process.env.NEXT_PUBLIC_RUM_TYPE === 'datadog' ? 'datadog' : 'sentry';
