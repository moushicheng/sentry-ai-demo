import Link from 'next/link';

const flows = [
  { href: '/products', title: 'Browse products', steps: 'Open any product and click "Add to cart".' },
  { href: '/search', title: 'Search', steps: 'Keyboard only: type "head", press ArrowDown a few times, keep typing " kids", then press Enter.' },
  { href: '/cart', title: 'Checkout', steps: 'Apply coupon "WINTER15", then place the order (also try with an empty cart).' },
  { href: '/orders', title: 'Order history', steps: 'Open the page and look at the order summary.' },
  { href: '/reports', title: 'Reports', steps: 'Wait for the reports to load, then toggle the sort order a few times.' },
];

export default function Home() {
  return (
    <>
      <h1>Acme Shop</h1>
      <p className="muted">User flows</p>
      {flows.map((f) => (
        <div className="card" key={f.href}>
          <Link href={f.href}>
            <strong>{f.title}</strong>
          </Link>
          <div className="muted">{f.steps}</div>
        </div>
      ))}
    </>
  );
}
