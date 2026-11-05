import { coupons } from '@/lib/server/db';

export async function POST(req: Request) {
  const { code } = (await req.json()) as { code?: string };
  const coupon = coupons.find((c) => c.code === (code ?? '').trim().toUpperCase());

  if (!coupon) {
    return Response.json({ valid: false, reason: 'not_found' });
  }

  const expiresAt = new Date(coupon.expiresAt).toISOString();
  if (expiresAt < new Date().toISOString()) {
    return Response.json({ valid: false, reason: 'expired' });
  }

  return Response.json({ valid: true, percent: coupon.percent, expiresAt });
}
