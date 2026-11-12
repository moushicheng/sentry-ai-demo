import * as Sentry from '@sentry/nextjs';
import { coupons } from '@/lib/server/db';

export async function POST(req: Request) {
  const { code } = (await req.json()) as { code?: string };
  const coupon = coupons.find((c) => c.code === (code ?? '').trim().toUpperCase());

  if (!coupon) {
    return Response.json({ valid: false, reason: 'not_found' });
  }

  const expiresAtDate = new Date(coupon.expiresAt);
  if (Number.isNaN(expiresAtDate.getTime())) {
    Sentry.captureMessage('Coupon has unparseable expiresAt', {
      level: 'error',
      extra: { code: coupon.code, expiresAt: coupon.expiresAt },
    });
    return Response.json({ valid: false, reason: 'invalid_coupon' });
  }

  if (expiresAtDate.getTime() < Date.now()) {
    return Response.json({ valid: false, reason: 'expired' });
  }

  const expiresAt = expiresAtDate.toISOString();
  return Response.json({ valid: true, percent: coupon.percent, expiresAt });
}
