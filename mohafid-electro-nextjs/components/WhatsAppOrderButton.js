'use client';

export default function WhatsAppOrderButton({ productId, whatsapp, text }) {
  function handleClick() {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    }).catch(() => {});
  }
  const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      className="inline-flex bg-accent2 text-[#052420] font-bold px-6 py-3 rounded-lg"
    >
      اطلب الآن عبر واتساب
    </a>
  );
}
