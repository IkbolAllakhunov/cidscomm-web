// Аналог _HeaderCard из teacher_groups_page.dart.

const ILLUSTRATIONS = ['/images/group_bear.png', '/images/group_fox.png', '/images/group_wolf.png'];

export default function GroupHeaderCard({ groupName, childrenCount, ageRange, illustrationIndex = 0, onClick }) {
  const illustration = ILLUSTRATIONS[illustrationIndex % ILLUSTRATIONS.length];

  return (
    <button type="button" className="group-header-card" onClick={onClick}>
      <div className="group-header-info">
        <p className="group-header-name">Группа: {groupName}</p>
        <p className="group-header-count">{childrenCount} детей</p>
        <p className="group-header-age">Возраст {ageRange}</p>
      </div>
      <div className="group-header-illustration" aria-hidden="true">
        <img src={illustration} alt="" className="group-header-illustration-img" />
      </div>
    </button>
  );
}
