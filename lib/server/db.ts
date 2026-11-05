interface ProductRecord {
  id: string;
  name: string;
  category: string;
  tags: string[];
  price: number;
  stock: number;
  discount?: { rate: number; label: string };
}

export const products: ProductRecord[] = [
  { id: 'p1', name: 'Noise Cancelling Headphones Pro', category: 'audio', tags: ['headphones', 'wireless'], price: 1299, stock: 32, discount: { rate: 0.1, label: 'Holiday 10% off' } },
  { id: 'p2', name: 'Mechanical Keyboard K8', category: 'peripheral', tags: ['keyboard'], price: 499, stock: 120, discount: { rate: 0.05, label: 'Member 5% off' } },
  { id: 'p3', name: '4K Monitor 27"', category: 'display', tags: ['monitor', '4k'], price: 2599, stock: 8 },
  { id: 'p4', name: 'Wireless Earbuds Lite', category: 'audio', tags: ['earbuds', 'wireless'], price: 399, stock: 230, discount: { rate: 0.2, label: 'Flash sale' } },
  { id: 'p5', name: 'USB-C Hub 7-in-1', category: 'peripheral', tags: ['hub', 'usb-c'], price: 259, stock: 75, discount: { rate: 0.1, label: 'Bundle deal' } },
  { id: 'p6', name: 'Studio Headphones Monitor', category: 'audio', tags: ['headphones', 'wired'], price: 899, stock: 14 },
  { id: 'p7', name: 'Ergonomic Mouse M2', category: 'peripheral', tags: ['mouse', 'wireless'], price: 329, stock: 64, discount: { rate: 0.15, label: 'New arrival' } },
  { id: 'p8', name: 'Portable Speaker Mini', category: 'audio', tags: ['speaker', 'wireless'], price: 459, stock: 41, discount: { rate: 0.1, label: 'Holiday 10% off' } },
  { id: 'p9', name: 'Gaming Headset X', category: 'audio', tags: ['headphones', 'gaming'], price: 699, stock: 22, discount: { rate: 0.12, label: 'Gamer week' } },
  { id: 'p10', name: 'Webcam 1080p', category: 'peripheral', tags: ['webcam'], price: 349, stock: 0 },
  { id: 'p11', name: 'Bone Conduction Headphones', category: 'audio', tags: ['headphones', 'sport'], price: 799, stock: 19, discount: { rate: 0.08, label: 'Sport season' } },
  { id: 'p12', name: 'Kids Headphones Safe', category: 'audio', tags: ['headphones', 'kids'], price: 199, stock: 88, discount: { rate: 0.1, label: 'Holiday 10% off' } },
];

export interface CouponRecord {
  code: string;
  percent: number;
  expiresAt: string;
}

export const coupons: CouponRecord[] = [
  { code: 'SAVE10', percent: 10, expiresAt: '2027-03-31T23:59:59Z' },
  { code: 'NEWUSER', percent: 20, expiresAt: '2027-06-30T23:59:59Z' },
  // imported from the partner campaign sheet
  { code: 'WINTER15', percent: 15, expiresAt: '31/12/2026 23:59' },
];

export const orders = [
  { id: 'o-1001', createdAt: '2026-10-02T09:12:00Z', amount: 1168.2, status: 'delivered' as const },
  { id: 'o-1002', createdAt: '2026-10-15T14:40:00Z', amount: 499, status: 'delivered' as const },
  { id: 'o-1003', createdAt: '2026-10-28T20:05:00Z', amount: 233.1, status: 'shipped' as const },
  { id: 'o-1004', createdAt: '2026-11-03T11:30:00Z', amount: 2599, status: 'paid' as const },
];

export const reports = Array.from({ length: 8 }, (_, i) => ({
  id: `r${i + 1}`,
  title: `Weekly sales report #${i + 1}`,
}));

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
