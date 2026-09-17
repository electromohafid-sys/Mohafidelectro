import { NextResponse } from 'next/server';
import { getCustomerIdFromCookies } from '@/lib/auth';
import { getOrders } from '@/lib/data';

export async function GET() {
  const customerId = getCustomerIdFromCookies();
  if (!customerId) {
    return NextResponse.json({ error: 'غير مسجل الدخول' }, { status: 401 });
  }
  const orders = getOrders().filter((o) => o.customerId === customerId);
  return NextResponse.json(orders);
}
