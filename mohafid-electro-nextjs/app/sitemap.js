import { getProducts } from '@/lib/data';

export default function sitemap() {
  const base = 'https://YOUR-DOMAIN.com';
  const products = getProducts();
  const productUrls = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8
  }));
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...productUrls
  ];
}
