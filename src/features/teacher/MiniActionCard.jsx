// Аналог _MiniActionCard из teacher_groups_page.dart.

export default function MiniActionCard({ icon, label, badge, onClick }) {
  return (
    <button type="button" className="mini-action-card" onClick={onClick}>
      <span className="mini-action-label">
        <span>{label}</span>
        <i className={`ti ${icon}`} aria-hidden="true" />
      </span>
      {badge !== undefined && <strong className="mini-action-badge">{badge}</strong>}
    </button>
  );
}
