// Аналог ChatScreen/_TeacherMessagesPageState чата. Точные цвета из Figma
// (sadik, фрейм "чат" 269:195): свои сообщения — #0098be, чужие — #00728f,
// обе стороны тёмные с белым текстом (не белый/светло-голубой, как раньше).

import { useState, useRef, useEffect } from 'react';
import { deleteMessage, getChat, getGroupChat, getUserById, sendGroupMessage, sendMessage, updateMessage } from '../../mock/repository.js';

function formatTime(timestamp) {
  const d = new Date(timestamp);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function ChatWindow({
  myId,
  otherId,
  isFromTeacher,
  enableMessageActions = false,
  header,
  isGroup = false,
  groupId,
}) {
  const loadMessages = () => (isGroup ? getGroupChat(groupId) : getChat(myId, otherId));

  const [messages, setMessages] = useState(loadMessages);
  const [text, setText] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);
  const [deletingMessage, setDeletingMessage] = useState(null);
  const listEndRef = useRef(null);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ block: 'end' });
  }, [messages]);

  function refreshMessages() {
    setMessages(loadMessages());
  }

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (isGroup) {
      sendGroupMessage(groupId, { author: myId, text: trimmed, isFromTeacher });
    } else {
      sendMessage({ author: myId, recipient: otherId, text: trimmed, isFromTeacher });
    }
    refreshMessages();
    setText('');
  }

  function handleEditSave() {
    const nextText = editingMessage.text.trim();
    if (!nextText) return;
    updateMessage(editingMessage.id, nextText);
    setEditingMessage(null);
    refreshMessages();
  }

  return (
    <div className="chat-window">
      {header && (
        <div className="chat-contact-card">
          <strong>{header.title}</strong>
          <span>{header.subtitle}</span>
        </div>
      )}

      <div className="chat-messages">
        {messages.length === 0 && <p className="muted chat-empty">Нет сообщений</p>}
        {messages.map((msg) => {
          const isMe = msg.author === myId;
          const senderName = isGroup && !isMe ? getUserById(msg.author)?.name : null;
          return (
            <div key={msg.id} className={`chat-bubble-row ${isMe ? 'me' : ''}`}>
              <div className={`chat-bubble ${isMe ? 'chat-bubble-me' : 'chat-bubble-other'}`}>
                {senderName && <p className="chat-bubble-sender">{senderName}</p>}
                <p className="chat-bubble-text">{msg.text}</p>
                <p className="chat-bubble-time">{formatTime(msg.timestamp)}</p>
                {enableMessageActions && isMe && (
                  <div className="chat-message-actions">
                    <button type="button" className="btn-text" onClick={() => setEditingMessage({ id: msg.id, text: msg.text })}>Изменить</button>
                    <button type="button" className="btn-text danger-text" onClick={() => setDeletingMessage(msg)}>Удалить</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={listEndRef} />
      </div>

      {editingMessage && (
        <div className="modal-overlay" onClick={() => setEditingMessage(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Изменить сообщение</p>
            <input
              type="text"
              className="text-input"
              value={editingMessage.text}
              onChange={(e) => setEditingMessage((message) => ({ ...message, text: e.target.value }))}
              autoFocus
            />
            <div className="modal-actions">
              <button type="button" className="btn-text" onClick={() => setEditingMessage(null)}>Отмена</button>
              <button type="button" className="btn-primary" onClick={handleEditSave}>Сохранить</button>
            </div>
          </div>
        </div>
      )}

      {deletingMessage && (
        <div className="modal-overlay" onClick={() => setDeletingMessage(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Удалить сообщение?</p>
            <p className="muted">Это действие нельзя отменить.</p>
            <div className="modal-actions">
              <button type="button" className="btn-text" onClick={() => setDeletingMessage(null)}>Отмена</button>
              <button
                type="button"
                className="btn-primary danger-button"
                onClick={() => {
                  deleteMessage(deletingMessage.id);
                  setDeletingMessage(null);
                  refreshMessages();
                }}
              >Удалить</button>
            </div>
          </div>
        </div>
      )}

      <div className="chat-input-row">
        <input
          type="text"
          className="chat-input"
          placeholder="Напишите сообщение..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button type="button" className="chat-send-btn" onClick={handleSend} aria-label="Отправить">
          <i className="ti ti-send" />
        </button>
      </div>
    </div>
  );
}
