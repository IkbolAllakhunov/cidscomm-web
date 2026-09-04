// Аналог UploadPhotoPage из upload_photo_page.dart.
// Главное отличие от Flutter: вместо file_picker используем обычный
// <input type="file" accept="image/*">, что в Telegram открывает
// системную камеру/галерею без дополнительных пакетов.

import { useState } from 'react';

export default function UploadPhoto({ groupName, onUpload }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function handleUpload() {
    if (!file) return;
    onUpload(preview); // На этапе моков сохраняем blob-URL как url фото
    setFile(null);
    setPreview(null);
  }

  return (
    <div className="upload-photo">
      <p className="card-label">Группа: {groupName}</p>

      {preview && (
        <div className="upload-preview">
          <img src={preview} alt="Предпросмотр" />
        </div>
      )}

      <div className="upload-actions">
        <label className="btn-secondary upload-label">
          <i className="ti ti-camera" /> Выбрать фото
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            hidden
          />
        </label>
        <button type="button" className="btn-primary" disabled={!file} onClick={handleUpload}>
          <i className="ti ti-upload" /> Загрузить
        </button>
      </div>
    </div>
  );
}
