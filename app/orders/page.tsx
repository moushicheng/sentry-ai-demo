'use client';

import { useEffect, useState } from 'react';

import { formatPrice } from '@/lib/cart';
import type { Order } from '@/lib/types';

interface OrdersResponse {
  items: Order[];
  total: number;
}

interface OrderSummary {
  count: number;
  spent: number;
  pending: number;
}

function summarize(orders: Order[]): OrderSummary {
  return orders.reduce<OrderSummary>(
    (acc, o) => ({
      count: acc.count + 1,
      spent: acc.spent + o.amount,
      pending: acc.pending + (o.status === 'delivered' ? 0 : 1),
    }),
    { count: 0, spent: 0, pending: 0 },
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data: OrdersResponse) => {
        setSummary(summarize(data.items));
        setOrders(data.items);
      });
  }, []);

  return (
    <>
      <h1>Orders</h1>
      <div className="card">
        {summary ? (
          <span>
            {summary.count} orders · {formatPrice(summary.spent)} spent · {summary.pending} in progress
          </span>
        ) : (
          <span className="muted">Loading…</span>
        )}
      </div>
      <div className="card">
        <table>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>{formatPrice(o.amount)}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
