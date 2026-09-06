import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/data';
import { requireAdmin } from '@/lib/auth';

export async function PUT(request, { params }) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
  products[idx] = { ...products[idx], ...body };
  saveProducts(products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(request, { params }) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  let products = getProducts();
  products = products.filter((p) => p.id !== params.id);
  saveProducts(products);
  return NextResponse.json({ ok: true });
}
