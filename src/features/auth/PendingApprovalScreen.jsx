// Аналог PendingApprovalScreen из pending_approval_screen.dart.
// Перенесён точно: круг 120px с иконкой часов на primary/10% фоне,
// заголовок "Ожидайте назначения группы".

export default function PendingApprovalScreen() {
  return (
    <div className="screen screen-center pending-screen">
      <div className="pending-icon">
        <i className="ti ti-clock" aria-hidden="true" />
      </div>
      <h1>Ожидайте назначения группы</h1>
      <p className="muted">
        Администратор скоро назначит вашего ребёнка в группу
      </p>
    </div>
  );
}
