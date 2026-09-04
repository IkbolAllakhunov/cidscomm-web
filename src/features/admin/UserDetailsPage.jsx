// Аналог UserDetailsPage из admin_users_page.dart.

import { useState } from 'react';
import { getAllChildren, assignChildToParent } from '../../mock/repository.js';

const ROLE_LABELS = {
  admin: 'Администратор',
  teacher: 'Воспитатель',
  parent: 'Родитель',
};

export default function UserDetailsPage({ user, onBack }) {
  const [, forceRefresh] = useState(0);
  const [showAssign, setShowAssign] = useState(false);

  const allChildren = getAllChildren();
  const userChildren = allChildren.filter((c) => c.parentId === user.id);
  const availableChildren = allChildren.filter((c) => c.parentId !== user.id);

  function handleAssign(childId) {
    assignChildToParent(childId, user.id);
    setShowAssign(false);
    forceRefresh((n) => n + 1);
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Назад">
          <i className="ti ti-arrow-left" />
        </button>
        <h1>{user.name}</h1>
      </div>

      <div className="card">
        <div className="card-row">
          <span className="muted">Имя</span>
          <span>{user.name}</span>
        </div>
        <div className="card-row">
          <span className="muted">Роль</span>
          <span>{ROLE_LABELS[user.role]}</span>
        </div>
        <div className="card-row">
          <span className="muted">Telegram ID</span>
          <span>{user.telegramId}</span>
        </div>
        <div className="card-row">
          <span className="muted">Телефон</span>
          <span>{user.phone || '—'}</span>
        </div>
      </div>

      {user.role === 'parent' && (
        <>
          <div className="screen-header" style={{ marginTop: 8 }}>
            <p className="card-label" style={{ flex: 1, margin: 0 }}>Дети</p>
            <button type="button" className="btn-text" onClick={() => setShowAssign(true)}>
              <i className="ti ti-plus" /> Назначить
            </button>
          </div>

          {userChildren.length === 0 ? (
            <p className="muted">Нет привязанных детей</p>
          ) : (
            userChildren.map((child) => (
              <div key={child.id} className="card">
                <p className="card-label">{child.name}</p>
                <p className="muted small">ID: {child.id}</p>
              </div>
            ))
          )}
        </>
      )}

      {showAssign && (
        <div className="modal-overlay" onClick={() => setShowAssign(false)}>
          <div className="modal modal-list" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Назначить ребёнка родителю</p>
            {availableChildren.length === 0 ? (
              <p className="muted">Нет свободных детей</p>
            ) : (
              <div className="modal-scroll">
                {availableChildren.map((child) => (
                  <div key={child.id} className="picker-row">
                    <span className="picker-id" style={{ flex: 1 }}>{child.name}</span>
                    <button type="button" className="icon-btn" onClick={() => handleAssign(child.id)} aria-label="Назначить">
                      <i className="ti ti-plus" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="modal-actions">
              <button type="button" className="btn-text" onClick={() => setShowAssign(false)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
