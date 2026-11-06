import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Demo project: keep every trace so Seer / AI issue detection has full context.
  tracesSampleRate: 1.0,
});
