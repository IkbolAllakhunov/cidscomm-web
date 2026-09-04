// Аналог child_profile_page.dart — переписан точно по оригиналу:
// градиентный header с круглым аватаром, чип "X лет • Группа",
// две инфо-карточки (Рост/Статус), секции с медданными и комментарием.

import { useUser } from '../../shared/context/UserContext.jsx';
import { getChildrenByParentId, getGroupById } from '../../mock/repository.js';

function calcAge(birthDateStr) {
  const birth = new Date(birthDateStr);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) years--;
  return years;
}

function formatBirthDate(birthDateStr) {
  return new Date(birthDateStr).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function InfoCard({ icon, value, label, color }) {
  return (
    <div className="child-info-card" style={{ '--ic-color': color }}>
      <i className={`ti ${icon}`} aria-hidden="true" />
      <p className="child-info-card-value">{value}</p>
      <p className="child-info-card-label">{label}</p>
    </div>
  );
}

function InfoSection({ title, children }) {
  return (
    <div className="card child-info-section">
      <p className="child-info-section-title">{title}</p>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="child-info-row">
      <span className="muted">{label}</span>
      <span className="child-info-row-value">{value}</span>
    </div>
  );
}

export default function ChildProfilePage() {
  const { appUser } = useUser();
  const myChildren = getChildrenByParentId(appUser.id);

  if (myChildren.length === 0) {
    return (
      <div className="screen">
        <p className="muted">Дети не привязаны к вашему профилю.</p>
      </div>
    );
  }

  const child = myChildren[0];
  const group = getGroupById(child.groupId);

  return (
    <div className="child-profile-page">
      <div className="child-profile-header">
        <div className="child-avatar-ring">
          <div className="child-avatar-large">
            <i className="ti ti-user" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="screen child-profile-body">
        <h1 className="child-profile-name">{child.name}</h1>
        <div className="child-age-chip">
          {calcAge(child.birthDate)} года · Группа: {group?.name ?? '—'}
        </div>

        <div className="child-info-cards-row">
          <InfoCard icon="ti-ruler-2" value={child.height || 'Н/Д'} label="Рост" color="var(--kc-accent-yellow)" />
          <InfoCard icon="ti-circle-check" value={child.isPresent ? 'В садике' : 'Дома'} label="Статус" color="var(--kc-success)" />
        </div>

        <InfoSection title="Информация о ребёнке">
          <InfoRow label="Дата рождения" value={formatBirthDate(child.birthDate)} />
          <InfoRow label="Группа" value={group?.name ?? '—'} />
        </InfoSection>

        <InfoSection title="Медицинская информация">
          <InfoRow label="Аллергии" value={child.medicalInfo?.allergies || 'Нет'} />
          <InfoRow label="Группа здоровья" value={child.medicalInfo?.healthGroup || 'Нет данных'} />
        </InfoSection>

        {child.parentComment && (
          <InfoSection title="Комментарий от воспитателя">
            <p>{child.parentComment}</p>
          </InfoSection>
        )}
      </div>
    </div>
  );
}
