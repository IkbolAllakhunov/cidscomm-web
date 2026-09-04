// Просмотр карточки ребёнка воспитателем — переиспользует ту же структуру
// что и ChildProfilePage у родителя, но принимает child напрямую, а не ищет по parentId.

function formatAge(birthDateStr) {
  const birth = new Date(birthDateStr);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) years--;
  return `${years} лет`;
}

export default function TeacherChildProfilePage({ child, onBack }) {
  return (
    <div className="screen">
      <div className="screen-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Назад">
          <i className="ti ti-arrow-left" />
        </button>
        <h1>{child.name}</h1>
      </div>

      <div className="card">
        <div className="card-row">
          <span className="muted">Возраст</span>
          <span>{formatAge(child.birthDate)}</span>
        </div>
        <div className="card-row">
          <span className="muted">Посещение сегодня</span>
          <span>{child.attendanceStatus === 'late' ? 'Опаздывает' : child.attendanceStatus === 'present' || child.isPresent ? 'Присутствует' : 'Отсутствует'}</span>
        </div>
        <div className="card-row">
          <span className="muted">Аллергии</span>
          <span>{child.medicalInfo?.allergies || 'Нет данных'}</span>
        </div>
        <div className="card-row">
          <span className="muted">Группа здоровья</span>
          <span>{child.medicalInfo?.healthGroup || 'Нет данных'}</span>
        </div>
      </div>

      {child.parentComment && (
        <div className="card">
          <p className="card-label">Комментарий родителя</p>
          <p>{child.parentComment}</p>
        </div>
      )}
    </div>
  );
}
