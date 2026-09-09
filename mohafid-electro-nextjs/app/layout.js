import { Almarai, Tajawal, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSocial, getProducts } from '@/lib/data';
export const dynamic = 'force-dynamic';

const almarai = Almarai({ subsets: ['arabic'], weight: ['700', '800'], variable: '--font-display' });
const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '500', '700'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-mono' });

export const metadata = {
  metadataBase: new URL('https://YOUR-DOMAIN.com'),
  title: { default: 'محافظ إلكترو | متجر إلكترونيات', template: '%s | محافظ إلكترو' },
  description: 'محافظ إلكترو - متجر إلكترونيات موثوق: هواتف، لابتوبات، أجهزة منزلية وإكسسوارات أصلية بضمان وتوصيل سريع.',
  openGraph: { type: 'website', locale: 'ar_AR' }
};

export default function RootLayout({ children }) {
  const social = getSocial();
  const products = getProducts();
  const categories = [...new Set(products.map((p) => p.cat))];

  return (
    <html lang="ar" dir="rtl" className={`${almarai.variable} ${tajawal.variable} ${mono.variable}`}>
      <body className="font-body bg-bg text-white antialiased">
        <Header whatsapp={social.whatsapp} />
        {children}
        <Footer social={social} categories={categories} />
      </body>
    </html>
  );
}
