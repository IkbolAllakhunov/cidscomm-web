// Полноэкранный экран группы по макету web/desktop в Figma.

import { useState } from 'react';
import ChildListItem from './ChildListItem.jsx';

export default function GroupDetailsSheet({ group, groupChildren, onClose, onOpenSettings, onAttendanceChange, onOpenChild }) {
  const [localChildren, setLocalChildren] = useState(groupChildren);
  const [announcement, setAnnouncement] = useState('');

  function handleAttendanceChange(childId, attendanceStatus) {
    setLocalChildren((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, attendanceStatus, isPresent: attendanceStatus === 'present' } : c))
    );
    onAttendanceChange(childId, attendanceStatus);
  }

  const formattedDate = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());

  return (
    <div className="group-detail-screen">
      <div className="group-detail-header">
        <div className="group-detail-heading">
          <strong>Группа: {group.name}</strong>
          <span>{group.ageRange}</span>
        </div>
        <span className="group-detail-date"><i className="ti ti-calendar" /> {formattedDate}</span>
        <button type="button" className="group-detail-back" onClick={onClose} aria-label="Назад">
          <i className="ti ti-arrow-left" />
        </button>
        <button type="button" className="group-detail-menu" onClick={onOpenSettings} aria-label="Настройки группы">
          <i className="ti ti-dots" />
        </button>
      </div>

      <div className="group-detail-content">
        <textarea
          className="announcement-board"
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          placeholder="Доска объявлений"
          aria-label="Доска объявлений"
          rows={3}
        />
        <div className="attendance-count">{localChildren.filter((child) => (child.attendanceStatus ?? (child.isPresent ? 'present' : 'absent')) === 'present').length}/{localChildren.length}</div>

        <div className="group-children-list">
          {localChildren.map((child) => (
            <ChildListItem
              key={child.id}
              child={child}
              onAttendanceChange={handleAttendanceChange}
              onOpenProfile={onOpenChild}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
