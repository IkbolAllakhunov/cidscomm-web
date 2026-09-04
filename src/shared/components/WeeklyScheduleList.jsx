// Аналог списка занятий из schedule_page.dart — рендерит дни недели
// с занятиями. Переиспользуется и у родителя, и у воспитателя.

import { getWeeklySchedule } from '../../mock/repository.js';

export default function WeeklyScheduleList() {
  const weeklySchedule = getWeeklySchedule();

  return (
    <div className="weekly-schedule">
      {weeklySchedule.map((day) => (
        <div key={day.day} className="schedule-day">
          <p className="schedule-day-title">{day.day}</p>
          {day.items.map((item) => (
            <div key={item.time} className="schedule-item">
              <i className="ti ti-clock" aria-hidden="true" />
              <span className="schedule-item-time">{item.time}</span>
              <span className="schedule-item-subject">{item.subject}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
