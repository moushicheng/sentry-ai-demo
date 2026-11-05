import Link from 'next/link';

import { formatPrice } from '@/lib/cart';
import { products } from '@/lib/server/db';

export default function ProductsPage() {
  return (
    <>
      <h1>Products</h1>
      <div className="grid">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className="card">
            <strong>{p.name}</strong>
            <div className="muted">{p.category}</div>
            <div>{formatPrice(p.price)}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
