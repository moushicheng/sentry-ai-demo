import * as Sentry from '@sentry/nextjs';

import { initDatadogRum } from '@/lib/rum/datadog-client';
import { RUM_TYPE } from '@/lib/rum/type';

if (RUM_TYPE === 'datadog') initDatadogRum();

Sentry.init({
  enabled: RUM_TYPE === 'sentry',
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.feedbackIntegration({ colorScheme: 'system' }),
  ],
  // Demo project: sample everything so every scenario run produces traces, replays and profiles.
  tracesSampleRate: 1.0,
  profileSessionSampleRate: 1.0,
  profileLifecycle: 'trace',
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
