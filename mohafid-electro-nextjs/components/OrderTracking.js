const STATUS_LABELS = {
  placed: 'تم استلام الطلب',
  confirmed: 'تم تأكيد الطلب',
  shipped: 'في الطريق إليك',
  delivered: 'تم التوصيل',
  cancelled: 'تم إلغاء الطلب'
};
const FLOW = ['placed', 'confirmed', 'shipped', 'delivered'];

export default function OrderTracking({ status }) {
  if (status === 'cancelled') {
    return <div className="text-danger font-bold text-sm">{STATUS_LABELS.cancelled}</div>;
  }
  const currentIndex = FLOW.indexOf(status);
  return (
    <div className="flex items-start gap-1 flex-wrap">
      {FLOW.map((step, i) => {
        const done = i <= currentIndex;
        return (
          <div key={step} className="flex items-center gap-1">
            <div className={`flex flex-col items-center w-16 ${done ? '' : 'opacity-40'}`}>
              <div className={`w-3 h-3 rounded-full ${done ? 'bg-accent2' : 'bg-gray-600'}`}></div>
              <span className="text-[10px] text-gray-400 mt-1 text-center leading-tight">{STATUS_LABELS[step]}</span>
            </div>
            {i < FLOW.length - 1 && <div className={`w-6 h-0.5 mt-1.5 ${i < currentIndex ? 'bg-accent2' : 'bg-gray-700'}`}></div>}
          </div>
        );
      })}
    </div>
  );
}
