// Аналог экрана «Занятия» из Figma (sadik, фрейм 2307:353 / 2379:682) —
// распорядок дня группы с переключением дней и режимом «Изменить».
// Ниже — заметки воспитателя на конкретные даты (своего Figma-экрана не
// имеют, но остаются как отдельный блок: их видит родитель на SchedulePage).

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

export default function TeacherSchedulePage({ onOpenAttendance }) {
  const { appUser } = useUser();
  const myGroups = getGroupsByTeacherId(appUser.id);
  const myGroup = myGroups[0];

  const [noteText, setNoteText] = useState('');
  const [noteDate, setNoteDate] = useState(todayIso());
  const [, forceRefresh] = useState(0);

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

  return (
    <div className="screen">
      <div className="day-schedule-page-header">
        <h1>Занятия</h1>
      </div>

      <WeeklyScheduleList showTabs onOpenAttendance={onOpenAttendance} />

      <p className="card-label schedule-notes-title">Заметки для родителей</p>
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

      {notes.length > 0 && notes.map((note) => (
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
      ))}
    </div>
  );
}
