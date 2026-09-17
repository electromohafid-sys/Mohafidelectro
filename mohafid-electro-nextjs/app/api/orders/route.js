import { NextResponse } from 'next/server';
import { getOrders } from '@/lib/data';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  return NextResponse.json(getOrders());
}
