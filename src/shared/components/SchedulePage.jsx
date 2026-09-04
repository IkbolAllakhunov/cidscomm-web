// Аналог schedule_page.dart. У родителя — только просмотр: недельное
// расписание занятий + заметки воспитателя на конкретные даты (если есть).

import { useUser } from '../context/UserContext.jsx';
import { getChildrenByParentId, getScheduleNotesByGroupId } from '../../mock/repository.js';
import WeeklyScheduleList from './WeeklyScheduleList.jsx';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

export default function SchedulePage() {
  const { appUser } = useUser();
  const myChildren = getChildrenByParentId(appUser.id);
  const groupId = myChildren[0]?.groupId;
  const notes = groupId ? getScheduleNotesByGroupId(groupId) : [];

  return (
    <div className="screen">
      <h1>Расписание</h1>

      {notes.length > 0 && (
        <div className="notes-block">
          <p className="card-label">Заметки от воспитателя</p>
          {notes.map((note) => (
            <div key={note.id} className="card note-card">
              <div className="note-icon">
                <i className="ti ti-note" aria-hidden="true" />
              </div>
              <div>
                <p className="note-text">{note.text}</p>
                <p className="muted small">{formatDate(note.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <WeeklyScheduleList />
    </div>
  );
}
