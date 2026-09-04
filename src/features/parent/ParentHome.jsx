// Аналог parent_home_wrapper.dart — обёртка с нижней навигацией
// между профилем ребёнка, расписанием, галереей, сообщениями и "Ещё".
//
// На мобильных: BottomNav (нижняя навигация)
// На десктопе (1024px+): SideNav (боковая навигация)

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import BottomNav from '../../shared/components/BottomNav.jsx';
import SideNav from '../../shared/components/SideNav.jsx';
import SchedulePage from '../../shared/components/SchedulePage.jsx';
import MessagesPage from '../../shared/components/MessagesPage.jsx';
import ChildProfilePage from './ChildProfilePage.jsx';
import ParentGalleryPage from './ParentGalleryPage.jsx';
import MorePage from './MorePage.jsx';

const NAV_ITEMS = [
  { label: 'Профиль', icon: 'ti-user' },
  { label: 'Расписание', icon: 'ti-calendar' },
  { label: 'Галерея', icon: 'ti-photo' },
  { label: 'Сообщения', icon: 'ti-message' },
  { label: 'Ещё', icon: 'ti-dots' },
];

const PAGES = [ChildProfilePage, SchedulePage, ParentGalleryPage, MessagesPage, MorePage];

export default function ParentHome() {
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
        accentColor="#2f80ed"
        userName={appUser.name}
        userRole="Родитель"
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
        accentColor="#2f80ed"
      />
    </div>
  );
}
