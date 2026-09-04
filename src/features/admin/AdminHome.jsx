// Аналог AdminApp из admin_app.dart — навигация: Группы / Пользователи / Настройки.
//
// На мобильных: BottomNav (нижняя навигация)
// На десктопе (1024px+): SideNav (боковая навигация)

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import SideNav from '../../shared/components/SideNav.jsx';
import MobileMenu from '../../shared/components/MobileMenu.jsx';
import AdminGroupsPage from './AdminGroupsPage.jsx';
import AdminUsersPage from './AdminUsersPage.jsx';
import AdminSettingsPage from './AdminSettingsPage.jsx';
import PaymentPage from '../../shared/components/PaymentPage.jsx';

const NAV_ITEMS = [
  { label: 'Группы', icon: 'ti-users-group' },
  { label: 'Пользователи', icon: 'ti-user-circle' },
  { label: 'Оплата', icon: 'ti-wallet' },
  { label: 'Настройки', icon: 'ti-settings' },
];

const PAGES = [AdminGroupsPage, AdminUsersPage, PaymentPage, AdminSettingsPage];

export default function AdminHome() {
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
          accentColor="#6c63ff"
        />
      )}
      {/* Боковая навигация (десктоп, 1024px+) */}
      <SideNav
        items={NAV_ITEMS}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        accentColor="#6c63ff"
        userName={appUser.name}
        userRole="Администратор"
        onLogout={logout}
      />

      <div className="app-shell-content">
        <ActivePage />
      </div>

    </div>
  );
}
