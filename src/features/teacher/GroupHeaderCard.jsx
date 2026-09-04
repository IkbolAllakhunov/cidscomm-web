// Аналог _HeaderCard из teacher_groups_page.dart.

export default function GroupHeaderCard({ groupName, childrenCount, ageRange, onClick }) {
  return (
    <button type="button" className="group-header-card" onClick={onClick}>
      <div className="group-header-info">
        <p className="group-header-name">Группа: {groupName}</p>
        <p className="group-header-count">{childrenCount} детей</p>
        <p className="group-header-age">Возраст {ageRange}</p>
      </div>
      <div className="group-header-illustration" aria-hidden="true">
        <span className="group-header-bear" />
      </div>
    </button>
  );
}
