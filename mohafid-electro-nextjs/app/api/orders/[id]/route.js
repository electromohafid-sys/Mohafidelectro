import { NextResponse } from 'next/server';
import { getOrders, saveOrders } from '@/lib/data';
import { requireAdmin } from '@/lib/auth';

export async function PUT(request, { params }) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { status } = await request.json();
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
  orders[idx].status = status;
  orders[idx].trackingSteps = orders[idx].trackingSteps || [];
  orders[idx].trackingSteps.push({ status, date: new Date().toISOString() });
  saveOrders(orders);
  return NextResponse.json(orders[idx]);
}
