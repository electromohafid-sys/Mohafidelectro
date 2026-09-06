'use client';
import { useState } from 'react';

export default function LeadModalButton({ productId, productName }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  async function submit(e) {
    e.preventDefault();
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, name, phone })
    });
    setSent(true);
    setTimeout(() => setOpen(false), 1500);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex border border-border px-6 py-3 rounded-lg font-bold"
      >
        أعلمني عند التوفر
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="bg-panel border border-border rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-bold mb-1">أعلمني عند التوفر</h3>
            <p className="text-gray-400 text-sm mb-4">هنبعتلك واتساب أول ما &quot;{productName}&quot; يرجع.</p>
            {sent ? (
              <p className="text-accent2 text-sm">تم تسجيل طلبك، شكرًا!</p>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="الاسم" className="w-full bg-panel2 border border-border rounded-lg p-3" />
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="رقم الهاتف" className="w-full bg-panel2 border border-border rounded-lg p-3" />
                <div className="flex gap-2">
                  <button className="flex-1 bg-accent text-[#1A1305] font-bold rounded-lg py-2.5">تأكيد</button>
                  <button type="button" onClick={() => setOpen(false)} className="border border-border rounded-lg px-4">إلغاء</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
