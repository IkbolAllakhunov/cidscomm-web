const PAYMENT_ROWS = [
  { name: 'Арслан Лера', status: 'paid', label: 'Оплачено', avatar: '👦' },
  { name: 'Кендрик Петя', status: 'unpaid', label: 'Не оплачено', avatar: '👧' },
  { name: 'Эдуард Кузьмин', status: 'paid', label: 'Оплачено', avatar: '👶' },
  { name: 'Белова Маша', status: 'paid', label: 'Оплачено', avatar: '👤' },
  { name: 'Белова Маша', status: 'partial', label: 'Частично', avatar: '👤' },
];

export default function PaymentPage() {
  return (
    <div className="screen payment-page">
      <h1>Оплата</h1>
      <div className="payment-group-title">Группа: Кут</div>
      <div className="payment-list">
        {PAYMENT_ROWS.map((row, index) => (
          <div key={`${row.name}-${index}`} className="payment-row">
            <span className="payment-avatar" aria-hidden="true">{row.avatar}</span>
            <span className="payment-name">{row.name}</span>
            <span className={`payment-status payment-status-${row.status}`}>{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
