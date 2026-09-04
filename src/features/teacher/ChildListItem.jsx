// Строка ребёнка на полноэкранном экране посещаемости из Figma.

import { useState } from 'react';

function calcAge(birthDateStr) {
  const birth = new Date(birthDateStr);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) years--;
  return years;
}

const STATUS_OPTIONS = [
  { value: 'present', label: 'Присутствует' },
  { value: 'absent', label: 'Отсутствует' },
  { value: 'late', label: 'Опоздал(а)' },
];

export default function ChildListItem({ child, onAttendanceChange, onOpenProfile }) {
  const status = child.attendanceStatus ?? (child.isPresent ? 'present' : 'absent');
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const currentStatus = STATUS_OPTIONS.find((option) => option.value === status);

  return (
    <div className="child-list-item" onClick={() => onOpenProfile(child)}>
      <div className="child-avatar">
        <i className="ti ti-user" aria-hidden="true" />
      </div>
      <div className="child-info">
        <p className="child-name">{child.name}</p>
        <p className="muted small">{calcAge(child.birthDate)} года</p>
      </div>
      <div className={`attendance-status attendance-status-${status} ${isStatusOpen ? 'is-open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="attendance-status-trigger"
          aria-label={`Статус посещения: ${child.name}`}
          aria-expanded={isStatusOpen}
          onClick={() => setIsStatusOpen((open) => !open)}
        >
          {currentStatus.label}<i className="ti ti-chevron-down" aria-hidden="true" />
        </button>
        {isStatusOpen && (
          <div className="attendance-status-menu">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={option.value === status ? 'selected' : ''}
                onClick={() => {
                  onAttendanceChange(child.id, option.value);
                  setIsStatusOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <i className="ti ti-chevron-right child-chevron" aria-hidden="true" />
    </div>
  );
}
