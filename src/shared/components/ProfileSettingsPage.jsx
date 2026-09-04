// Аналог ProfileSettingsPage из profile_settings_page.dart.
// Форма: Имя, Email, Телефон + кнопка "Сохранить".

import { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { updateUserProfile } from '../../mock/repository.js';

export default function ProfileSettingsPage({ onBack }) {
  const { appUser } = useUser();
  const [name, setName] = useState(appUser.name);
  const [email, setEmail] = useState(appUser.email || '');
  const [phone, setPhone] = useState(appUser.phone || '');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    // На этапе моков просто мутируем данные в хранилище —
    // как и SharedPreferences в оригинале, не переживёт перезагрузку.
    updateUserProfile(appUser.id, { name, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Назад">
          <i className="ti ti-arrow-left" />
        </button>
        <h1>Личные данные</h1>
      </div>

      <input className="text-input" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" className="text-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="tel" className="text-input" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} />

      <button type="button" className="btn-primary full-width" style={{ marginTop: 18 }} onClick={handleSave}>
        Сохранить
      </button>

      {saved && <p className="muted small" style={{ textAlign: 'center', marginTop: 10 }}>Сохранено</p>}
    </div>
  );
}
