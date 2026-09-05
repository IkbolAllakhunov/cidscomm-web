// Аналог TeacherMorePage / экран «Настройки» из Figma (sadik, фрейм 2146:655):
// белые таблетки-строки с переключателями уведомлений/темы, языком и
// действиями (выйти, поддержка, о нас). Профиль — доп. пункт, своего
// экрана в Figma не имеет, но функциональность нужно куда-то оставить.

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import ProfileSettingsPage from '../../shared/components/ProfileSettingsPage.jsx';

export default function TeacherMorePage() {
  const { logout } = useUser();
  const [openKey, setOpenKey] = useState(null);
  const [notifications, setNotifications] = useState(false);
  const [lightTheme, setLightTheme] = useState(true);

  if (openKey === 'profile') {
    return <ProfileSettingsPage onBack={() => setOpenKey(null)} />;
  }

  if (openKey === 'support' || openKey === 'about') {
    const isSupport = openKey === 'support';
    return (
      <div className="screen">
        <div className="screen-header">
          <button type="button" className="icon-btn" onClick={() => setOpenKey(null)} aria-label="Назад">
            <i className="ti ti-arrow-left" />
          </button>
          <h1>{isSupport ? 'Поддержка' : 'О нас'}</h1>
        </div>
        <p className="muted">
          {isSupport
            ? 'По всем вопросам пишите на support@kidscomm.kg'
            : 'Kidscomm — платформа для общения детского сада с родителями: расписание, посещаемость, чат и фотогалерея группы.'}
        </p>
      </div>
    );
  }

  return (
    <div className="screen">
      <h1>Настройки</h1>
      <div className="settings-list">
        <label className="settings-row">
          <span>Уведомление</span>
          <span className="settings-switch">
            <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
            <span className="settings-switch-track" aria-hidden="true" />
          </span>
        </label>

        <label className="settings-row">
          <span>Светлая тема</span>
          <span className="settings-switch">
            <input type="checkbox" checked={lightTheme} onChange={(e) => setLightTheme(e.target.checked)} />
            <span className="settings-switch-track" aria-hidden="true" />
          </span>
        </label>

        <div className="settings-row">
          <span>Язык</span>
          <span className="settings-lang">Ру. <i className="ti ti-chevron-down" aria-hidden="true" /></span>
        </div>

        <button type="button" className="settings-row settings-row-button" onClick={logout}>
          <span>Выйти с аккаунта</span>
        </button>

        <button type="button" className="settings-row settings-row-button" onClick={() => setOpenKey('support')}>
          <span>Поддержка</span>
        </button>

        <button type="button" className="settings-row settings-row-button" onClick={() => setOpenKey('about')}>
          <span className="settings-link">О нас</span>
        </button>

        <button type="button" className="settings-row settings-row-button" onClick={() => setOpenKey('profile')}>
          <span>Профиль</span>
          <i className="ti ti-chevron-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
