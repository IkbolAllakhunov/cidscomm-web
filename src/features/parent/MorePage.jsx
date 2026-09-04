// Настройки и действия аккаунта родителя.

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import ProfileSettingsPage from '../../shared/components/ProfileSettingsPage.jsx';

const ITEMS = [
  { icon: 'ti-user', label: 'Личные данные', key: 'profile' },
  { icon: 'ti-bell', label: 'Уведомления', key: 'notifications' },
  { icon: 'ti-help-circle', label: 'Помощь', key: 'help' },
];

export default function MorePage() {
  const { logout } = useUser();
  const [openKey, setOpenKey] = useState(null);

  if (openKey === 'profile') {
    return <ProfileSettingsPage onBack={() => setOpenKey(null)} />;
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
            onClick={() => setOpenKey(item.key === 'profile' ? 'profile' : null)}
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
    </div>
  );
}
