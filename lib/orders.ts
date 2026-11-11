import type { Order } from '@/lib/types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isOrder(value: unknown): value is Order {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.createdAt === 'string' &&
    typeof value.amount === 'number' &&
    Number.isFinite(value.amount) &&
    (value.status === 'paid' || value.status === 'shipped' || value.status === 'delivered')
  );
}

export function parseOrdersResponse(payload: unknown): Order[] {
  if (!isRecord(payload) || payload.code !== 0) {
    throw new Error('The orders request failed.');
  }

  const data = payload.data;
  if (
    !isRecord(data) ||
    !Array.isArray(data.list) ||
    !data.list.every(isOrder) ||
    typeof data.total !== 'number' ||
    !Number.isInteger(data.total) ||
    data.total < 0 ||
    data.total !== data.list.length
  ) {
    throw new Error('The orders response was malformed.');
  }

  return data.list;
}

export interface OrderSummary {
  count: number;
  spent: number;
  pending: number;
}

export function summarizeOrders(orders: Order[]): OrderSummary {
  return orders.reduce<OrderSummary>(
    (acc, order) => ({
      count: acc.count + 1,
      spent: acc.spent + order.amount,
      pending: acc.pending + (order.status === 'delivered' ? 0 : 1),
    }),
    { count: 0, spent: 0, pending: 0 },
  );
}

export async function fetchOrders(request: typeof fetch = fetch): Promise<Order[]> {
  const response = await request('/api/orders');
  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new Error('The orders response was not valid JSON.');
  }

  if (!response.ok) {
    const message = isRecord(payload) && typeof payload.message === 'string' ? payload.message : undefined;
    throw new Error(message ?? 'The orders request failed.');
  }

  return parseOrdersResponse(payload);
}
