import { getCustomerIdFromCookies } from '@/lib/auth';
import AccountLogin from '@/components/AccountLogin';
import AccountOrders from '@/components/AccountOrders';

export const metadata = { title: 'حسابي وطلباتي', robots: { index: false, follow: false } };

export default function AccountPage() {
  const customerId = getCustomerIdFromCookies();
  return customerId ? <AccountOrders /> : <AccountLogin />;
}
