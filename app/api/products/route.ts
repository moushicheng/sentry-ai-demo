import { products } from '@/lib/server/db';

export async function GET() {
  return Response.json({ products });
}
