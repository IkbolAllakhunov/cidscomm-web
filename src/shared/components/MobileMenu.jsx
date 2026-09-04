export default function MobileMenu({ items, activeIndex, onChange, onClose, accentColor = '#f07b4f' }) {
  return (
    <div className="mobile-menu-overlay" role="presentation" onClick={onClose}>
      <aside
        className="mobile-menu"
        style={{ '--accent': accentColor }}
        aria-label="Навигация"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mobile-menu-brand">Kidscomm</div>
        <nav className="mobile-menu-items">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={`mobile-menu-item ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                onChange(index);
                onClose();
              }}
            >
              <i className={`ti ${item.icon}`} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}
