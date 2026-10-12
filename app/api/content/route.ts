import { getPublicContent } from '@/lib/contentServer';
import { connection } from 'next/server';
export async function GET() {
  await connection();
  const state = await getPublicContent();
  return Response.json(state, { status: state.content ? 200 : 503, headers: { 'Cache-Control': 'no-store' } });
}
