// Аналог AdminUsersPage из admin_users_page.dart.

import { useState } from 'react';
import { getAllUsers, addUser, deleteUser, addChild } from '../../mock/repository.js';
import AddUserModal from './AddUserModal.jsx';
import AddChildModal from './AddChildModal.jsx';
import UserDetailsPage from './UserDetailsPage.jsx';

const ROLE_LABELS = {
  admin: 'Администратор',
  teacher: 'Воспитатель',
  parent: 'Родитель',
  doctor: 'Медработник',
};

export default function AdminUsersPage() {
  const [, forceRefresh] = useState(0);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [openUser, setOpenUser] = useState(null);

  const allUsers = getAllUsers();

  if (openUser) {
    // Если пользователь был удалён за время просмотра деталей — просто закрываем
    const fresh = allUsers.find((u) => u.id === openUser.id) ?? openUser;
    return <UserDetailsPage user={fresh} onBack={() => setOpenUser(null)} />;
  }

  function handleCreateUser(data) {
    addUser(data);
    setShowAddUser(false);
    forceRefresh((n) => n + 1);
  }

  function handleCreateChild(data) {
    addChild(data);
    setShowAddChild(false);
    forceRefresh((n) => n + 1);
  }

  function handleDelete(userId) {
    deleteUser(userId);
    forceRefresh((n) => n + 1);
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Пользователи</h1>
        <div className="header-actions">
          <button type="button" className="icon-btn" onClick={() => setShowAddChild(true)} aria-label="Добавить ребёнка">
            <i className="ti ti-baby-carriage" />
          </button>
          <button type="button" className="icon-btn" onClick={() => setShowAddUser(true)} aria-label="Добавить пользователя">
            <i className="ti ti-user-plus" />
          </button>
        </div>
      </div>

      {allUsers.length === 0 ? (
        <p className="muted">Пользователей пока нет</p>
      ) : (
        allUsers.map((user) => (
          <div key={user.id} className="card list-card" onClick={() => setOpenUser(user)}>
            <div>
              <p className="card-label">{user.name}</p>
              <p className="muted small">{ROLE_LABELS[user.role]}</p>
            </div>
            <button
              type="button"
              className="icon-btn danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(user.id);
              }}
              aria-label="Удалить"
            >
              <i className="ti ti-trash" />
            </button>
          </div>
        ))
      )}

      {showAddUser && (
        <AddUserModal onClose={() => setShowAddUser(false)} onCreate={handleCreateUser} />
      )}
      {showAddChild && (
        <AddChildModal onClose={() => setShowAddChild(false)} onCreate={handleCreateChild} />
      )}
    </div>
  );
}
