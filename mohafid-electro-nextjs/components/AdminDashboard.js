'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const emptyForm = { id: '', name: '', cat: '', price: '', stock: 'in', spec: '', desc: '', image: '' };

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [social, setSocial] = useState({ whatsapp: '', facebook: '', instagram: '', tiktok: '', youtube: '' });
  const [form, setForm] = useState(emptyForm);
  const [toastMsg, setToastMsg] = useState('');

  function toast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2200);
  }

  async function loadAll() {
    const [p, l, s] = await Promise.all([
      fetch('/api/products').then((r) => r.json()),
      fetch('/api/leads').then((r) => (r.ok ? r.json() : [])),
      fetch('/api/social').then((r) => r.json())
    ]);
    setProducts(p);
    setLeads(l);
    setSocial(s);
  }
  useEffect(() => { loadAll(); }, []);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  async function submitProduct(e) {
    e.preventDefault();
    const payload = { name: form.name, cat: form.cat, price: Number(form.price), stock: form.stock, spec: form.spec, desc: form.desc };
    if (form.id) {
      await fetch(`/api/products/${form.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      toast('تم تحديث المنتج');
    } else {
      await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      toast('تم إضافة المنتج');
    }
    setForm(emptyForm);
    loadAll();
  }

  function editProduct(p) {
    setForm({ id: p.id, name: p.name, cat: p.cat, price: p.price, stock: p.stock, spec: p.spec, desc: p.desc || '' });
    setTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteProduct(id) {
    if (!confirm('متأكد من الحذف؟')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    toast('تم الحذف');
    loadAll();
  }

  async function deleteLead(id) {
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    loadAll();
  }

  async function submitSocial(e) {
    e.preventDefault();
    await fetch('/api/social', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(social) });
    toast('تم حفظ الروابط');
  }

  const counts = { in: 0, out: 0, soon: 0 };
  products.forEach((p) => counts[p.stock]++);
  const value = products.filter((p) => p.stock === 'in').reduce((s, p) => s + Number(p.price), 0);
  const catCounts = {};
  products.forEach((p) => { catCounts[p.cat] = (catCounts[p.cat] || 0) + 1; });
  const maxCat = Math.max(...Object.values(catCounts), 1);

  return (
    <section className="pt-10 pb-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-display">لوحة تحكم محافظ إلكترو</h1>
            <p className="text-gray-400 text-sm">إحصائيات، إدارة منتجات، وروابط السوشيال ميديا</p>
          </div>
          <button onClick={logout} className="border border-border rounded-lg px-4 py-2 text-sm">تسجيل خروج</button>
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-6 items-start">
          <div className="bg-panel border border-border rounded-2xl p-3 flex md:flex-col gap-1.5 md:sticky md:top-24 overflow-x-auto">
            {[
              ['overview', 'نظرة عامة'],
              ['products', 'المنتجات'],
              ['leads', `طلبات التنبيه (${leads.length})`],
              ['social', 'السوشيال ميديا']
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`text-sm rounded-lg px-3 py-2.5 text-right whitespace-nowrap ${tab === key ? 'bg-accent text-[#1A1305] font-bold' : 'text-gray-400'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div>
            {tab === 'overview' && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <StatCard label="إجمالي المنتجات" value={products.length} />
                  <StatCard label="متوفر الآن" value={counts.in} color="text-accent2" />
                  <StatCard label="غير متوفر" value={counts.out} color="text-danger" />
                  <StatCard label="قيمة المخزون" value={`${value.toLocaleString('en-US')} ج.م`} />
                </div>
                <div className="bg-panel border border-border rounded-2xl p-5 mb-6">
                  <h3 className="font-bold mb-4">توزيع المنتجات حسب القسم</h3>
                  {Object.entries(catCounts).map(([cat, count]) => (
                    <div key={cat} className="grid grid-cols-[110px_1fr_30px] items-center gap-3 text-sm mb-2.5">
                      <span>{cat}</span>
                      <div className="bg-panel2 rounded h-2.5 overflow-hidden">
                        <div className="bg-accent2 h-full rounded" style={{ width: `${(count / maxCat) * 100}%` }}></div>
                      </div>
                      <span className="font-mono">{count}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-panel border border-border rounded-2xl p-5">
                  <h3 className="font-bold mb-4">طلبات تنبيه بانتظار الرد: {leads.length}</h3>
                  <p className="text-gray-400 text-sm">التفاصيل الكاملة موجودة في تبويب &quot;طلبات التنبيه&quot;.</p>
                </div>
              </>
            )}

            {tab === 'products' && (
              <>
                <form onSubmit={submitProduct} className="bg-panel border border-border rounded-2xl p-5 mb-6 grid md:grid-cols-2 gap-3">
                  <input required placeholder="اسم المنتج" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5" />
                  <input required placeholder="القسم" value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5" />
                  <input required type="number" placeholder="السعر" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5" />
                  <select value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5">
                    <option value="in">متوفر الآن</option>
                    <option value="soon">قريباً</option>
                    <option value="out">غير متوفر</option>
                  </select>
                  <input placeholder="مواصفات مختصرة" value={form.spec} onChange={(e) => setForm({ ...form, spec: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5 md:col-span-2" />
                  <textarea placeholder="وصف المنتج" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5 md:col-span-2" />
                  <div className="flex gap-2 md:col-span-2">
                    <button className="bg-accent text-[#1A1305] font-bold rounded-lg px-5 py-2.5">{form.id ? 'حفظ التعديل' : 'إضافة المنتج'}</button>
                    {form.id && <button type="button" onClick={() => setForm(emptyForm)} className="border border-border rounded-lg px-5 py-2.5">إلغاء</button>}
                  </div>
                </form>

                <div className="bg-panel border border-border rounded-2xl p-5 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-gray-400 text-xs">
                      <tr><th className="text-right p-2">الاسم</th><th className="text-right p-2">القسم</th><th className="text-right p-2">السعر</th><th className="text-right p-2">الحالة</th><th className="p-2">تحكم</th></tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="border-t border-border">
                          <td className="p-2">{p.name}</td>
                          <td className="p-2">{p.cat}</td>
                          <td className="p-2 font-mono">{Number(p.price).toLocaleString('en-US')}</td>
                          <td className="p-2">{p.stock}</td>
                          <td className="p-2 flex gap-2">
                            <button onClick={() => editProduct(p)} className="border border-border rounded-lg px-3 py-1 text-xs">تعديل</button>
                            <button onClick={() => deleteProduct(p.id)} className="bg-danger text-[#2A0A0F] rounded-lg px-3 py-1 text-xs">حذف</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {tab === 'leads' && (
              <div className="bg-panel border border-border rounded-2xl p-5 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 text-xs">
                    <tr><th className="text-right p-2">المنتج</th><th className="text-right p-2">الاسم</th><th className="text-right p-2">الهاتف</th><th className="text-right p-2">التاريخ</th><th className="p-2">تحكم</th></tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 && (
                      <tr><td colSpan="5" className="text-center p-6 text-gray-400">مفيش طلبات تنبيه لسه</td></tr>
                    )}
                    {leads.slice().reverse().map((l) => (
                      <tr key={l.id} className="border-t border-border">
                        <td className="p-2">{l.productName}</td>
                        <td className="p-2">{l.name}</td>
                        <td className="p-2 font-mono"><a href={`tel:${l.phone}`}>{l.phone}</a></td>
                        <td className="p-2 font-mono">{l.date}</td>
                        <td className="p-2"><button onClick={() => deleteLead(l.id)} className="bg-danger text-[#2A0A0F] rounded-lg px-3 py-1 text-xs">حذف</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'social' && (
              <form onSubmit={submitSocial} className="bg-panel border border-border rounded-2xl p-5 grid md:grid-cols-2 gap-3">
                <input placeholder="رقم واتساب" value={social.whatsapp} onChange={(e) => setSocial({ ...social, whatsapp: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5" />
                <input placeholder="فيسبوك" value={social.facebook} onChange={(e) => setSocial({ ...social, facebook: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5" />
                <input placeholder="إنستجرام" value={social.instagram} onChange={(e) => setSocial({ ...social, instagram: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5" />
                <input placeholder="تيك توك" value={social.tiktok} onChange={(e) => setSocial({ ...social, tiktok: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5" />
                <input placeholder="يوتيوب" value={social.youtube} onChange={(e) => setSocial({ ...social, youtube: e.target.value })} className="bg-panel2 border border-border rounded-lg p-2.5 md:col-span-2" />
                <button className="bg-accent text-[#1A1305] font-bold rounded-lg px-5 py-2.5 md:col-span-2">حفظ الروابط</button>
              </form>
            )}
          </div>
        </div>
      </div>
      {toastMsg && <div className="fixed bottom-5 right-5 bg-accent2 text-[#052420] font-bold px-5 py-3 rounded-lg">{toastMsg}</div>}
    </section>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-panel border border-border rounded-xl p-4">
      <div className="text-xs text-gray-400 mb-2">{label}</div>
      <div className={`font-mono text-2xl font-semibold ${color || ''}`}>{value}</div>
    </div>
  );
}
