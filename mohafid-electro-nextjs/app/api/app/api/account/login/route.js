import { NextResponse } from 'next/server';
import { getCustomers } from '@/lib/data';
import { hashCustomerPassword, signCustomerToken, CUSTOMER_SESSION_COOKIE } from '@/lib/auth';

export async function POST(request) {
  const { contact, password } = await request.json();
  const customers = getCustomers();
  const customer = customers.find((c) => c.contact === (contact || '').trim());
  if (!customer) {
    return NextResponse.json({ error: 'الحساب غير موجود' }, { status: 404 });
  }
  const hash = hashCustomerPassword(password, customer.salt);
  if (hash !== customer.passwordHash) {
    return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(CUSTOMER_SESSION_COOKIE, signCustomerToken(customer.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 90
  });
  return res;
}
