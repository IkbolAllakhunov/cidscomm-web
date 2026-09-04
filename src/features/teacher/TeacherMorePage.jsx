// Аналог TeacherMorePage из teacher_more_page.dart.

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import ProfileSettingsPage from '../../shared/components/ProfileSettingsPage.jsx';

const ITEMS = [
  { icon: 'ti-user', label: 'Профиль', key: 'profile' },
  { icon: 'ti-bell', label: 'Уведомления', key: 'notifications' },
  { icon: 'ti-help-circle', label: 'Поддержка', key: 'support' },
];

export default function TeacherMorePage() {
  const { logout } = useUser();
  const [openKey, setOpenKey] = useState(null);

  if (openKey === 'profile') {
    return <ProfileSettingsPage onBack={() => setOpenKey(null)} />;
  }

  if (openKey === 'notifications') {
    return (
      <div className="screen">
        <div className="screen-header">
          <button type="button" className="icon-btn" onClick={() => setOpenKey(null)} aria-label="Назад">
            <i className="ti ti-arrow-left" />
          </button>
          <h1>Уведомления</h1>
        </div>
        <div className="card notification-settings-card">
          <div className="settings-toggle-row">
            <span>Сообщения от родителей</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="settings-toggle-row">
            <span>Напоминания о посещаемости</span>
            <input type="checkbox" defaultChecked />
          </div>
          <p className="muted small">Настройки сохраняются для текущего устройства.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <h1>Ещё</h1>
      <div className="more-list">
        {ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            className="more-list-item"
            onClick={() => setOpenKey(item.key)}
          >
            <i className={`ti ${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
            <i className="ti ti-chevron-right more-list-chevron" aria-hidden="true" />
          </button>
        ))}
        <button type="button" className="more-list-item more-list-item-danger" onClick={logout}>
          <i className="ti ti-logout" aria-hidden="true" />
          <span>Выйти из аккаунта</span>
          <i className="ti ti-chevron-right more-list-chevron" aria-hidden="true" />
        </button>
      </div>

      {openKey === 'support' && (
        <div className="card" style={{ marginTop: 12 }}>
          <p className="muted">По всем вопросам пишите на support@cidscomm.app</p>
        </div>
      )}
    </div>
  );
}
