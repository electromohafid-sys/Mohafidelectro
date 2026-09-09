import Link from 'next/link';
import StockBadge from './StockBadge';

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block bg-panel border border-border rounded-2xl p-5 hover:border-accent2 transition"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-[11px] text-gray-400 border border-border rounded-full px-2.5 py-1">{product.cat}</span>
        <StockBadge stock={product.stock} />
      </div>
      <div className="h-28 rounded-xl bg-gradient-to-br from-[#16233B] to-[#0D1524] border border-border flex items-center justify-center mb-3 overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-11 h-11 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M9 7h6M9 11h6M9 15h3" />
          </svg>
        )}
      </div>
      </div>
      <h3 className="font-bold mb-1">{product.name}</h3>
      <div className="text-gray-400 text-xs font-mono mb-2" dir="ltr">{product.spec}</div>
      <div className="font-mono font-semibold text-lg">{Number(product.price).toLocaleString('en-US')} درهم</div>
    </Link>
  );
}
