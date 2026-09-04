// Полноценное управление группами (во Flutter-версии было пустой заглушкой —
// "проектируем с нуля", как договорились). Создание группы, назначение
// воспитателя, удаление.

import { useState } from 'react';
import {
  getAllGroups,
  getAllUsers,
  addGroup,
  deleteGroup,
  assignTeacherToGroup,
  getChildrenByGroupId,
} from '../../mock/repository.js';

export default function AdminGroupsPage() {
  const [, forceRefresh] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [assignGroupId, setAssignGroupId] = useState(null);
  const [name, setName] = useState('');
  const [ageRange, setAgeRange] = useState('');

  const allGroups = getAllGroups();
  const teachers = getAllUsers().filter((u) => u.role === 'teacher');

  function handleCreate() {
    if (!name.trim()) return;
    addGroup({ name: name.trim(), ageRange: ageRange.trim() || 'Не указан' });
    setName('');
    setAgeRange('');
    setShowCreate(false);
    forceRefresh((n) => n + 1);
  }

  function handleDelete(groupId) {
    deleteGroup(groupId);
    forceRefresh((n) => n + 1);
  }

  function handleAssignTeacher(teacherId) {
    assignTeacherToGroup(assignGroupId, teacherId);
    setAssignGroupId(null);
    forceRefresh((n) => n + 1);
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Группы</h1>
        <button type="button" className="icon-btn" onClick={() => setShowCreate(true)} aria-label="Создать группу">
          <i className="ti ti-plus" />
        </button>
      </div>

      {allGroups.length === 0 ? (
        <p className="muted">Групп пока нет</p>
      ) : (
        <div className="admin-groups-grid">
          {allGroups.map((group) => {
            const childCount = getChildrenByGroupId(group.id).length;
            const groupTeachers = teachers.filter((t) => group.teacherIds.includes(t.id));
            return (
              <div key={group.id} className="card">
                <div className="list-card" style={{ marginBottom: 6 }}>
                  <p className="card-label" style={{ margin: 0 }}>{group.name}</p>
                  <button type="button" className="icon-btn danger" onClick={() => handleDelete(group.id)} aria-label="Удалить группу">
                    <i className="ti ti-trash" />
                  </button>
                </div>
                <p className="muted small">{group.ageRange} · {childCount} детей</p>
                <p className="muted small">
                  Воспитатель: {groupTeachers.length > 0 ? groupTeachers.map((t) => t.name).join(', ') : 'не назначен'}
                </p>
                <button type="button" className="btn-text" onClick={() => setAssignGroupId(group.id)}>
                  <i className="ti ti-user-plus" /> Назначить воспитателя
                </button>
              </div>
            );
          })}
        </div>
      )}

      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Создать группу</p>
            <input className="text-input" placeholder="Название группы" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            <input className="text-input" placeholder="Возраст (например, 3-4 года)" value={ageRange} onChange={(e) => setAgeRange(e.target.value)} />
            <div className="modal-actions">
              <button type="button" className="btn-text" onClick={() => setShowCreate(false)}>Отмена</button>
              <button type="button" className="btn-primary" onClick={handleCreate}>Создать</button>
            </div>
          </div>
        </div>
      )}

      {assignGroupId && (
        <div className="modal-overlay" onClick={() => setAssignGroupId(null)}>
          <div className="modal modal-list" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Назначить воспитателя</p>
            {teachers.length === 0 ? (
              <p className="muted">Нет воспитателей в системе</p>
            ) : (
              <div className="modal-scroll">
                {teachers.map((t) => (
                  <div key={t.id} className="picker-row">
                    <span className="picker-id" style={{ flex: 1 }}>{t.name}</span>
                    <button type="button" className="icon-btn" onClick={() => handleAssignTeacher(t.id)} aria-label="Назначить">
                      <i className="ti ti-plus" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="modal-actions">
              <button type="button" className="btn-text" onClick={() => setAssignGroupId(null)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
