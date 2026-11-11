import assert from 'node:assert/strict';
import test from 'node:test';

import { fetchOrders, parseOrdersResponse, summarizeOrders } from '../lib/orders.ts';

const orders = [
  { id: 'o-1001', createdAt: '2026-10-02T09:12:00Z', amount: 1168.2, status: 'delivered' },
  { id: 'o-1002', createdAt: '2026-10-15T14:40:00Z', amount: 499, status: 'delivered' },
  { id: 'o-1003', createdAt: '2026-10-28T20:05:00Z', amount: 233.1, status: 'shipped' },
  { id: 'o-1004', createdAt: '2026-11-03T11:30:00Z', amount: 2599, status: 'paid' },
] as const;

test('parses the wrapped orders response', () => {
  const loaded = parseOrdersResponse({ code: 0, data: { list: orders, total: 4 } });

  assert.deepEqual(loaded, orders);
  assert.deepEqual(summarizeOrders(loaded), { count: 4, spent: 4499.3, pending: 2 });
});

test('accepts an empty orders list', () => {
  assert.deepEqual(parseOrdersResponse({ code: 0, data: { list: [], total: 0 } }), []);
});

test('rejects an application failure response', async () => {
  const response = new Response(JSON.stringify({ code: 401, message: 'Not authorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });

  await assert.rejects(fetchOrders(async () => response), /Not authorized/);
});

test('rejects invalid JSON from the server', async () => {
  const response = new Response('not json', { status: 200 });

  await assert.rejects(fetchOrders(async () => response), /not valid JSON/);
});

test('rejects a malformed successful response', () => {
  assert.throws(() => parseOrdersResponse({ code: 0, data: { items: orders, total: 4 } }), /malformed/);
  assert.throws(() => parseOrdersResponse({ code: 0, data: { list: orders, total: 3 } }), /malformed/);
});
