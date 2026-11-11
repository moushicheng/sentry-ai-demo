import * as Sentry from '@sentry/nextjs';

import { RUM_TYPE } from '@/lib/rum/type';

Sentry.init({
  enabled: RUM_TYPE === 'sentry',
  dsn: process.env.SENTRY_DSN,
  // Demo project: keep every trace so Seer / AI issue detection has full context.
  tracesSampleRate: 1.0,
});
