export default function WhatsappFloat({ number }) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent('عايز أستفسر عن منتج')}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="تواصل واتساب"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-accent2 text-[#052420] flex items-center justify-center shadow-lg"
    >
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.35.64 4.55 1.86 6.5L4 29l7.66-1.8a12 12 0 004.36.82h.01C22.63 28 28 22.6 28 15.98 28 9.36 22.64 3 16.02 3z" />
      </svg>
    </a>
  );
}
