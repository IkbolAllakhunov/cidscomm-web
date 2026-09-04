// Аналог _addChildDialog из admin_users_page.dart.

import { useState } from 'react';
import { getAllGroups } from '../../mock/repository.js';

export default function AddChildModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [allergies, setAllergies] = useState('');

  const groups = getAllGroups();

  function handleSubmit() {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), groupId, birthDate, allergies });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p className="card-label">Добавить ребёнка</p>

        <input type="text" className="text-input" placeholder="Имя ребёнка" value={name} onChange={(e) => setName(e.target.value)} autoFocus />

        <select className="select-input" value={groupId} onChange={(e) => setGroupId(e.target.value)}>
          <option value="">Без группы</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <input type="date" className="text-input" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <input type="text" className="text-input" placeholder="Аллергии (если есть)" value={allergies} onChange={(e) => setAllergies(e.target.value)} />

        <div className="modal-actions">
          <button type="button" className="btn-text" onClick={onClose}>Отмена</button>
          <button type="button" className="btn-primary" onClick={handleSubmit}>Добавить</button>
        </div>
      </div>
    </div>
  );
}
