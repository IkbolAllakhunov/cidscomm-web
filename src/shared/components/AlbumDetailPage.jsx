// Аналог AlbumDetailPage из parent_albums_page.dart.

import { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';
import { getAllPhotos, addPhotoToAlbum } from '../../mock/repository.js';
import PhotoViewer from './PhotoViewer.jsx';

export default function AlbumDetailPage({ album, onBack, onChanged }) {
  const { appUser } = useUser();
  const [showPicker, setShowPicker] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(null);

  const allPhotos = getAllPhotos();
  const albumPhotos = album.photoIds
    .map((id) => allPhotos.find((p) => p.id === id))
    .filter(Boolean);

  function handleAddPhoto(photoId) {
    addPhotoToAlbum(appUser.id, album.id, photoId);
    setShowPicker(false);
    onChanged();
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Назад">
          <i className="ti ti-arrow-left" />
        </button>
        <h1>{album.name}</h1>
      </div>

      {albumPhotos.length === 0 ? (
        <p className="muted">Нет фото в альбоме</p>
      ) : (
        <div className="photo-grid">
          {albumPhotos.map((photo, index) => (
            <div key={photo.id} className="photo-grid-item" onClick={() => setViewerIndex(index)}>
              <img src={photo.url} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      )}

      <button type="button" className="fab fab-extended" onClick={() => setShowPicker(true)}>
        <i className="ti ti-plus" /> Добавить фото
      </button>

      {showPicker && (
        <div className="modal-overlay" onClick={() => setShowPicker(false)}>
          <div className="modal modal-list" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Добавить фото в альбом</p>
            <div className="modal-scroll">
              {allPhotos.map((photo) => (
                <div key={photo.id} className="picker-row">
                  <img src={photo.url} alt="" className="picker-thumb" />
                  <span className="picker-id">{photo.id}</span>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleAddPhoto(photo.id)}
                    aria-label="Добавить"
                  >
                    <i className="ti ti-plus" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewerIndex !== null && (
        <PhotoViewer
          photos={albumPhotos}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </div>
  );
}
