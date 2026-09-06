import Link from 'next/link';
import { getProducts, getSocial, getClicks } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import WhatsappFloat from '@/components/WhatsappFloat';

export default function HomePage() {
  const products = getProducts();
  const social = getSocial();
  const clicks = getClicks();
  const counts = { in: 0, out: 0, soon: 0 };
  products.forEach((p) => counts[p.stock]++);
  const categories = [...new Set(products.map((p) => p.cat))];
  const featured = [...products].sort((a, b) => (clicks[b.id] || 0) - (clicks[a.id] || 0)).slice(0, 3);
  const waLink = (text) => `https://wa.me/${social.whatsapp}?text=${encodeURIComponent(text)}`;

  const socialLinks = [
    social.whatsapp && { label: 'واتساب', href: waLink('عايز أستفسر عن منتج') },
    social.facebook && { label: 'فيسبوك', href: social.facebook },
    social.instagram && { label: 'إنستجرام', href: social.instagram },
    social.tiktok && { label: 'تيك توك', href: social.tiktok },
    social.youtube && { label: 'يوتيوب', href: social.youtube }
  ].filter(Boolean);

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-10">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <div className="text-accent2 font-mono text-sm mb-3">● متجر إلكترونيات موثوق</div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              جهّز بيتك ومكتبك بـ<span className="text-accent">أحدث الأجهزة</span>، واطلب في دقيقة
            </h1>
            <p className="text-gray-400 text-lg max-w-lg mb-7">
              هواتف ولابتوبات وأجهزة منزلية أصلية بضمان حقيقي. تصفح المخزون لحظة بلحظة، واطلب مباشرة عبر واتساب بدون تعقيد.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/products" className="bg-accent text-[#1A1305] font-bold px-6 py-3 rounded-lg">تصفح المنتجات</Link>
              <a href={waLink('عايز أستفسر عن منتج')} target="_blank" rel="noopener" className="border border-border px-6 py-3 rounded-lg font-bold">تواصل واتساب</a>
            </div>
          </div>
          <div className="bg-panel border border-border rounded-2xl p-6">
            <Row label="منتجات متوفرة الآن" value={`${counts.in} من ${products.length}`} />
            <Row label="توصيل خلال" value="24 ساعة" />
            <Row label="ضمان" value="حتى 24 شهر" />
            <Row label="الدفع" value="عند الاستلام" last />
          </div>
        </div>
      </section>

      <div className="border-y border-border bg-panel2 py-3">
        <div className="max-w-6xl mx-auto px-5 flex gap-8 justify-center flex-wrap font-mono text-sm text-gray-400">
          <span><i className="inline-block w-2 h-2 rounded-full bg-accent2 animate-pulse ml-2 align-middle"></i><b className="text-white">{counts.in}</b> منتج متوفر الآن</span>
          <span><i className="inline-block w-2 h-2 rounded-full bg-accent ml-2 align-middle"></i><b className="text-white">{counts.soon}</b> قريباً</span>
          <span><i className="inline-block w-2 h-2 rounded-full bg-danger/70 ml-2 align-middle"></i><b className="text-white">{counts.out}</b> غير متوفر</span>
        </div>
      </div>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="font-display text-2xl mb-6">تسوّق حسب القسم</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((c) => (
              <Link key={c} href={`/products?cat=${encodeURIComponent(c)}`} className="shrink-0 border border-border rounded-full px-4 py-2 text-sm text-gray-400 hover:border-accent2 hover:text-white">{c}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-between items-end flex-wrap gap-3 mb-6">
            <h2 className="font-display text-2xl">الأكثر طلبًا</h2>
            <Link href="/products" className="border border-border rounded-lg px-4 py-2 text-sm">كل المنتجات</Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-5">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section id="why" className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="font-display text-2xl mb-8">ليه تشتري من محافظ إلكترو</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Value title="منتجات أصلية 100%" desc="كل جهاز بيوصلك بفاتورة وضمان موثّق من الوكيل." />
            <Value title="توصيل سريع" desc="خلال 24 ساعة في المدن الكبرى." />
            <Value title="دعم بعد البيع" desc="فريق فني بيرد عليك واتساب في نفس اليوم." />
            <Value title="مخزون محدّث لحظيًا" desc="تعرف فورًا إيه المتوفر." />
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-6xl mx-auto px-5">
          <div className="bg-gradient-to-l from-[#0F1A2C] to-[#14233B] border border-border rounded-3xl p-10 flex justify-between items-center flex-wrap gap-6">
            <div>
              <h2 className="font-display text-xl mb-2">عايز جهاز مش لاقيه؟</h2>
              <p className="text-gray-400 text-sm">افتح صفحة المنتج وسجّل رقمك، وهنبعتلك واتساب أول ما يتوفر.</p>
            </div>
            <Link href="/products" className="bg-accent text-[#1A1305] font-bold px-6 py-3 rounded-lg">تصفح المنتجات</Link>
          </div>
        </div>
      </section>

      {socialLinks.length > 0 && (
        <section className="py-14">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="font-display text-2xl mb-6 text-center">تابعنا على السوشيال ميديا</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" className="bg-panel border border-border rounded-xl px-5 py-3.5 font-semibold text-sm hover:border-accent2">{s.label}</a>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhatsappFloat number={social.whatsapp} />
    </>
  );
}

function Row({ label, value, last }) {
  return (
    <div className={`flex justify-between items-center py-3 ${last ? '' : 'border-b border-dashed border-border'}`}>
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}

function Value({ title, desc }) {
  return (
    <div className="bg-panel border border-border rounded-2xl p-5">
      <h3 className="font-bold mb-1.5 text-[15px]">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
