import { datadogRum } from '@datadog/browser-rum';

export function initDatadogRum() {
  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DD_RUM_APPLICATION_ID ?? '',
    clientToken: process.env.NEXT_PUBLIC_DD_RUM_CLIENT_TOKEN ?? '',
    site: 'datadoghq.com',
    service: 'sentry-ai-demo',
    env: process.env.NEXT_PUBLIC_DD_ENV ?? 'local',
    version: process.env.NEXT_PUBLIC_DD_VERSION,
    // Demo project: sample everything so every scenario run produces sessions, replays and traces.
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackResources: true,
    trackUserInteractions: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
    // API routes are same-origin; inject trace headers so RUM requests link to backend traces.
    allowedTracingUrls: [(url) => url.startsWith(window.location.origin)],
  });
}
