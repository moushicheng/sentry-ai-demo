'use client';

import { useEffect, useState } from 'react';

import { clearCart, formatPrice, readCart } from '@/lib/cart';
import type { CartItem } from '@/lib/types';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [percent, setPercent] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    setItems(readCart());
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const total = subtotal * (1 - percent / 100);

  async function applyCoupon() {
    setCouponMessage('Checking…');
    const res = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: coupon }),
    });
    if (!res.ok) {
      setCouponMessage('Could not validate the coupon, please try again later.');
      return;
    }
    const data = (await res.json()) as { valid: boolean; percent?: number; reason?: string };
    if (data.valid && data.percent) {
      setPercent(data.percent);
      setCouponMessage(`Coupon applied: ${data.percent}% off`);
    } else {
      setPercent(0);
      setCouponMessage(`Coupon not applicable (${data.reason})`);
    }
  }

  async function submitOrder() {
    setSubmitting(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, coupon: percent ? coupon : undefined }),
    });
    const data = (await res.json()) as { orderId: string };
    setOrderId(data.orderId);
    clearCart();
    setItems([]);
    setSubmitting(false);
  }

  return (
    <>
      <h1>Cart</h1>
      <div className="card">
        {items.length === 0 ? (
          <span className="muted">Your cart is empty</span>
        ) : (
          <table>
            <tbody>
              {items.map((i) => (
                <tr key={i.productId}>
                  <td>{i.name}</td>
                  <td>× {i.quantity}</td>
                  <td>{formatPrice(i.unitPrice * i.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />{' '}
        <button onClick={applyCoupon}>Apply</button>
        {couponMessage && <div className="message">{couponMessage}</div>}
      </div>

      <div className="card">
        <p>Subtotal: {formatPrice(subtotal)}</p>
        <p>
          <strong>Total: {formatPrice(total)}</strong>
        </p>
        <button className="primary" disabled={submitting} onClick={submitOrder}>
          {submitting ? 'Placing order…' : 'Place order'}
        </button>
        {orderId && <div className="message">Order {orderId} created</div>}
      </div>
    </>
  );
}
