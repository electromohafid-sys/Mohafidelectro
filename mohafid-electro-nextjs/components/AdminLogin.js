'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (res.ok) {
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error || 'خطأ غير معروف');
    }
  }

  return (
    <section className="pt-16 pb-16">
      <div className="max-w-sm mx-auto bg-panel border border-border rounded-2xl p-8 text-center">
        <h1 className="text-xl font-display mb-2">دخول لوحة التحكم</h1>
        <p className="text-gray-400 text-sm mb-5">الوصول مخصص لصاحب المتجر فقط</p>
        <div className="text-xs text-right bg-danger/10 border border-danger text-red-200 rounded-lg p-3 mb-5">
          الباسورد بيتخزن كمتغير بيئة (ADMIN_PASSWORD) وكوكي httpOnly — أأمن من نسخة العرض السابقة.
          لكن لو أكتر من شخص هيدخل الإدارة، الأفضل مستقبلاً نظام مستخدمين حقيقي (مثلاً NextAuth).
        </div>
        {error && <p className="text-danger text-sm mb-3">{error}</p>}
        <form onSubmit={submit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className="w-full text-center bg-panel2 border border-border rounded-lg p-3 mb-4"
          />
          <button className="w-full bg-accent text-[#1A1305] font-bold rounded-lg py-3">دخول</button>
        </form>
      </div>
    </section>
  );
}
