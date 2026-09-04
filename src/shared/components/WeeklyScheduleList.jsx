// Аналог экрана «Занятия» из Figma (sadik, фреймы 2307:353 / 2379:682):
// один активный день недели с полным распорядком 8:00-19:45, переключение
// стрелками. Переиспользуется и у родителя, и у воспитателя — у воспитателя
// дополнительно показываются вкладки «Посещаемость» и «Изменить».

import { useState } from 'react';
import { getWeeklySchedule } from '../../mock/repository.js';

function mondayOfCurrentWeek() {
  const now = new Date();
  const diffToMonday = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  return monday;
}

function formatDate(date) {
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

function todayIndex(dayCount) {
  const day = new Date().getDay();
  return day >= 1 && day <= 5 ? Math.min(day - 1, dayCount - 1) : 0;
}

export default function WeeklyScheduleList({ showTabs = false, onOpenAttendance }) {
  const weeklySchedule = getWeeklySchedule();
  const [dayIndex, setDayIndex] = useState(() => todayIndex(weeklySchedule.length));
  const [isEditing, setIsEditing] = useState(false);
  const [removedTimes, setRemovedTimes] = useState(() => new Set());

  const dayData = weeklySchedule[dayIndex];
  const monday = mondayOfCurrentWeek();
  const date = new Date(monday);
  date.setDate(monday.getDate() + dayIndex);

  function changeDay(nextIndex) {
    setDayIndex(nextIndex);
    setRemovedTimes(new Set());
  }

  const visibleItems = dayData.items.filter((item) => !removedTimes.has(item.time));

  return (
    <div className="day-schedule">
      {showTabs && (
        <div className="day-schedule-tabs">
          <button type="button" className="day-schedule-tab" onClick={onOpenAttendance}>Посещаемость</button>
          <button
            type="button"
            className={`day-schedule-tab ${isEditing ? 'is-active' : ''}`}
            onClick={() => setIsEditing((value) => !value)}
          >
            Изменить
          </button>
        </div>
      )}

      <div className="day-schedule-header">
        <button
          type="button"
          className="day-schedule-nav"
          onClick={() => changeDay(Math.max(0, dayIndex - 1))}
          disabled={dayIndex === 0}
          aria-label="Предыдущий день"
        >
          <i className="ti ti-chevron-left" aria-hidden="true" />
        </button>
        <div className="day-schedule-heading">
          <strong>{dayData.day}</strong>
          <span>{formatDate(date)}</span>
        </div>
        <button
          type="button"
          className="day-schedule-nav"
          onClick={() => changeDay(Math.min(weeklySchedule.length - 1, dayIndex + 1))}
          disabled={dayIndex === weeklySchedule.length - 1}
          aria-label="Следующий день"
        >
          <i className="ti ti-chevron-right" aria-hidden="true" />
        </button>
      </div>

      <div className="day-schedule-list">
        {visibleItems.map((item) => (
          <div key={item.time} className="day-schedule-item">
            <span className="day-schedule-subject">{item.subject}</span>
            <span className="day-schedule-dash" aria-hidden="true" />
            <span className="day-schedule-time">{item.time} - {item.endTime}</span>
            {isEditing && (
              <button
                type="button"
                className="day-schedule-remove"
                onClick={() => setRemovedTimes((prev) => new Set(prev).add(item.time))}
                aria-label={`Убрать «${item.subject}»`}
              >
                <i className="ti ti-trash" aria-hidden="true" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
