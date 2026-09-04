// Аналог _PhotoViewer из parent_gallery_page.dart / parent_albums_page.dart /
// favorite_photos_page.dart — там это был дублирующийся приватный класс,
// здесь выносим в один переиспользуемый компонент.

import { useState } from 'react';

export default function PhotoViewer({ photos, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const photo = photos[currentIndex];

  if (!photo) return null;

  return (
    <div className="photo-viewer-overlay" onClick={onClose}>
      <button
        type="button"
        className="photo-viewer-close"
        onClick={onClose}
        aria-label="Закрыть"
      >
        <i className="ti ti-x" aria-hidden="true" />
      </button>

      <img
        src={photo.url}
        alt=""
        className="photo-viewer-image"
        onClick={(e) => e.stopPropagation()}
      />

      {photos.length > 1 && currentIndex > 0 && (
        <button
          type="button"
          className="photo-viewer-nav photo-viewer-nav-left"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((i) => i - 1);
          }}
          aria-label="Предыдущее фото"
        >
          <i className="ti ti-chevron-left" aria-hidden="true" />
        </button>
      )}

      {photos.length > 1 && currentIndex < photos.length - 1 && (
        <button
          type="button"
          className="photo-viewer-nav photo-viewer-nav-right"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((i) => i + 1);
          }}
          aria-label="Следующее фото"
        >
          <i className="ti ti-chevron-right" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
