import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';

export function hashPassword(pw) {
  return crypto.createHash('sha256').update(pw).digest('hex');
}

export function checkPassword(pw) {
  const expected = process.env.ADMIN_PASSWORD || 'admin123';
  return pw === expected;
}

// Called from Server Components / Route Handlers to check if the request is authenticated.
export function requireAdmin() {
  const session = cookies().get(COOKIE_NAME)?.value;
  if (!session) return false;
  const expected = hashPassword(process.env.ADMIN_PASSWORD || 'admin123');
  return session === expected;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
