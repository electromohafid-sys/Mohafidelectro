import { NextResponse } from 'next/server';
import { getLeads, saveLeads } from '@/lib/data';
import { requireAdmin } from '@/lib/auth';

export async function DELETE(request, { params }) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  let leads = getLeads();
  leads = leads.filter((l) => l.id !== params.id);
  saveLeads(leads);
  return NextResponse.json({ ok: true });
}
