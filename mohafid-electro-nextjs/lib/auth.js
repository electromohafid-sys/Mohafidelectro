import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
const CUSTOMER_COOKIE_NAME = 'customer_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'mohafid-electro-default-secret-change-me';

export function hashPassword(pw) {
  return crypto.createHash('sha256').update(pw).digest('hex');
}

export function checkPassword(pw) {
  const expected = process.env.ADMIN_PASSWORD || 'admin123';
  return pw === expected;
}

export function requireAdmin() {
  const session = cookies().get(COOKIE_NAME)?.value;
  if (!session) return false;
  const expected = hashPassword(process.env.ADMIN_PASSWORD || 'admin123');
  return session === expected;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const CUSTOMER_SESSION_COOKIE = CUSTOMER_COOKIE_NAME;

export function makeSalt() {
  return crypto.randomBytes(16).toString('hex');
}

export function hashCustomerPassword(password, salt) {
  return crypto.createHash('sha256').update(salt + password).digest('hex');
}

export function signCustomerToken(customerId) {
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(customerId).digest('hex');
  return `${customerId}.${sig}`;
}

export function verifyCustomerToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [customerId, sig] = parts;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(customerId).digest('hex');
  if (sig !== expected) return null;
  return customerId;
}

export function getCustomerIdFromCookies() {
  const token = cookies().get(CUSTOMER_COOKIE_NAME)?.value;
  return verifyCustomerToken(token);
}
