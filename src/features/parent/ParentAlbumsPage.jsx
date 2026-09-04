// Аналог ParentAlbumsPage из parent_albums_page.dart.
// Список альбомов + диалог создания нового. Детали альбома — в AlbumDetailPage.

import { useState } from 'react';
import { useUser } from '../../shared/context/UserContext.jsx';
import { getAlbumsForUser, addAlbum, deleteAlbum } from '../../mock/repository.js';
import AlbumDetailPage from './AlbumDetailPage.jsx';

export default function ParentAlbumsPage({ onBack }) {
  const { appUser } = useUser();
  const [, forceRefresh] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [openAlbumId, setOpenAlbumId] = useState(null);

  const albums = getAlbumsForUser(appUser.id);

  if (openAlbumId) {
    const album = albums.find((a) => a.id === openAlbumId);
    return (
      <AlbumDetailPage
        album={album}
        onBack={() => setOpenAlbumId(null)}
        onChanged={() => forceRefresh((n) => n + 1)}
      />
    );
  }

  function handleCreate() {
    const name = newAlbumName.trim();
    if (!name) return;
    addAlbum(appUser.id, {
      id: `album_${Date.now()}`,
      name,
      photoIds: [],
    });
    setNewAlbumName('');
    setShowCreate(false);
    forceRefresh((n) => n + 1);
  }

  function handleDelete(albumId) {
    deleteAlbum(appUser.id, albumId);
    forceRefresh((n) => n + 1);
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Назад">
          <i className="ti ti-arrow-left" />
        </button>
        <h1>Альбомы</h1>
      </div>

      {albums.length === 0 && <p className="muted">Нет альбомов</p>}

      {albums.map((album) => (
        <div key={album.id} className="card list-card" onClick={() => setOpenAlbumId(album.id)}>
          <span>{album.name}</span>
          <button
            type="button"
            className="icon-btn danger"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(album.id);
            }}
            aria-label="Удалить альбом"
          >
            <i className="ti ti-trash" />
          </button>
        </div>
      ))}

      <button type="button" className="fab" onClick={() => setShowCreate(true)} aria-label="Создать альбом">
        <i className="ti ti-plus" />
      </button>

      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="card-label">Создать альбом</p>
            <input
              type="text"
              className="text-input"
              placeholder="Название альбома"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
            <div className="modal-actions">
              <button type="button" className="btn-text" onClick={() => setShowCreate(false)}>
                Отмена
              </button>
              <button type="button" className="btn-primary" onClick={handleCreate}>
                Создать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
