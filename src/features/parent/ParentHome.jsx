// Аналог parent_home_wrapper.dart — обёртка с нижней навигацией
// между профилем ребёнка, расписанием, галереей, сообщениями и "Ещё".
//
// На мобильных: BottomNav (нижняя навигация)
// На десктопе (1024px+): SideNav (боковая навигация)

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import SideNav from '../../shared/components/SideNav.jsx';
import MobileMenu from '../../shared/components/MobileMenu.jsx';
import SchedulePage from '../../shared/components/SchedulePage.jsx';
import MessagesPage from '../../shared/components/MessagesPage.jsx';
import ChildProfilePage from './ChildProfilePage.jsx';
import ParentGalleryPage from './ParentGalleryPage.jsx';
import MorePage from './MorePage.jsx';
import CalendarPage from '../../shared/components/CalendarPage.jsx';
import PaymentPage from '../../shared/components/PaymentPage.jsx';

const NAV_ITEMS = [
  { label: 'Профиль', icon: 'ti-user' },
  { label: 'Расписание', icon: 'ti-calendar' },
  { label: 'Календарь', icon: 'ti-calendar-event' },
  { label: 'Галерея', icon: 'ti-photo' },
  { label: 'Сообщения', icon: 'ti-message' },
  { label: 'Оплата', icon: 'ti-wallet' },
  { label: 'Ещё', icon: 'ti-dots' },
];

const PAGES = [ChildProfilePage, SchedulePage, CalendarPage, ParentGalleryPage, MessagesPage, PaymentPage, MorePage];

export default function ParentHome() {
  const { appUser, logout } = useUser();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ActivePage = PAGES[activeIndex];

  return (
    <div className="app-shell">
      <button type="button" className="mobile-menu-trigger" onClick={() => setIsMenuOpen(true)} aria-label="Открыть меню">
        <i className="ti ti-menu-2" aria-hidden="true" />
      </button>
      {isMenuOpen && (
        <MobileMenu
          items={NAV_ITEMS}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          onClose={() => setIsMenuOpen(false)}
          accentColor="#2f80ed"
        />
      )}
      {/* Боковая навигация (десктоп, 1024px+) */}
      <SideNav
        items={NAV_ITEMS}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        accentColor="#2f80ed"
        userName={appUser.name}
        userRole="Родитель"
        onLogout={logout}
      />

      <div className="app-shell-content">
        <ActivePage />
      </div>

    </div>
  );
}
