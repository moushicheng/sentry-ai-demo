import { pbkdf2Sync } from 'node:crypto';

import * as Sentry from '@sentry/nextjs';

import { reports } from '@/lib/server/db';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = reports.find((r) => r.id === id);
  if (!report) {
    return Response.json({ message: 'Report not found' }, { status: 404 });
  }

  const started = Date.now();
  const signature = pbkdf2Sync(report.id, 'report-signing-salt', 800_000, 32, 'sha512').toString('hex');
  Sentry.logger.info('report signed', { reportId: id, durationMs: Date.now() - started });

  return Response.json({
    ...report,
    signature,
    samples: 40_000,
    seed: Number(id.slice(1)) * 7919,
  });
}
