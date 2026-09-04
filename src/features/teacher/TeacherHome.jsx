// Аналог teacher_home_wrapper.dart — навигация: Группы / Расписание / Галерея / Сообщения.
// Акцентный цвет оранжевый (как AppColors.orange во Flutter-версии).
//
// На мобильных: BottomNav (нижняя навигация)
// На десктопе (1024px+): SideNav (боковая навигация)

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import SideNav from '../../shared/components/SideNav.jsx';
import MobileMenu from '../../shared/components/MobileMenu.jsx';
import TeacherSchedulePage from './TeacherSchedulePage.jsx';
import TeacherGroupsPage from './TeacherGroupsPage.jsx';
import TeacherGalleryPage from './TeacherGalleryPage.jsx';
import TeacherMessagesPage from './TeacherMessagesPage.jsx';
import TeacherMorePage from './TeacherMorePage.jsx';
import CalendarPage from '../../shared/components/CalendarPage.jsx';
import PaymentPage from './PaymentPage.jsx';
import FoodPage from './FoodPage.jsx';

const NAV_ITEMS = [
  { label: 'Главная', icon: 'ti-home', iconSrc: '/images/nav-home.svg' },
  { label: 'Расписание', icon: 'ti-calendar', iconSrc: '/images/nav-schedule.svg' },
  { label: 'Календарь', icon: 'ti-calendar-event', iconSrc: '/images/nav-calendar.svg' },
  { label: 'Галерея', icon: 'ti-photo', iconSrc: '/images/nav-gallery.svg' },
  { label: 'Сообщения', icon: 'ti-message', iconSrc: '/images/nav-messages.svg' },
  { label: 'Оплата', icon: 'ti-wallet', iconSrc: '/images/nav-payment.svg' },
  { label: 'Еда', icon: 'ti-bowl', iconSrc: '/images/nav-food.svg' },
  { label: 'Ещё', icon: 'ti-dots', iconSrc: '/images/nav-settings.svg' },
];

const PAGES = [TeacherGroupsPage, TeacherSchedulePage, CalendarPage, TeacherGalleryPage, TeacherMessagesPage, PaymentPage, FoodPage, TeacherMorePage];
// bgBeige в оригинале стоит на Главной, Расписании, Галерее и Чате воспитателя
const BEIGE_INDICES = new Set([0, 1, 2, 3, 4, 5, 6]);

export default function TeacherHome() {
  const { appUser, logout } = useUser();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ActivePage = PAGES[activeIndex];
  const isBeige = BEIGE_INDICES.has(activeIndex);

  return (
    <div className={`app-shell ${isBeige ? 'theme-beige' : ''}`}>
      <button type="button" className="mobile-menu-trigger" onClick={() => setIsMenuOpen(true)} aria-label="Открыть меню">
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
          onOpenMessages={() => setActiveIndex(4)}
          onOpenSettings={() => setActiveIndex(7)}
          onOpenGallery={() => setActiveIndex(3)}
          onOpenAttendance={() => setActiveIndex(0)}
        />
      </div>

    </div>
  );
}
