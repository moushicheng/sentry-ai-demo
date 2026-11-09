export interface Discount {
  rate: number;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  tags: string[];
  price: number;
  stock: number;
  /**
   * Optional: not every product is on sale. In `lib/server/db.ts` the
   * `ProductRecord.discount` field is optional and products such as p3, p6 and
   * p10 have no discount, so `/api/products/[id]` returns them without this
   * field. Always handle `undefined` (see SENTRY-AI-DEMO-1).
   */
  discount?: Discount;
}

export interface SearchResult {
  productId: string;
  title: string;
  score: number;
}

export interface CartItem {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  amount: number;
  status: 'paid' | 'shipped' | 'delivered';
}

export interface ReportSummary {
  id: string;
  title: string;
}

export interface ReportDetail extends ReportSummary {
  signature: string;
  samples: number;
  seed: number;
}
