// Аналог _MiniActionCard из teacher_groups_page.dart.

export default function MiniActionCard({ icon, label, badge, onClick }) {
  return (
    <button type="button" className="mini-action-card" onClick={onClick}>
      <i className={`ti ${icon}`} aria-hidden="true" />
      <span>{label}</span>
      {badge !== undefined && <strong className="mini-action-badge">{badge}</strong>}
    </button>
  );
}
