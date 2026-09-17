'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderTracking from './OrderTracking';

export default function AccountOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/account/orders')
      .then((r) => r.json())
      .then((data) => { setOrders(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  async function logout() {
    await fetch('/api/account/logout', { method: 'POST' });
    router.refresh();
  }

  return (
    <section className="pt-10 pb-16">
      <div className="max-w-3xl mx-auto px-5">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-2xl">طلباتي</h1>
          <button onClick={logout} className="border border-border rounded-lg px-4 py-2 text-sm">تسجيل خروج</button>
        </div>
        {loading ? (
          <p className="text-gray-400">جاري التحميل...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400">مفيش طلبات لسه.</p>
        ) : (
          <div className="space-y-4">
            {orders.slice().reverse().map((o) => (
              <div key={o.id} className="bg-panel border border-border rounded-2xl p-5">
                <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                  <div>
                    <div className="font-bold">{o.productName}</div>
                    <div className="text-gray-400 text-xs font-mono">{o.date} · {Number(o.price).toLocaleString('en-US')} درهم</div>
                  </div>
                </div>
                <OrderTracking status={o.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
