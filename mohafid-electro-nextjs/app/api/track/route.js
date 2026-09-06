import { NextResponse } from 'next/server';
import { getClicks, saveClicks } from '@/lib/data';

// Public: fired when a visitor clicks "اطلب الآن عبر واتساب" on an in-stock product.
// Powers the real "best sellers" ranking in the admin dashboard.
export async function POST(request) {
  const { productId } = await request.json();
  const clicks = getClicks();
  clicks[productId] = (clicks[productId] || 0) + 1;
  saveClicks(clicks);
  return NextResponse.json({ ok: true });
}
