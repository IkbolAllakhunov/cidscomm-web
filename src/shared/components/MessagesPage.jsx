// Аналог MessagesPage + ChatScreen для родителя. У родителя единственный
// собеседник — воспитатель группы его ребёнка, поэтому сразу открываем чат
// без промежуточного списка переписок (в отличие от воспитателя, у которого
// родителей несколько).

import { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { getChildrenByParentId, getGroupById, getGroupChat, getLastMessage, getUserById } from '../../mock/repository.js';
import ChatWindow from './ChatWindow.jsx';

export default function MessagesPage() {
  const { appUser } = useUser();
  const myChildren = getChildrenByParentId(appUser.id);
  const group = myChildren[0] ? getGroupById(myChildren[0].groupId) : null;
  const teacherId = group?.teacherIds[0];
  const conversations = [
    teacherId && {
      id: teacherId,
      title: getUserById(teacherId)?.name ?? 'Воспитатель группы',
      subtitle: `Воспитатель · ${group.name}`,
      icon: 'ti-user',
    },
    { id: 'doctor1', title: 'Медработник садика', subtitle: 'Медицинская служба', icon: 'ti-heart' },
    group && {
      id: `group:${group.id}`,
      isGroup: true,
      groupId: group.id,
      title: `Группа ${group.name}`,
      subtitle: 'Групповой чат',
      icon: 'ti-users-group',
    },
  ].filter(Boolean);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const selectedChat = conversations.find((chat) => chat.id === selectedChatId) ?? conversations[0];

  if (!teacherId) {
    return (
      <div className="screen">
        <h1>Сообщения</h1>
        <p className="muted">Воспитатель пока не назначен.</p>
      </div>
    );
  }

  return (
    <div className="screen screen-flush messages-layout">
      <div className="screen-title-padded">
        <h1>Сообщения</h1>
        {selectedChatId && (
          <button type="button" className="icon-btn chat-back-button" onClick={() => setSelectedChatId(null)} aria-label="Назад">
            <i className="ti ti-arrow-left" aria-hidden="true" />
          </button>
        )}
      </div>
      {!selectedChatId && <div className="conversation-list" aria-label="Список диалогов">
        {conversations.map((chat) => {
          const groupMessages = chat.isGroup ? getGroupChat(chat.groupId) : null;
          const lastMessage = chat.isGroup ? groupMessages.at(-1) : getLastMessage(appUser.id, chat.id);
          return (
            <button
              key={chat.id}
              type="button"
              className={`conversation-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChatId(chat.id)}
            >
              <span className="conversation-avatar"><i className={`ti ${chat.icon}`} aria-hidden="true" /></span>
              <span className="conversation-copy">
                <strong>{chat.title}</strong>
                <small>{lastMessage?.text ?? chat.subtitle}</small>
              </span>
              <i className="ti ti-chevron-right conversation-chevron" aria-hidden="true" />
            </button>
          );
        })}
      </div>}
      {selectedChat && (
        <div className="conversation-panel">
          <ChatWindow
            key={selectedChat.id}
            myId={appUser.id}
            otherId={selectedChat.id}
            isFromTeacher={selectedChat.id === teacherId}
            header={{ title: selectedChat.title, subtitle: selectedChat.subtitle }}
            isGroup={selectedChat.isGroup}
            groupId={selectedChat.groupId}
          />
        </div>
      )}
    </div>
  );
}
