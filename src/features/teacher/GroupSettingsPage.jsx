import { useState } from 'react';

export default function GroupSettingsPage({ group, onBack }) {
  const [announcement, setAnnouncement] = useState('');
  const [allowGallery, setAllowGallery] = useState(true);

  return (
    <div className="screen group-settings-page">
      <div className="screen-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Назад">
          <i className="ti ti-arrow-left" />
        </button>
        <h1>Настройки группы</h1>
      </div>

      <div className="card group-settings-hero">
        <span className="group-header-avatar"><i className="ti ti-users-group" aria-hidden="true" /></span>
        <div>
          <strong>{group.name}</strong>
          <p className="muted">{group.ageRange}</p>
        </div>
      </div>

      <label className="settings-field-label" htmlFor="group-announcement">Объявление для группы</label>
      <textarea
        id="group-announcement"
        className="announcement-board"
        value={announcement}
        onChange={(event) => setAnnouncement(event.target.value)}
        placeholder="Добавьте важную информацию для родителей"
        rows={4}
      />

      <div className="card notification-settings-card">
        <div className="settings-toggle-row">
          <span>Публиковать новые фото родителям</span>
          <input type="checkbox" checked={allowGallery} onChange={(event) => setAllowGallery(event.target.checked)} />
        </div>
      </div>

      <button type="button" className="btn-primary group-settings-save" onClick={onBack}>
        Сохранить изменения
      </button>
    </div>
  );
}
