import Link from 'next/link';

export default function Footer({ social, categories }) {
  const waHref = `https://wa.me/${social.whatsapp}?text=${encodeURIComponent('عايز أستفسر عن منتج')}`;
  return (
    <footer id="contact" className="border-t border-border bg-panel2 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="font-display font-extrabold text-lg mb-3">محافظ إلكترو</div>
            <p className="text-gray-400 text-sm max-w-xs">متجر إلكترونيات لبيع الهواتف واللابتوبات والأجهزة المنزلية بضمان وتوصيل سريع.</p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-sm">الأقسام</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {categories.map((c) => (
                <li key={c}><Link href={`/products?cat=${encodeURIComponent(c)}`} className="hover:text-accent2">{c}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-sm">الشركة</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#why" className="hover:text-accent2">ليه محافظ إلكترو</a></li>
              <li><Link href="/products" className="hover:text-accent2">المنتجات</Link></li>
              <li><Link href="/admin" className="hover:text-accent2">دخول الإدارة</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-sm">تواصل</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href={waHref} target="_blank" rel="noopener" className="hover:text-accent2">واتساب: {social.whatsapp}</a></li>
              <li><a href={`tel:+${social.whatsapp}`} className="hover:text-accent2">اتصال: {social.whatsapp}</a></li>
              <li>مواعيد العمل: 10ص – 10م</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-5 flex flex-wrap justify-between gap-2 text-xs text-gray-500">
          <span>© 2026 محافظ إلكترو. جميع الحقوق محفوظة.</span>
        </div>
      </div>
    </footer>
  );
}
