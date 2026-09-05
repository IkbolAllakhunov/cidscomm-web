// Аналог favorite_photos_page.dart. groupId передаётся пропом — родитель
// подставляет группу своего ребёнка, воспитатель — группу, которую смотрит.

import { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import PhotoViewer from './PhotoViewer.jsx';
import PhotoGrid from './PhotoGrid.jsx';
import { getPhotosByGroupId, toggleFavorite } from '../../mock/repository.js';

export default function FavoritePhotosPage({ groupId, onBack }) {
  const { appUser } = useUser();
  const [viewerIndex, setViewerIndex] = useState(null);
  const [, forceRefresh] = useState(0);

  const allGroupPhotos = groupId ? getPhotosByGroupId(groupId) : [];
  const favoritePhotos = allGroupPhotos.filter((p) => p.favoriteBy.includes(appUser.id));

  function handleToggleFavorite(photoId) {
    toggleFavorite(photoId, appUser.id);
    forceRefresh((n) => n + 1);
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Назад">
          <i className="ti ti-arrow-left" />
        </button>
        <h1>Избранные фото</h1>
      </div>

      {favoritePhotos.length === 0 ? (
        <p className="muted">Нет избранных фото</p>
      ) : (
        <PhotoGrid
          photos={favoritePhotos}
          userId={appUser.id}
          onPhotoClick={(i) => setViewerIndex(i)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {viewerIndex !== null && (
        <PhotoViewer
          photos={favoritePhotos}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </div>
  );
}
