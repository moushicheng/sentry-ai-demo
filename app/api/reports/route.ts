import { reports } from '@/lib/server/db';

export async function GET() {
  return Response.json({ reports });
}
