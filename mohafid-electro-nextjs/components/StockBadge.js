const MAP = {
  in: { label: 'متوفر الآن', color: 'text-accent2', dot: 'bg-accent2 animate-pulse' },
  out: { label: 'غير متوفر', color: 'text-danger', dot: 'bg-danger/70' },
  soon: { label: 'قريباً', color: 'text-accent', dot: 'bg-accent' }
};

export default function StockBadge({ stock }) {
  const s = MAP[stock] || MAP.in;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${s.color}`}>
      <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>
      {s.label}
    </span>
  );
}
