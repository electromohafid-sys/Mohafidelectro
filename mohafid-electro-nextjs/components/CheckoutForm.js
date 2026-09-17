'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutForm({ productId, productName, price }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', contact: '', password: '', address: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, ...form })
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      router.push(`/account?order=${data.orderId}`);
    } else {
      const err = await res.json().catch(() => ({}));
      setError(err.error || 'حصل خطأ، حاول مرة أخرى');
    }
  }

  return (
    <form onSubmit={submit} className="bg-panel border border-border rounded-2xl p-6 space-y-4">
      <div>
        <div className="text-sm text-gray-400 mb-1">المنتج</div>
        <div className="font-bold">{productName} — {Number(price).toLocaleString('en-US')} درهم</div>
      </div>
      <div className="space-y-3">
        <input required placeholder="الاسم الكامل" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-panel2 border border-border rounded-lg p-3" />
        <input required placeholder="رقم واتساب أو إيميل" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="w-full bg-panel2 border border-border rounded-lg p-3" />
        <input required type="password" placeholder="اختر كلمة مرور لحسابك" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-panel2 border border-border rounded-lg p-3" />
        <textarea required placeholder="عنوان التوصيل الكامل" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full bg-panel2 border border-border rounded-lg p-3" />
      </div>
      <p className="text-xs text-gray-400">الدفع عند الاستلام. بإتمام الطلب، غادي يتصنع حساب ليك تلقائيًا تقدر بيه تتبع طلباتك لاحقًا.</p>
      {error && <p className="text-danger text-sm">{error}</p>}
      <button disabled={loading} className="w-full bg-accent text-[#1A1305] font-bold rounded-lg py-3">
        {loading ? 'جاري الإرسال...' : 'تأكيد الطلب'}
      </button>
    </form>
  );
}
