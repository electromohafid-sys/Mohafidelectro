import { NextResponse } from 'next/server';
import { getLeads, saveLeads, getClicks, saveClicks, getProducts } from '@/lib/data';
import { requireAdmin } from '@/lib/auth';

// Admin-only: list all leads
export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  return NextResponse.json(getLeads());
}

// Public: a visitor submits the "notify me" form
export async function POST(request) {
  const body = await request.json();
  const products = getProducts();
  const product = products.find((p) => p.id === body.productId);

  const leads = getLeads();
  const lead = {
    id: 'l' + Date.now(),
    productId: body.productId,
    productName: product ? product.name : '',
    name: body.name,
    phone: body.phone,
    date: new Date().toISOString().slice(0, 10)
  };
  leads.push(lead);
  saveLeads(leads);

  // Count this as interest, same signal used for "best sellers"
  const clicks = getClicks();
  clicks[body.productId] = (clicks[body.productId] || 0) + 1;
  saveClicks(clicks);

  return NextResponse.json(lead, { status: 201 });
}
