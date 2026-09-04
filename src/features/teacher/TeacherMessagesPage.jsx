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

  const [selectedParentId, setSelectedParentId] = useState(null);
  const [search, setSearch] = useState('');
  const [showChatSettings, setShowChatSettings] = useState(false);
  const visibleParents = parents.filter((parent) => parent.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`screen screen-flush ${selectedParentId ? 'chat-screen' : 'messages-screen'}`}>
      <div className="screen-title-padded">
        <h1>Сообщения</h1>
        {selectedParentId && (
          <button type="button" className="icon-btn chat-back-button" onClick={() => setSelectedParentId(null)} aria-label="Назад">
            <i className="ti ti-arrow-left" aria-hidden="true" />
          </button>
        )}
      </div>

      {!selectedParentId && <div className="chat-parent-select-wrap">
        <input
          type="search"
          className="text-input chat-search-input"
          placeholder="Найти родителя"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Поиск по родителям"
        />
      </div>}

      {selectedParentId ? (
        <ChatWindow
          myId={appUser.id}
          otherId={selectedParentId}
          isFromTeacher={true}
          enableMessageActions={true}
        />
      ) : visibleParents.length > 0 ? (
        <div className="message-conversation-list">
          {visibleParents.map((parent, index) => (
            <button key={parent.id} type="button" className={`message-conversation-item message-conversation-color-${index % 4}`} onClick={() => setSelectedParentId(parent.id)}>
              <span><strong>{parent.name}</strong><small>Родитель группы</small></span>
              <i className="ti ti-chevron-right" aria-hidden="true" />
            </button>
          ))}
        </div>
      ) : <p className="muted chat-empty">Нет родителей для переписки</p>}

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
