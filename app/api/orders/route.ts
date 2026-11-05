import { orders, sleep } from '@/lib/server/db';
import { ok } from '@/lib/server/response';

export async function GET() {
  await sleep(150);
  return ok({ list: orders, total: orders.length });
}
