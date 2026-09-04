// Настройки организации и завершение текущей сессии.

import { useUser } from '../../shared/context/UserContext.jsx';

export default function AdminSettingsPage() {
  const { logout } = useUser();

  return (
    <div className="screen">
      <h1>Настройки</h1>
      <div className="settings-intro card">
        <div className="settings-intro-icon"><i className="ti ti-settings" aria-hidden="true" /></div>
        <div>
          <strong>Настройки сада</strong>
          <p className="muted">Название, контакты и уведомления появятся после подключения бэкенда.</p>
        </div>
      </div>
      <button type="button" className="more-list-item more-list-item-danger settings-logout" onClick={logout}>
        <i className="ti ti-logout" aria-hidden="true" />
        <span>Выйти из аккаунта</span>
        <i className="ti ti-chevron-right more-list-chevron" aria-hidden="true" />
      </button>
    </div>
  );
}
