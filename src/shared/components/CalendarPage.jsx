import { useMemo, useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { getAllChildren, getChildrenByParentId } from '../../mock/repository.js';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const STATUS_LABELS = { present: 'Присутствует', absent: 'Отсутствует', late: 'Опоздал(а)' };

function pad(value) {
  return String(value).padStart(2, '0');
}

function toDateKey(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function getMonthCells(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: Math.ceil((offset + daysInMonth) / 7) * 7 }, (_, index) => {
    const day = index - offset + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });
}

function isWeekendColumn(index) {
  return index % 7 >= 5;
}

function getStatus(child, dateKey) {
  const date = new Date(`${dateKey}T12:00:00`);
  const day = date.getDay();
  if (day === 0 || day === 6) return 'absent';
  if (child.id === 'child3' && date.getDate() % 4 === 0) return 'absent';
  if (child.id === 'child2' && date.getDate() % 5 === 0) return 'late';
  return date.getDate() % 9 === 0 ? 'absent' : 'present';
}

export default function CalendarPage() {
  const { appUser } = useUser();
  const children = appUser.role === 'parent' ? getChildrenByParentId(appUser.id) : getAllChildren();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(8);
  const [selectedDay, setSelectedDay] = useState(2);
  const [view, setView] = useState('month');
  const [selectedChild, setSelectedChild] = useState(null);
  const monthCells = useMemo(() => getMonthCells(year, month), [year, month]);
  const selectedDateKey = toDateKey(year, month, selectedDay);

  function selectMonth(nextMonth) {
    setMonth(nextMonth);
    setSelectedDay(1);
    setView('month');
  }

  if (selectedChild) {
    return (
      <div className="screen calendar-page child-calendar-page">
        <div className="calendar-topbar">
          <button type="button" className="calendar-back" onClick={() => setSelectedChild(null)} aria-label="Назад">
            <i className="ti ti-arrow-left" />
          </button>
          <h1>{selectedChild.name}</h1>
          <button type="button" className="calendar-menu-button" onClick={() => setView('year')} aria-label="Выбрать месяц">
            <i className="ti ti-calendar" />
          </button>
        </div>
        <div className="calendar-card child-calendar-card">
          <button type="button" className="calendar-month-link" onClick={() => setView('year')}>
            {MONTHS[month]} {year}
          </button>
          <div className="calendar-weekdays">{DAYS.map((day) => <span key={day}>{day}</span>)}</div>
          <div className="calendar-grid">
            {monthCells.map((day, index) => (
              <span key={`${index}-${day}`} className={`calendar-day ${day ? `status-${getStatus(selectedChild, toDateKey(year, month, day))}` : 'is-empty'}`}>
                {day}
              </span>
            ))}
          </div>
        </div>
        <div className="calendar-legend">
          <span><i className="status-dot status-dot-present" /> Присутствовал(а)</span>
          <span><i className="status-dot status-dot-absent" /> Не был(а)</span>
          <span><i className="status-dot status-dot-late" /> Опоздал(а)</span>
        </div>
      </div>
    );
  }

  if (view === 'year') {
    return (
      <div className="screen calendar-page">
        <div className="calendar-topbar">
          <button type="button" className="calendar-back" onClick={() => setView('month')} aria-label="Назад">
            <i className="ti ti-arrow-left" />
          </button>
          <button type="button" className="calendar-year-link" onClick={() => setYear((value) => value - 1)}>{year}</button>
          <button type="button" className="calendar-menu-button" onClick={() => setView('month')} aria-label="Закрыть">
            <i className="ti ti-x" />
          </button>
        </div>
        <div className="calendar-year-grid">
          {MONTHS.map((monthName, index) => (
            <button key={monthName} type="button" className={index === month ? 'selected' : ''} onClick={() => selectMonth(index)}>
              <strong>{monthName}</strong>
              <span>{year}</span>
              <small>{new Intl.DateTimeFormat('ru-RU', { month: 'short' }).format(new Date(year, index, 1))}</small>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="screen calendar-page">
      <div className="calendar-topbar">
        <h1>Календарь</h1>
        <button type="button" className="calendar-menu-button" onClick={() => setView('year')} aria-label="Выбрать месяц">
          <i className="ti ti-menu-2" />
        </button>
      </div>
      <div className="calendar-card">
        <button type="button" className="calendar-month-link" onClick={() => setView('year')}>
          {MONTHS[month]}
        </button>
        <div className="calendar-weekdays">
          {DAYS.map((day) => <span key={day}>{day}</span>)}
        </div>
        <div className="calendar-grid">
          {monthCells.map((day, index) => (
            <span
              key={`${index}-${day}`}
              className={`calendar-day ${day === selectedDay ? 'is-selected' : ''} ${!day ? 'is-empty' : ''} ${day && isWeekendColumn(index) ? 'is-weekend' : ''}`}
              onClick={() => day && setSelectedDay(day)}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
      <div className="calendar-attendance">
        <p className="calendar-section-title">Посещаемость детей</p>
        {children.map((child) => {
          const status = getStatus(child, selectedDateKey);
          return (
            <button key={child.id} type="button" className={`calendar-child-row status-row-${status}`} onClick={() => setSelectedChild(child)}>
              <span className="calendar-child-avatar"><i className="ti ti-user" /></span>
              <span className="calendar-child-name">{child.name}</span>
              <span className={`calendar-child-status status-${status}`}>{STATUS_LABELS[status]}<i className="ti ti-chevron-down" /></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
