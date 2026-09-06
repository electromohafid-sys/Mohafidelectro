import Link from 'next/link';
import { getProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'كل المنتجات',
  description: 'تصفح كل منتجات محافظ إلكترو: هواتف، لابتوبات، أجهزة منزلية وإكسسوارات.'
};

export default function ProductsPage({ searchParams }) {
  const products = getProducts();
  const cat = searchParams.cat || 'الكل';
  const stock = searchParams.stock || 'all';
  const q = (searchParams.q || '').trim();
  const categories = ['الكل', ...new Set(products.map((p) => p.cat))];

  const filtered = products.filter((p) => {
    const mc = cat === 'الكل' || p.cat === cat;
    const ms = stock === 'all' || p.stock === stock;
    const mq = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.cat.toLowerCase().includes(q.toLowerCase());
    return mc && ms && mq;
  });

  function buildHref(overrides) {
    const merged = { cat, stock, q, ...overrides };
    const params = new URLSearchParams();
    if (merged.cat && merged.cat !== 'الكل') params.set('cat', merged.cat);
    if (merged.stock && merged.stock !== 'all') params.set('stock', merged.stock);
    if (merged.q) params.set('q', merged.q);
    const qs = params.toString();
    return qs ? `/products?${qs}` : '/products';
  }

  return (
    <section className="pt-10 pb-16">
      <div className="max-w-6xl mx-auto px-5">
        <h1 className="font-display text-3xl mb-2">كل المنتجات</h1>
        <p className="text-gray-400 mb-8">فلتر سريع حسب التوفر، وابحث بالاسم في أي وقت</p>

        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          {categories.map((c) => (
            <Link
              key={c}
              href={buildHref({ cat: c })}
              className={`shrink-0 px-4 py-2 rounded-full border text-sm ${cat === c ? 'border-accent2 text-white' : 'border-border text-gray-400'}`}
            >
              {c}
            </Link>
          ))}
        </div>

        <form action="/products" method="get" className="flex flex-wrap gap-3 mb-6">
          <input type="hidden" name="cat" value={cat === 'الكل' ? '' : cat} />
          <input type="hidden" name="stock" value={stock === 'all' ? '' : stock} />
          <input name="q" defaultValue={q} placeholder="ابحث عن جهاز… مثلاً: لابتوب" className="flex-1 min-w-[220px] bg-panel border border-border rounded-lg px-4 py-2.5" />
          <button className="px-5 py-2.5 rounded-lg bg-accent text-[#1A1305] font-bold">بحث</button>
        </form>

        <div className="flex gap-2 mb-8 flex-wrap">
          {[['all', 'الكل'], ['in', 'متوفر الآن'], ['soon', 'قريباً'], ['out', 'غير متوفر']].map(([key, label]) => (
            <Link
              key={key}
              href={buildHref({ stock: key })}
              className={`px-4 py-2 rounded-lg border text-sm ${stock === key ? 'bg-accent2 text-[#052420] border-accent2 font-bold' : 'border-border text-gray-400'}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-16">مفيش منتجات مطابقة دلوقتي — جرّب تغيّر الفلتر أو كلمة البحث.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-5">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
