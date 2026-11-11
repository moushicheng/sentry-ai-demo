import { datadogRum } from '@datadog/browser-rum';
import * as Sentry from '@sentry/nextjs';

import { RUM_TYPE } from './type';

/** Report an error caught by an error boundary to the active RUM vendor. */
export function captureException(error: Error & { digest?: string }) {
  if (RUM_TYPE === 'datadog') {
    datadogRum.addError(error, { digest: error.digest });
    return;
  }
  Sentry.captureException(error);
}
