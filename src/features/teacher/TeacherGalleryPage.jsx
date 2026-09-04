// Аналог TeacherGalleryPage из teacher_gallery_page.dart. Точно по оригиналу:
// фон bgBeige, белый дропдаун группы в карточке с тенью, белая карточка
// загрузки с тенью, сетка 12px радиус с градиентным оверлеем и подписью.

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import { getGroupsByTeacherId, getPhotosByGroupId, addPhoto, deletePhoto } from '../../mock/repository.js';
import UploadPhoto from './UploadPhoto.jsx';
import PhotoViewer from '../../shared/components/PhotoViewer.jsx';

function formatTimeAgo(timestamp) {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor(diffMs / (1000 * 60));
  if (days > 0) return `${days}д назад`;
  if (hours > 0) return `${hours}ч назад`;
  if (minutes > 0) return `${minutes}м назад`;
  return 'только что';
}

export default function TeacherGalleryPage() {
  const { appUser } = useUser();
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [, forceRefresh] = useState(0);
  const [viewerIndex, setViewerIndex] = useState(null);
  const [deletingPhoto, setDeletingPhoto] = useState(null);
  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);

  const groups = getGroupsByTeacherId(appUser.id);
  const photos = selectedGroupId ? getPhotosByGroupId(selectedGroupId) : [];
  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

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
    forceRefresh((n) => n + 1);
  }

  function handleDelete() {
    deletePhoto(deletingPhoto.id);
    setDeletingPhoto(null);
    forceRefresh((n) => n + 1);
  }

  return (
    <div className="screen">
      <h1>Галерея</h1>

      <div className={`dropdown-card teacher-group-dropdown ${isGroupMenuOpen ? 'is-open' : ''}`}>
        <button
          type="button"
          className="teacher-group-dropdown-trigger"
          aria-haspopup="listbox"
          aria-expanded={isGroupMenuOpen}
          onClick={() => setIsGroupMenuOpen((open) => !open)}
        >
          <span>{selectedGroup?.name ?? 'Выберите группу'}</span>
          <i className="ti ti-chevron-down" aria-hidden="true" />
        </button>
        {isGroupMenuOpen && (
          <div className="teacher-group-dropdown-menu" role="listbox" aria-label="Группы">
            {groups.map((group) => (
              <button
                key={group.id}
                type="button"
                role="option"
                aria-selected={group.id === selectedGroupId}
                className={group.id === selectedGroupId ? 'selected' : ''}
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setIsGroupMenuOpen(false);
                }}
              >
                {group.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {!selectedGroupId ? (
        <div className="empty-state">
          <i className="ti ti-photo" aria-hidden="true" />
          <p className="muted">Выберите группу для загрузки фото</p>
        </div>
      ) : (
        <>
          <div className="white-card-shadow">
            <UploadPhoto groupName={selectedGroup?.name ?? ''} onUpload={handleUpload} />
          </div>

          {photos.length === 0 ? (
            <div className="empty-state teacher-gallery-empty">
              <i className="ti ti-photo" aria-hidden="true" />
              <strong>В группе пока нет фотографий</strong>
              <p className="muted">Загрузите первое фото, чтобы поделиться им с родителями.</p>
            </div>
          ) : (
            <div className="teacher-photo-grid">
              {photos.map((photo, index) => (
                <div key={photo.id} className="teacher-photo-card" onClick={() => setViewerIndex(index)}>
                  <img src={photo.url} alt="" loading="lazy" />
                  <div className="photo-overlay">
                    <span>Фото {index + 1}</span>
                    <span className="photo-time">{formatTimeAgo(photo.timestamp)}</span>
                  </div>
                  <button
                    type="button"
                    className="photo-delete-btn"
                    onClick={(event) => {
                      event.stopPropagation();
                      setDeletingPhoto(photo);
                    }}
                    aria-label="Удалить фото"
                  >
                    <i className="ti ti-trash" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {viewerIndex !== null && <PhotoViewer photos={photos} initialIndex={viewerIndex} onClose={() => setViewerIndex(null)} />}

      {deletingPhoto && (
        <div className="modal-overlay" onClick={() => setDeletingPhoto(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Удалить фото?</p>
            <p className="muted">Фото будет удалено из группы.</p>
            <div className="modal-actions">
              <button type="button" className="btn-text" onClick={() => setDeletingPhoto(null)}>Отмена</button>
              <button type="button" className="btn-primary danger-button" onClick={handleDelete}>Удалить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
