// Аналог _addUserDialog из admin_users_page.dart. Главное отличие: вместо
// username/password — поле Telegram ID, так как в TMA авторизация идёт
// через Telegram, паролей не существует.

import { useState } from 'react';

const ROLES = [
  { value: 'parent', label: 'Родитель' },
  { value: 'teacher', label: 'Воспитатель' },
  { value: 'admin', label: 'Администратор' },
];

export default function AddUserModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('parent');

  function handleSubmit() {
    if (!name.trim() || !telegramId.trim()) return;
    onCreate({ name: name.trim(), telegramId: telegramId.trim(), phone, email, role });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p className="card-label">Добавить пользователя</p>

        <input type="text" className="text-input" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
        <input type="number" className="text-input" placeholder="Telegram ID" value={telegramId} onChange={(e) => setTelegramId(e.target.value)} />
        <input type="tel" className="text-input" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="email" className="text-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <select className="select-input" value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>

        <div className="modal-actions">
          <button type="button" className="btn-text" onClick={onClose}>Отмена</button>
          <button type="button" className="btn-primary" onClick={handleSubmit}>Добавить</button>
        </div>
      </div>
    </div>
  );
}
