'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header({ whatsapp }) {
  const [open, setOpen] = useState(false);
  const waHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent('عايز أستفسر عن منتج')}`;

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-5 h-[74px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-display font-extrabold text-lg">
          <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="#F2A93B" />
            <path d="M22 8L12 22h7l-2 10 11-15h-8l2-9z" fill="#0A0F1C" />
          </svg>
          محافظ إلكترو
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-gray-400 font-medium">
          <Link href="/" className="hover:text-accent2">الرئيسية</Link>
          <Link href="/products" className="hover:text-accent2">كل المنتجات</Link>
          <a href="/#why" className="hover:text-accent2">ليه محافظ إلكترو</a>
          <a href="/#contact" className="hover:text-accent2">تواصل معنا</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href={waHref} target="_blank" rel="noopener" className="bg-accent2 text-[#052420] font-bold px-5 py-2.5 rounded-lg text-sm">اطلب واتساب</a>
          <button onClick={() => setOpen(!open)} aria-label="فتح القائمة" className="md:hidden w-10 h-10 border border-border rounded-lg">☰</button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden flex flex-col gap-4 p-5 bg-panel border-b border-border">
          <Link href="/" onClick={() => setOpen(false)}>الرئيسية</Link>
          <Link href="/products" onClick={() => setOpen(false)}>كل المنتجات</Link>
          <a href="/#why" onClick={() => setOpen(false)}>ليه محافظ إلكترو</a>
          <a href="/#contact" onClick={() => setOpen(false)}>تواصل معنا</a>
        </nav>
      )}
    </header>
  );
}
