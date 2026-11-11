'use client';

import { useEffect, useState } from 'react';

import { formatPrice } from '@/lib/cart';
import { fetchOrders, summarizeOrders, type OrderSummary } from '@/lib/orders';
import type { Order } from '@/lib/types';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<OrderSummary | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    fetchOrders()
      .then((loadedOrders) => {
        if (!active) return;
        setSummary(summarizeOrders(loadedOrders));
        setOrders(loadedOrders);
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <h1>Orders</h1>
      <div className="card">
        {error ? (
          <span role="alert">Unable to load orders. Please try again later.</span>
        ) : summary ? (
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
