import { products, sleep } from '@/lib/server/db';

export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get('q') ?? '').trim().toLowerCase();
  // simulate a search backend with variable latency
  await sleep(50 + Math.floor(Math.random() * 750));

  const terms = q.split(/\s+/).filter(Boolean);
  const results = products
    .map((p) => {
      const haystack = [p.name, p.category, ...p.tags].join(' ').toLowerCase();
      const score = terms.reduce((acc, term) => (haystack.includes(term) ? acc + 1 : acc), 0);
      return { productId: p.id, title: p.name, score };
    })
    .filter((r) => terms.length > 0 && r.score === terms.length)
    .sort((a, b) => b.score - a.score);

  return Response.json({ query: q, results });
}
