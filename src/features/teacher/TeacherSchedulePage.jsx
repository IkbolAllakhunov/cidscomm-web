// Аналог TeacherSchedulePage из teacher_schedule_page.dart.
// Форма: текст заметки + выбор даты + кнопка "Добавить". Список заметок
// своей группы ниже. В отличие от оригинала — заметки сохраняются в моки
// и сразу видны родителю на SchedulePage (там это было разрозненно).

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import { getGroupsByTeacherId, getScheduleNotesByGroupId, addScheduleNote, deleteScheduleNote } from '../../mock/repository.js';
import WeeklyScheduleList from '../../shared/components/WeeklyScheduleList.jsx';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function TeacherSchedulePage() {
  const { appUser } = useUser();
  const myGroups = getGroupsByTeacherId(appUser.id);
  const myGroup = myGroups[0];

  const [noteText, setNoteText] = useState('');
  const [noteDate, setNoteDate] = useState(todayIso());
  const [, forceRefresh] = useState(0);
  const [showWeekly, setShowWeekly] = useState(false);

  const notes = myGroup ? getScheduleNotesByGroupId(myGroup.id) : [];

  function handleAddNote() {
    const text = noteText.trim();
    if (!text || !myGroup) return;
    addScheduleNote(myGroup.id, { date: noteDate, text });
    setNoteText('');
    forceRefresh((n) => n + 1);
  }

  function handleDelete(noteId) {
    deleteScheduleNote(noteId);
    forceRefresh((n) => n + 1);
  }

  if (showWeekly) {
    return (
      <div className="screen">
        <div className="screen-header">
          <button type="button" className="icon-btn" onClick={() => setShowWeekly(false)} aria-label="Назад">
            <i className="ti ti-arrow-left" />
          </button>
          <h1>Расписание занятий</h1>
        </div>
        <WeeklyScheduleList />
      </div>
    );
  }

  return (
    <div className="screen">
      <h1>Расписание</h1>

      <div className="card schedule-form">
        <textarea
          className="text-input textarea-input"
          placeholder="Введите заметку"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={2}
        />
        <input
          type="date"
          className="text-input"
          value={noteDate}
          onChange={(e) => setNoteDate(e.target.value)}
        />
        <button type="button" className="btn-primary full-width" onClick={handleAddNote}>
          <i className="ti ti-plus" /> Добавить заметку
        </button>
      </div>

      <button type="button" className="btn-secondary full-width schedule-weekly-btn" onClick={() => setShowWeekly(true)}>
        <i className="ti ti-calendar-week" /> Расписание занятий
      </button>

      {notes.length === 0 ? (
        <div className="empty-state">
          <i className="ti ti-calendar-off" aria-hidden="true" />
          <p className="muted">У вас пока нет заметок</p>
        </div>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="card note-card">
            <div className="note-icon">
              <i className="ti ti-note" aria-hidden="true" />
            </div>
            <div className="note-body">
              <p className="note-text">{note.text}</p>
              <p className="muted small">{formatDate(note.date)}</p>
            </div>
            <button type="button" className="icon-btn danger" onClick={() => handleDelete(note.id)} aria-label="Удалить">
              <i className="ti ti-trash" />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
