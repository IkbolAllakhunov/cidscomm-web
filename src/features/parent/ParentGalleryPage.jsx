// Аналог GalleryPage из parent_gallery_page.dart.
// Сетка фото группы ребёнка + переход в альбомы / избранное.

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import { getChildrenByParentId, getPhotosByGroupId, toggleFavorite } from '../../mock/repository.js';
import PhotoViewer from '../../shared/components/PhotoViewer.jsx';
import PhotoGrid from '../../shared/components/PhotoGrid.jsx';
import ParentAlbumsPage from './ParentAlbumsPage.jsx';
import FavoritePhotosPage from './FavoritePhotosPage.jsx';

export default function ParentGalleryPage() {
  const { appUser } = useUser();
  const [view, setView] = useState('grid'); // 'grid' | 'albums' | 'favorites'
  const [viewerIndex, setViewerIndex] = useState(null);
  const [, forceRefresh] = useState(0);

  const myChildren = getChildrenByParentId(appUser.id);
  const groupId = myChildren[0]?.groupId;
  const photos = groupId ? getPhotosByGroupId(groupId) : [];

  if (view === 'albums') {
    return <ParentAlbumsPage onBack={() => setView('grid')} />;
  }
  if (view === 'favorites') {
    return <FavoritePhotosPage onBack={() => setView('grid')} />;
  }

  function handleToggleFavorite(photoId) {
    toggleFavorite(photoId, appUser.id);
    forceRefresh((n) => n + 1);
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Галерея группы</h1>
        <div className="header-actions">
          <button type="button" className="icon-btn" onClick={() => setView('albums')} aria-label="Альбомы">
            <i className="ti ti-album" />
          </button>
          <button type="button" className="icon-btn" onClick={() => setView('favorites')} aria-label="Избранное">
            <i className="ti ti-heart" />
          </button>
        </div>
      </div>

      {photos.length === 0 ? (
        <div className="empty-state">
          <i className="ti ti-photo" aria-hidden="true" />
          <p className="card-label">Нет фотографий</p>
          <p className="muted">Фотографии появятся здесь, когда воспитатель их загрузит</p>
        </div>
      ) : (
        <PhotoGrid
          photos={photos}
          userId={appUser.id}
          onPhotoClick={(i) => setViewerIndex(i)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {viewerIndex !== null && (
        <PhotoViewer
          photos={photos}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </div>
  );
}
