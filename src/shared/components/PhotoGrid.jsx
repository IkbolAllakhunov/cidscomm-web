// Сетка фото. Сердечко: белый круг с тенью (alpha 0.85) + видимая иконка.
// В оригинале (parent_gallery_page.dart) иконка была white-on-white — это
// визуальный баг оригинала. Исправляем: серая outline иконка неактивна,
// красная filled иконка активна — тактильно понятно пользователю.

export default function PhotoGrid({ photos, userId, onPhotoClick, onToggleFavorite }) {
  return (
    <div className="photo-grid">
      {photos.map((photo, index) => {
        const isFavorite = photo.favoriteBy?.includes(userId);
        return (
          <div key={photo.id} className="photo-grid-item" onClick={() => onPhotoClick(index)}>
            <img src={photo.url} alt="" loading="lazy" />
            <button
              type="button"
              className="photo-fav-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(photo.id);
              }}
              aria-label={isFavorite ? 'Убрать из избранного' : 'В избранное'}
              style={{ color: isFavorite ? '#e74c3c' : 'rgba(0,0,0,0.35)' }}
            >
              <i className={isFavorite ? 'ti ti-heart-filled' : 'ti ti-heart'} aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
