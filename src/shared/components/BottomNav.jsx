// Аналог BottomNavigationBar из Flutter (использовался во всех *_home_wrapper.dart).
// accentColor задаётся под роль: у родителя — синий, у воспитателя — оранжевый
// (как было: selectedItemColor: Colors.blueAccent / AppColors.orange).
//
// На мобильных/планшетах: bottom-nav (полная ширина внизу)
// На десктопе (1024px+): отключается через CSS (@media display: none)

export default function BottomNav({ items, activeIndex, onChange, accentColor = '#2481cc' }) {
  return (
    <nav className="bottom-nav" style={{ '--accent': accentColor }}>
      {items.map((item, index) => (
        <button
          key={item.label}
          type="button"
          className={`bottom-nav-item ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onChange(index)}
        >
          <i className={`ti ${item.icon}`} aria-hidden="true" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
