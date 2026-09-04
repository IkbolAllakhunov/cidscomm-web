// Аналог teacher_home_wrapper.dart — навигация: Группы / Расписание / Галерея / Сообщения.
// Акцентный цвет оранжевый (как AppColors.orange во Flutter-версии).
//
// На мобильных: BottomNav (нижняя навигация)
// На десктопе (1024px+): SideNav (боковая навигация)

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import BottomNav from '../../shared/components/BottomNav.jsx';
import SideNav from '../../shared/components/SideNav.jsx';
import MobileMenu from '../../shared/components/MobileMenu.jsx';
import TeacherSchedulePage from './TeacherSchedulePage.jsx';
import TeacherGroupsPage from './TeacherGroupsPage.jsx';
import TeacherGalleryPage from './TeacherGalleryPage.jsx';
import TeacherMessagesPage from './TeacherMessagesPage.jsx';
import TeacherMorePage from './TeacherMorePage.jsx';

const NAV_ITEMS = [
  { label: 'Главная', icon: 'ti-home' },
  { label: 'Расписание', icon: 'ti-calendar' },
  { label: 'Галерея', icon: 'ti-photo' },
  { label: 'Сообщения', icon: 'ti-message' },
  { label: 'Ещё', icon: 'ti-dots' },
];

const PAGES = [TeacherGroupsPage, TeacherSchedulePage, TeacherGalleryPage, TeacherMessagesPage, TeacherMorePage];
// bgBeige в оригинале стоит на Главной, Расписании, Галерее и Чате воспитателя
const BEIGE_INDICES = new Set([0, 1, 2, 3]);

export default function TeacherHome() {
  const { appUser, logout } = useUser();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ActivePage = PAGES[activeIndex];
  const isBeige = BEIGE_INDICES.has(activeIndex);

  return (
    <div className={`app-shell ${isBeige ? 'theme-beige' : ''}`}>
      <button
        type="button"
        className="mobile-menu-trigger"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Открыть меню"
      >
        <i className="ti ti-menu-2" aria-hidden="true" />
      </button>

      {isMenuOpen && (
        <MobileMenu
          items={NAV_ITEMS}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          onClose={() => setIsMenuOpen(false)}
          accentColor="#ea784a"
        />
      )}

      {/* Боковая навигация (десктоп, 1024px+) */}
      <SideNav
        items={NAV_ITEMS}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        accentColor="#ea784a"
        userName={appUser.name}
        userRole="Воспитатель"
        onLogout={logout}
      />

      <div className="app-shell-content">
        <ActivePage
          onOpenMessages={() => setActiveIndex(3)}
          onOpenSettings={() => setActiveIndex(4)}
          onOpenGallery={() => setActiveIndex(2)}
        />
      </div>

      {/* Нижняя навигация (мобильные/планшеты) */}
      <BottomNav
        items={NAV_ITEMS}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        accentColor="#ea784a"
      />
    </div>
  );
}
