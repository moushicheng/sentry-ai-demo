import * as Sentry from '@sentry/nextjs';

import { RUM_TYPE } from '@/lib/rum/type';

Sentry.init({
  enabled: RUM_TYPE === 'sentry',
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
