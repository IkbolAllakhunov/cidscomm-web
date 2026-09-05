// Аналог TeacherGalleryPage из teacher_gallery_page.dart, портирован по
// макету Figma (sadik, фреймы «галерея группы» / «галерея» / «удаление» /
// «нет фоток»): список групп → сетка фото по датам с сердечком-избранным,
// вкладки Альбом/Избранное/Фото, режим выделения для удаления нескольких фото.

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import { getGroupsByTeacherId, getPhotosByGroupId, addPhoto, deletePhoto, toggleFavorite } from '../../mock/repository.js';
import UploadPhoto from './UploadPhoto.jsx';
import PhotoViewer from '../../shared/components/PhotoViewer.jsx';
import PhotoGrid from '../../shared/components/PhotoGrid.jsx';
import AlbumsPage from '../../shared/components/AlbumsPage.jsx';
import FavoritePhotosPage from '../../shared/components/FavoritePhotosPage.jsx';

function formatDateLabel(timestamp) {
  const date = new Date(timestamp);
  if (date.toDateString() === new Date().toDateString()) return 'Сегодня';
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

function groupPhotosByDate(photos) {
  const groups = [];
  const byLabel = new Map();
  for (const photo of photos) {
    const label = formatDateLabel(photo.timestamp);
    if (!byLabel.has(label)) {
      const group = { label, photos: [] };
      byLabel.set(label, group);
      groups.push(group);
    }
    byLabel.get(label).photos.push(photo);
  }
  return groups;
}

export default function TeacherGalleryPage() {
  const { appUser } = useUser();
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [, forceRefresh] = useState(0);
  const [viewerIndex, setViewerIndex] = useState(null);
  const [view, setView] = useState('grid'); // 'grid' | 'albums' | 'favorites'
  const [showUpload, setShowUpload] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const groups = getGroupsByTeacherId(appUser.id);
  const selectedGroup = groups.find((g) => g.id === selectedGroupId);
  const photos = selectedGroupId ? getPhotosByGroupId(selectedGroupId) : [];
  const sortedPhotos = [...photos].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const dateGroups = groupPhotosByDate(sortedPhotos);

  if (view === 'albums') return <AlbumsPage onBack={() => setView('grid')} />;
  if (view === 'favorites') return <FavoritePhotosPage groupId={selectedGroupId} onBack={() => setView('grid')} />;

  function handleUpload(url) {
    addPhoto({
      id: `photo${Date.now()}`,
      groupId: selectedGroupId,
      uploadedBy: appUser.id,
      timestamp: new Date().toISOString(),
      url,
      favoriteBy: [],
      albums: [],
    });
    setShowUpload(false);
    forceRefresh((n) => n + 1);
  }

  function handleToggleFavorite(photoId) {
    toggleFavorite(photoId, appUser.id);
    forceRefresh((n) => n + 1);
  }

  function toggleSelected(photoId) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(photoId)) next.delete(photoId);
      else next.add(photoId);
      return next;
    });
  }

  function exitSelection() {
    setIsSelecting(false);
    setSelectedIds(new Set());
  }

  function handleConfirmDelete() {
    selectedIds.forEach((id) => deletePhoto(id));
    setConfirmingDelete(false);
    exitSelection();
    forceRefresh((n) => n + 1);
  }

  if (!selectedGroupId) {
    return (
      <div className="screen">
        <h1>Галерея</h1>
        {groups.length === 0 ? (
          <p className="muted">У вас пока нет группы</p>
        ) : (
          <div className="group-picker-list">
            {groups.map((group) => (
              <button key={group.id} type="button" className="group-picker-row" onClick={() => setSelectedGroupId(group.id)}>
                Группа: {group.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Галерея</h1>
        <button
          type="button"
          className="icon-btn danger"
          onClick={() => (isSelecting ? setConfirmingDelete(true) : setIsSelecting(true))}
          disabled={isSelecting && selectedIds.size === 0}
          aria-label={isSelecting ? 'Удалить выбранные фото' : 'Выбрать фото для удаления'}
        >
          <i className="ti ti-trash" />
        </button>
      </div>

      {isSelecting ? (
        <button type="button" className="btn-text gallery-cancel-selection" onClick={exitSelection}>Отменить выбор</button>
      ) : (
        <div className="gallery-tabs">
          <button type="button" className="gallery-tab" onClick={() => setView('albums')}>
            <i className="ti ti-plus" aria-hidden="true" /> Альбом
          </button>
          <button type="button" className="gallery-tab" onClick={() => setView('favorites')}>Избранное</button>
          <button type="button" className="gallery-tab" onClick={() => setShowUpload(true)}>
            <i className="ti ti-plus" aria-hidden="true" /> Фото
          </button>
        </div>
      )}

      <p className="gallery-group-meta"><strong>Группа: {selectedGroup?.name}</strong> · {photos.length} фото</p>

      {photos.length === 0 ? (
        <div className="empty-state teacher-gallery-empty">
          <p className="muted">У вас пока нет фоток</p>
        </div>
      ) : (
        dateGroups.map((group) => (
          <div key={group.label} className="gallery-date-group">
            <p className="gallery-date-label">{group.label}</p>
            {isSelecting ? (
              <div className="photo-grid">
                {group.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className={`photo-grid-item ${selectedIds.has(photo.id) ? 'is-selected' : ''}`}
                    onClick={() => toggleSelected(photo.id)}
                  >
                    <img src={photo.url} alt="" loading="lazy" />
                    <span className="photo-select-dot" aria-hidden="true" />
                  </div>
                ))}
              </div>
            ) : (
              <PhotoGrid
                photos={group.photos}
                userId={appUser.id}
                onPhotoClick={(localIndex) => setViewerIndex(sortedPhotos.indexOf(group.photos[localIndex]))}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          </div>
        ))
      )}

      {viewerIndex !== null && (
        <PhotoViewer photos={sortedPhotos} initialIndex={viewerIndex} onClose={() => setViewerIndex(null)} />
      )}

      {showUpload && (
        <div className="modal-overlay" onClick={() => setShowUpload(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <UploadPhoto groupName={selectedGroup?.name ?? ''} onUpload={handleUpload} />
          </div>
        </div>
      )}

      {confirmingDelete && (
        <div className="modal-overlay" onClick={() => setConfirmingDelete(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Вы уверены, что хотите удалить навсегда?</p>
            <div className="modal-actions">
              <button type="button" className="btn-text" onClick={() => setConfirmingDelete(false)}>Нет</button>
              <button type="button" className="btn-primary danger-button" onClick={handleConfirmDelete}>Да</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
