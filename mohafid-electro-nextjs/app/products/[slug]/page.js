import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProducts, getSocial } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import StockBadge from '@/components/StockBadge';
import WhatsAppOrderButton from '@/components/WhatsAppOrderButton';
import LeadModalButton from '@/components/LeadModalButton';

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const products = getProducts();
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.desc || product.spec,
    openGraph: { title: product.name, description: product.desc || product.spec, type: 'website' }
  };
}

export default function ProductDetailPage({ params }) {
  const products = getProducts();
  const social = getSocial();
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.desc || product.spec,
    category: product.cat,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EGP',
      availability: product.stock === 'in' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    }
  };

  return (
    <section className="pt-10 pb-16">
      <div className="max-w-6xl mx-auto px-5">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <Link href="/products" className="text-sm text-gray-400 hover:text-accent2">→ الرجوع لكل المنتجات</Link>

        <div className="grid md:grid-cols-2 gap-10 mt-6">
          <div className="h-80 rounded-2xl bg-gradient-to-br from-[#16233B] to-[#0D1524] border border-border flex items-center justify-center">
            <svg className="w-28 h-28 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="5" y="3" width="14" height="18" rx="2" />
              <path d="M9 7h6M9 11h6M9 15h3" />
            </svg>
          </div>
          <div>
            <div className="text-accent2 text-xs mb-2">{product.cat}</div>
            <h1 className="font-display text-3xl mb-3">{product.name}</h1>
            <div className="font-mono text-2xl font-semibold mb-4">{Number(product.price).toLocaleString('en-US')} ج.م</div>
            <div className="mb-5"><StockBadge stock={product.stock} /></div>
            <p className="text-gray-400 mb-5">{product.desc}</p>
            <div className="bg-panel border border-border rounded-xl p-4 font-mono text-sm text-gray-400 mb-6" dir="ltr">{product.spec}</div>
            {product.stock === 'in' ? (
              <WhatsAppOrderButton
                productId={product.id}
                whatsapp={social.whatsapp}
                text={`عايز أطلب: ${product.name} - ${product.price} ج.م`}
              />
            ) : (
              <LeadModalButton productId={product.id} productName={product.name} />
            )}
          </div>
        </div>

        {related.length > 0 && (
          <>
            <h2 className="font-display text-xl mt-14 mb-5">منتجات مشابهة</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-5">
              {related.map((r) => <ProductCard key={r.id} product={r} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
