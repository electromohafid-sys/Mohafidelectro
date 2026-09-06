import { NextResponse } from 'next/server';
import { checkPassword, hashPassword, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  const { password } = await request.json();
  if (!checkPassword(password)) {
    return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, hashPassword(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  return res;
}
