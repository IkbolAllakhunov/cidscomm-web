// Боковая навигация для десктопа (1024px+)
// Включается через CSS @media (min-width: 1024px) { display: flex; }
// На мобильных/планшетах скрыта (display: none)

export default function SideNav({ items, activeIndex, onChange, accentColor = '#2481cc', userName, userRole, onLogout }) {
  return (
    <nav className="side-nav" style={{ '--accent': accentColor }}>
      <div className="side-nav-header">
        <div className="side-nav-logo">
          <span className="side-nav-logo-text">Kidscomm</span>
        </div>
      </div>

      <div className="side-nav-items">
        {items.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`side-nav-item ${index === activeIndex ? 'active' : ''}`}
            onClick={() => onChange(index)}
            title={item.label}
          >
            {item.iconSrc ? (
              <span
                className="nav-icon-mask"
                style={{ maskImage: `url(${item.iconSrc})`, WebkitMaskImage: `url(${item.iconSrc})` }}
                aria-hidden="true"
              />
            ) : (
              <i className={`ti ${item.icon}`} aria-hidden="true" />
            )}
            <span className="side-nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      {userName && (
        <div className="side-nav-account">
          <div className="side-nav-account-avatar">{userName.charAt(0)}</div>
          <div className="side-nav-account-copy">
            <strong>{userName}</strong>
            <span>{userRole}</span>
          </div>
          {onLogout && (
            <button type="button" className="side-nav-logout" onClick={onLogout} aria-label="Выйти">
              <i className="ti ti-logout" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
