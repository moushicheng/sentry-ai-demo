import { products, sleep } from '@/lib/server/db';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await sleep(120);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 });
  }
  return Response.json(product);
}
