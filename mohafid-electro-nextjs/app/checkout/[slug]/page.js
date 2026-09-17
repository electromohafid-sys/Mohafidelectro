import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/data';
import CheckoutForm from '@/components/CheckoutForm';

export const metadata = { title: 'إتمام الشراء', robots: { index: false, follow: false } };

export default function CheckoutPage({ params }) {
  const products = getProducts();
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <section className="pt-10 pb-16">
      <div className="max-w-lg mx-auto px-5">
        <h1 className="font-display text-2xl mb-6">إتمام الشراء</h1>
        <CheckoutForm productId={product.id} productName={product.name} price={product.price} />
      </div>
    </section>
  );
}
