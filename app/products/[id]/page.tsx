'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { addToCart, formatPrice } from '@/lib/cart';
import type { Product } from '@/lib/types';

/**
 * Unit price after discount. `product.discount` is optional (products without
 * an active sale, e.g. p3, p6, p10, have none), so a missing discount means a
 * rate of 0 and the list price is charged. Reading `product.discount.rate`
 * directly crashed "Add to cart" for those products (SENTRY-AI-DEMO-1).
 */
function finalPrice(product: Product) {
  const rate = product.discount?.rate ?? 0;
  return Math.round(product.price * (1 - rate) * 100) / 100;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="muted">Loading…</p>;
  }

  function handleAddToCart() {
    if (!product) return;
    const unitPrice = finalPrice(product);
    addToCart({ productId: product.id, name: product.name, unitPrice, quantity: 1 });
    setMessage(`Added to cart at ${formatPrice(unitPrice)}`);
  }

  return (
    <div className="card">
      <h1>{product.name}</h1>
      <p className="muted">
        {product.category} · {product.stock} in stock
      </p>
      <p>List price: {formatPrice(product.price)}</p>
      <button className="primary" onClick={handleAddToCart}>
        Add to cart
      </button>
      {message && <div className="message">{message}</div>}
    </div>
  );
}
