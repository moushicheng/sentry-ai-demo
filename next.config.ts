import { execSync } from 'node:child_process';

import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs/config';

import { RUM_TYPE } from './lib/rum/type';

const nextConfig: NextConfig = {
  env: {
    // Datadog RUM `version`; must match the version used when uploading source maps.
    NEXT_PUBLIC_DD_VERSION: process.env.DD_VERSION ?? execSync('git rev-parse --short HEAD').toString().trim(),
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Document-Policy', value: 'js-profiling' }],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT ?? 'sentry-ai-demo',
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Upload a larger set of source maps for prettier stack traces
  widenClientFileUpload: true,
  sourcemaps: { disable: RUM_TYPE !== 'sentry' },

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
  telemetry: false,
});
