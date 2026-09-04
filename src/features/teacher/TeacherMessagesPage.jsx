// Аналог TeacherMessagesPage из teacher_messages_page.dart.
// Dropdown выбора родителя + чат с выбранным.

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import { getGroupsByTeacherId, getChildrenByGroupId, getUserById } from '../../mock/repository.js';
import ChatWindow from '../../shared/components/ChatWindow.jsx';

export default function TeacherMessagesPage() {
  const { appUser } = useUser();
  const myGroups = getGroupsByTeacherId(appUser.id);
  const allChildren = myGroups.flatMap((group) => getChildrenByGroupId(group.id));
  const parentIds = [...new Set(allChildren.map((c) => c.parentId).filter(Boolean))];
  const parents = parentIds.map((id) => getUserById(id)).filter(Boolean);

  const [selectedParentId, setSelectedParentId] = useState(parents[0]?.id ?? '');
  const [search, setSearch] = useState('');
  const [showChatSettings, setShowChatSettings] = useState(false);
  const visibleParents = parents.filter((parent) => parent.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="screen screen-flush">
      <div className="screen-title-padded">
        <h1>Чат</h1>
        <button type="button" className="icon-btn" onClick={() => setShowChatSettings(true)} aria-label="Настройки чата">
          <i className="ti ti-settings" aria-hidden="true" />
        </button>
      </div>

      <div className="chat-parent-select-wrap">
        <input
          type="search"
          className="text-input chat-search-input"
          placeholder="Найти родителя"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Поиск по родителям"
        />
        <select
          className="select-input"
          value={selectedParentId}
          onChange={(e) => setSelectedParentId(e.target.value)}
        >
          <option value="" disabled>Выберите родителя</option>
          {visibleParents.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {selectedParentId ? (
        <ChatWindow
          myId={appUser.id}
          otherId={selectedParentId}
          isFromTeacher={true}
          enableMessageActions={true}
        />
      ) : (
        <p className="muted chat-empty">Нет родителей для переписки</p>
      )}

      {showChatSettings && (
        <div className="modal-overlay" onClick={() => setShowChatSettings(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Настройки чата</p>
            <label className="settings-toggle-row">
              <span>Уведомления о новых сообщениях</span>
              <input type="checkbox" defaultChecked />
            </label>
            <div className="modal-actions">
              <button type="button" className="btn-primary" onClick={() => setShowChatSettings(false)}>Готово</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
