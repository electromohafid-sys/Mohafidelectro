import { NextResponse } from 'next/server';
import { getProducts, saveProducts, slugify } from '@/lib/data';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(request) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const products = getProducts();
  const id = 'p' + Date.now();
  const slug = slugify(body.name, id.slice(-5));
  const product = { id, slug, ...body };
  products.push(product);
  saveProducts(products);
  return NextResponse.json(product, { status: 201 });
}
