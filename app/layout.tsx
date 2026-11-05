import type { Metadata } from 'next';
import Link from 'next/link';

import './globals.css';

export const metadata: Metadata = {
  title: 'Acme Shop',
  description: 'A tiny demo shop',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <Link href="/" className="brand">
            Acme Shop
          </Link>
          <nav>
            <Link href="/products">Products</Link>
            <Link href="/search">Search</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/reports">Reports</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
