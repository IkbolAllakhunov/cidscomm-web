// Главный экран воспитателя: группа, сообщения, настройки и переход
// к полноэкранной отметке посещаемости.

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import { getGroupsByTeacherId, getChildrenByGroupId, setChildAttendance } from '../../mock/repository.js';
import GroupHeaderCard from './GroupHeaderCard.jsx';
import MiniActionCard from './MiniActionCard.jsx';
import GroupDetailsSheet from './GroupDetailsSheet.jsx';
import TeacherChildProfilePage from './TeacherChildProfilePage.jsx';
import GroupSettingsPage from './GroupSettingsPage.jsx';

export default function TeacherGroupsPage({ onOpenMessages, onOpenSettings, onOpenGallery }) {
  const { appUser } = useUser();
  const [showSheet, setShowSheet] = useState(false);
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [openChild, setOpenChild] = useState(null);
  const [viewVersion, refreshView] = useState(0);

  const myGroups = getGroupsByTeacherId(appUser.id);
  const myGroup = myGroups.find((group) => group.id === selectedGroupId) ?? myGroups[0];
  const groupChildren = myGroup ? getChildrenByGroupId(myGroup.id) : [];

  if (openChild) {
    return <TeacherChildProfilePage child={openChild} onBack={() => setOpenChild(null)} />;
  }

  if (showGroupSettings && myGroup) {
    return <GroupSettingsPage group={myGroup} onBack={() => setShowGroupSettings(false)} />;
  }

  if (!myGroup) {
    return (
      <div className="screen">
        <p className="muted">У вас пока нет привязанной группы.</p>
      </div>
    );
  }

  if (showSheet) {
    return (
      <GroupDetailsSheet
        group={myGroup}
        groupChildren={groupChildren}
        onClose={() => setShowSheet(false)}
        onOpenSettings={() => {
          setShowSheet(false);
          setShowGroupSettings(true);
        }}
        onAttendanceChange={handleAttendanceChange}
        onOpenChild={(child) => {
          setShowSheet(false);
          setOpenChild(child);
        }}
      />
    );
  }

  function handleAttendanceChange(childId, attendanceStatus) {
    setChildAttendance(childId, attendanceStatus);
    refreshView((version) => version + 1);
  }

  return (
    <div key={viewVersion} className="screen">
      <div className="teacher-home-topbar">
        <span>{appUser.name}</span>
      </div>
      <div className="teacher-groups-list">
        {myGroups.map((group) => {
          const children = getChildrenByGroupId(group.id);
          return (
            <GroupHeaderCard
              key={group.id}
              groupName={group.name}
              childrenCount={children.length}
              ageRange={group.ageRange}
              onClick={() => {
                setSelectedGroupId(group.id);
                setShowSheet(true);
              }}
            />
          );
        })}
      </div>

      <div className="mini-actions-row">
        <MiniActionCard icon="ti-message" label="Сообщения" onClick={onOpenMessages} />
        <MiniActionCard icon="ti-settings" label="Настройки" onClick={onOpenSettings} />
      </div>

      <div className="teacher-home-hint">
        <i className="ti ti-calendar-event" aria-hidden="true" />
        <span>Нажмите на группу, чтобы отметить посещаемость</span>
      </div>

      <button type="button" className="fab teacher-camera-fab" onClick={onOpenGallery} aria-label="Добавить фото">
        <i className="ti ti-camera" aria-hidden="true" />
      </button>

    </div>
  );
}
