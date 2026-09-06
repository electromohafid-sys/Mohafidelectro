import { requireAdmin } from '@/lib/auth';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata = { robots: { index: false, follow: false } };

export default function AdminPage() {
  const authed = requireAdmin();
  return authed ? <AdminDashboard /> : <AdminLogin />;
}
