import * as Sentry from '@sentry/nextjs';

import { sleep } from '@/lib/server/db';
import type { CartItem } from '@/lib/types';

export async function POST(req: Request) {
  const body = (await req.json()) as { items?: CartItem[]; coupon?: string };
  const items = body.items ?? [];

  if (items.length === 0) {
    Sentry.logger.warn('checkout called with empty cart');
    return new Response(null, { status: 204 });
  }

  await sleep(200);
  const amount = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const orderId = `o-${Date.now().toString(36)}`;
  Sentry.logger.info('order created', { orderId, amount, itemCount: items.length });

  return Response.json({ orderId, amount });
}
