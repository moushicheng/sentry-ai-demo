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
