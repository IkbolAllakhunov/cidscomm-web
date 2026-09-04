// Дев-инструмент: вход без Telegram, чтобы разработчик/дизайнер мог
// переключаться между интерфейсами трёх ролей одним тапом, не настраивая
// реальный Telegram-аккаунт и бэкенд. В проде это заменится автоматическим
// определением роли через Telegram initData (см. useTelegramAuth.js) —
// этот экран — временный мост для этапа фронтенд-разработки.

import { getAllUsers } from '../../mock/repository.js';

const ROLE_META = {
  parent: { label: 'Родитель', icon: 'ti-user', color: 'var(--kc-primary)' },
  teacher: { label: 'Воспитатель', icon: 'ti-school', color: 'var(--kc-orange)' },
  admin: { label: 'Администратор', icon: 'ti-shield-lock', color: 'var(--kc-secondary)' },
};

export default function DevRoleSwitcher({ onSelectUser }) {
  const users = getAllUsers();

  return (
    <div className="screen dev-switcher-screen">
      <div className="dev-switcher-badge">DEV-РЕЖИМ</div>
      <h1>Выберите роль для входа</h1>
      <p className="muted">
        Временный экран для разработки — в реальном Telegram роль определится
        автоматически, без этого выбора.
      </p>

      <div className="dev-switcher-list">
        {users.map((user) => {
          const meta = ROLE_META[user.role];
          return (
            <button
              key={user.id}
              type="button"
              className="dev-switcher-card"
              style={{ '--role-color': meta.color }}
              onClick={() => onSelectUser(user)}
            >
              <div className="dev-switcher-icon">
                <i className={`ti ${meta.icon}`} aria-hidden="true" />
              </div>
              <div className="dev-switcher-info">
                <p className="dev-switcher-name">{user.name}</p>
                <p className="muted small">{meta.label}</p>
              </div>
              <i className="ti ti-chevron-right" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
