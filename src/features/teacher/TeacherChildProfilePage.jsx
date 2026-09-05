// Аналог экрана «Профиль ребенка» из Figma (sadik, 2286:299). Медкарта
// расширена по ТЗ: помимо аллергии и группы здоровья — хронические
// заболевания, прививки, противопоказания, особые мед. состояния,
// раскрывающиеся карточки с деталями аллергии (тип реакции, степень
// критичности, что делать), контакты родителей, особенности ребёнка.

import { useState } from 'react';
import { getGroupById, getUserById } from '../../mock/repository.js';

function formatAge(birthDateStr) {
  const birth = new Date(birthDateStr);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) years--;
  return `${years} лет`;
}

function MedicalRow({ label, value, expandable, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  if (!expandable) {
    return (
      <div className="medical-row">
        <span className="medical-row-label">{label}:</span> {value}
      </div>
    );
  }
  return (
    <button type="button" className={`medical-row medical-row-expandable ${open ? 'is-open' : ''}`} onClick={() => setOpen((v) => !v)}>
      <span className="medical-row-summary">
        <span className="medical-row-label">{label}:</span> {value}
      </span>
      <i className={`ti ${open ? 'ti-chevron-up' : 'ti-chevron-down'}`} aria-hidden="true" />
    </button>
  );
}

export default function TeacherChildProfilePage({ child, onBack }) {
  const [showDocuments, setShowDocuments] = useState(false);
  const group = getGroupById(child.groupId);
  const teacher = group?.teacherIds?.[0] ? getUserById(group.teacherIds[0]) : null;
  const med = child.medicalInfo ?? {};
  const hasAllergy = med.allergies && med.allergies !== 'Нет';

  return (
    <div className="screen child-profile-screen">
      <div className="screen-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Назад">
          <i className="ti ti-arrow-left" />
        </button>
        <h1>Профиль</h1>
      </div>

      <div className="child-profile-avatar-block">
        <div className="child-profile-avatar" aria-hidden="true">
          <i className="ti ti-user" />
        </div>
        <p className="child-profile-name">{child.name}</p>
        <p className="child-profile-age">{formatAge(child.birthDate)}</p>
      </div>

      <p className="child-profile-section-title">Общая информация</p>
      <div className="child-profile-list">
        <div className="child-profile-row">
          <span><strong>Группа:</strong> {group?.name ?? '—'}</span>
          {teacher && <small>Воспитательница: {teacher.name}</small>}
        </div>

        <button type="button" className="child-profile-row child-profile-row-link" onClick={onBack}>
          Посещаемость
        </button>

        <div className="child-profile-row">
          {child.father && (
            <div className="child-profile-parent-line">
              <span><strong>Отец:</strong> {child.father.name}</span>
              <span className="muted">{child.father.phone}</span>
            </div>
          )}
          {child.father && child.mother && <hr className="child-profile-divider" />}
          {child.mother && (
            <div className="child-profile-parent-line">
              <span><strong>Мать:</strong> {child.mother.name}</span>
              <span className="muted">{child.mother.phone}</span>
            </div>
          )}
        </div>

        <div className="child-profile-row">
          <strong>Статус:</strong> {child.status ?? 'Активен'}
        </div>
      </div>

      <p className="child-profile-section-title">Мед. информация</p>
      <div className="child-profile-list">
        <div className="medical-card medical-card-alert">
          <MedicalRow label="Аллергия" value={med.allergies || 'Нет'} expandable={hasAllergy} defaultOpen />
          {hasAllergy && med.allergyDetails && (
            <div className="medical-card-details">
              <p><span className="medical-row-label">Тип реакции:</span> {med.allergyDetails.reactionType}</p>
              <p><span className="medical-row-label">Степень критичности:</span> {med.allergyDetails.severity}</p>
              <p><span className="medical-row-label">Что делать при реакции:</span> {med.allergyDetails.action}</p>
            </div>
          )}
        </div>

        <div className="medical-card medical-card-alert">
          <MedicalRow label="Хронические заболевания" value={med.chronicConditions || 'Нет'} />
        </div>

        <div className="medical-card medical-card-alert">
          <MedicalRow label="Прививки" value={med.vaccinations || 'Нет данных'} />
        </div>

        <div className="medical-card medical-card-alert">
          <MedicalRow label="Противопоказания" value={med.contraindications || 'Нет'} />
        </div>

        <div className="medical-card medical-card-alert">
          <MedicalRow label="Особые мед. состояния" value={med.specialConditions || 'Нет'} />
        </div>

        <button type="button" className="medical-card medical-card-alert medical-row-link" onClick={() => setShowDocuments(true)}>
          Документы
        </button>
      </div>

      <p className="child-profile-section-title">Особенности ребёнка</p>
      <div className="child-profile-notes-card">
        {child.notes || (
          <>
            <p>Психологические особенности — например «боится громких звуков», «тяжело расстаётся с мамой», «агрессивно реагирует на...»</p>
            <p>Любимые занятия / интересы — помогает найти контакт с ребёнком</p>
            <p>Особенности сна — спит в тихий час или нет, как долго засыпает</p>
            <p>Особенности еды — ест самостоятельно или нужна помощь, медленно ест и т.д.</p>
            <p>Язык общения дома — важно если ребёнок говорит только на кыргызском или только на русском</p>
            <p>Есть ли старший брат/сестра в этом же садике</p>
          </>
        )}
      </div>

      {child.parentComment && (
        <div className="card" style={{ marginTop: 12 }}>
          <p className="card-label">Комментарий родителя</p>
          <p>{child.parentComment}</p>
        </div>
      )}

      {showDocuments && (
        <div className="modal-overlay" onClick={() => setShowDocuments(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Документы</p>
            <p className="muted">Нет загруженных документов.</p>
            <div className="modal-actions">
              <button type="button" className="btn-primary" onClick={() => setShowDocuments(false)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
