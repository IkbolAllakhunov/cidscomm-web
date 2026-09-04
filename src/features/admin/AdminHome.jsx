// Аналог AdminApp из admin_app.dart — навигация: Группы / Пользователи / Настройки.
//
// На мобильных: BottomNav (нижняя навигация)
// На десктопе (1024px+): SideNav (боковая навигация)

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import BottomNav from '../../shared/components/BottomNav.jsx';
import SideNav from '../../shared/components/SideNav.jsx';
import AdminGroupsPage from './AdminGroupsPage.jsx';
import AdminUsersPage from './AdminUsersPage.jsx';
import AdminSettingsPage from './AdminSettingsPage.jsx';

const NAV_ITEMS = [
  { label: 'Группы', icon: 'ti-users-group' },
  { label: 'Пользователи', icon: 'ti-user-circle' },
  { label: 'Настройки', icon: 'ti-settings' },
];

const PAGES = [AdminGroupsPage, AdminUsersPage, AdminSettingsPage];

export default function AdminHome() {
  const { appUser, logout } = useUser();
  const [activeIndex, setActiveIndex] = useState(0);
  const ActivePage = PAGES[activeIndex];

  return (
    <div className="app-shell">
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

      {/* Нижняя навигация (мобильные/планшеты) */}
      <BottomNav
        items={NAV_ITEMS}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        accentColor="#6c63ff"
      />
    </div>
  );
}
