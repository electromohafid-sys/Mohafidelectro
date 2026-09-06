import { NextResponse } from 'next/server';
import { getSocial, saveSocial } from '@/lib/data';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(getSocial());
}

export async function PUT(request) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  saveSocial(body);
  return NextResponse.json(body);
}
