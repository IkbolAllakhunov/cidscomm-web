// Аналог TeacherMessagesPage из teacher_messages_page.dart.
// Список переписок (групповой чат группы + личные с родителями) + чат
// с выбранным собеседником.

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import { getGroupsByTeacherId, getChildrenByGroupId, getUserById } from '../../mock/repository.js';
import ChatWindow from '../../shared/components/ChatWindow.jsx';

function conversationClassName(conversation, index) {
  if (conversation.isGroup) return 'message-conversation-item message-conversation-group';
  return `message-conversation-item message-conversation-color-${index % 4}`;
}

export default function TeacherMessagesPage() {
  const { appUser } = useUser();
  const myGroups = getGroupsByTeacherId(appUser.id);
  const myGroup = myGroups[0];
  const allChildren = myGroups.flatMap((group) => getChildrenByGroupId(group.id));
  const parentIds = [...new Set(allChildren.map((c) => c.parentId).filter(Boolean))];

  const conversations = [
    ...(myGroup ? [{
      id: `group:${myGroup.id}`,
      isGroup: true,
      groupId: myGroup.id,
      title: `Группа ${myGroup.name}`,
      subtitle: `${getChildrenByGroupId(myGroup.id).length} участников`,
    }] : []),
    ...parentIds.map((id) => {
      const parent = getUserById(id);
      const child = allChildren.find((c) => c.parentId === id);
      return parent && {
        id,
        isGroup: false,
        title: parent.name,
        subtitle: child ? `Родитель · ${child.name}` : 'Родитель группы',
      };
    }).filter(Boolean),
  ];

  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const selected = conversations.find((c) => c.id === selectedId);
  const visibleConversations = conversations.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`screen screen-flush ${selectedId ? 'chat-screen' : 'messages-screen'}`}>
      <div className="screen-title-padded">
        <h1>Сообщения</h1>
        {selectedId && (
          <button type="button" className="icon-btn chat-back-button" onClick={() => setSelectedId(null)} aria-label="Назад">
            <i className="ti ti-arrow-left" aria-hidden="true" />
          </button>
        )}
      </div>

      {!selectedId && <div className="chat-parent-select-wrap">
        <input
          type="search"
          className="text-input chat-search-input"
          placeholder="Найти родителя"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Поиск по родителям"
        />
      </div>}

      {selected && (
        <ChatWindow
          myId={appUser.id}
          otherId={selected.id}
          isFromTeacher={true}
          enableMessageActions={true}
          header={{ title: selected.title, subtitle: selected.subtitle }}
          isGroup={selected.isGroup}
          groupId={selected.groupId}
        />
      )}

      {!selected && visibleConversations.length > 0 && (
        <div className="message-conversation-list">
          {visibleConversations.map((conversation, index) => (
            <button
              key={conversation.id}
              type="button"
              className={conversationClassName(conversation, index)}
              onClick={() => setSelectedId(conversation.id)}
            >
              <span><strong>{conversation.title}</strong><small>{conversation.subtitle}</small></span>
              <i className="ti ti-chevron-right" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      {!selected && visibleConversations.length === 0 && (
        <p className="muted chat-empty">Нет родителей для переписки</p>
      )}
    </div>
  );
}
