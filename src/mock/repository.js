// Слой доступа к данным — аналог MockDataService.dart.
// Сейчас читает/пишет в моки из памяти. Когда появится бэкенд,
// эти функции заменятся на fetch-запросы к FastAPI — сигнатуры
// функций не изменятся, поэтому компоненты выше не придётся трогать.

import {
  users as initialUsers,
  groups as initialGroups,
  children as initialChildren,
  photos as initialPhotos,
  albumsByUser as initialAlbumsByUser,
  messages as initialMessages,
  weeklySchedule as initialWeeklySchedule,
  scheduleNotes as initialScheduleNotes,
} from './data.js';

// Копируем в "живые" массивы, чтобы можно было мутировать во время сессии
// (как in-memory списки в Dart-сервисе). При обновлении страницы сбросится —
// это нормально для этапа моков.
const db = {
  users: [...initialUsers],
  groups: [...initialGroups],
  children: [...initialChildren],
  photos: [...initialPhotos],
  albumsByUser: { ...initialAlbumsByUser },
  messages: [...initialMessages],
  weeklySchedule: initialWeeklySchedule, // статично, не мутируется
  scheduleNotes: [...initialScheduleNotes],
};

// ---- Поиск ----

export function getUserByTelegramId(telegramId) {
  return db.users.find((u) => u.telegramId === telegramId) ?? null;
}

export function getUserByUsername(username) {
  return db.users.find((u) => u.username === username) ?? null;
}

export function getUserById(id) {
  return db.users.find((u) => u.id === id) ?? null;
}

export function updateUserProfile(userId, { name, email, phone }) {
  const user = db.users.find((u) => u.id === userId);
  if (user) {
    user.name = name;
    user.email = email;
    user.phone = phone;
  }
  return user;
}

export function getGroupById(id) {
  return db.groups.find((g) => g.id === id) ?? null;
}

export function getChildById(id) {
  return db.children.find((c) => c.id === id) ?? null;
}

export function getChildrenByParentId(parentId) {
  return db.children.filter((c) => c.parentId === parentId);
}

export function getChildrenByGroupId(groupId) {
  return db.children.filter((c) => c.groupId === groupId);
}

export function getAllChildren() {
  return db.children;
}

export function setChildAttendance(childId, attendanceStatus) {
  const child = db.children.find((c) => c.id === childId);
  if (child) {
    child.attendanceStatus = attendanceStatus;
    child.isPresent = attendanceStatus === 'present';
  }
}

export function getGroupsByTeacherId(teacherId) {
  return db.groups.filter((g) => g.teacherIds.includes(teacherId));
}

export function getAllGroups() {
  return db.groups;
}

export function getAllUsers() {
  return db.users;
}

export function addUser({ telegramId, role, name, phone, email }) {
  const user = {
    id: `user${Date.now()}`,
    telegramId: Number(telegramId),
    role,
    name,
    phone,
    email,
    isActive: true,
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  return user;
}

export function deleteUser(userId) {
  const i = db.users.findIndex((u) => u.id === userId);
  if (i >= 0) db.users.splice(i, 1);
}

// ---- Фото / избранное ----

export function getAllPhotos() {
  return db.photos;
}

export function getPhotosByGroupId(groupId) {
  return db.photos.filter((p) => p.groupId === groupId);
}

export function addPhoto(photo) {
  db.photos.push(photo);
  return photo;
}

export function deletePhoto(photoId) {
  const i = db.photos.findIndex((p) => p.id === photoId);
  if (i >= 0) db.photos.splice(i, 1);
}

export function getPhotoById(photoId) {
  return db.photos.find((p) => p.id === photoId) ?? null;
}

export function toggleFavorite(photoId, userId) {
  const photo = db.photos.find((p) => p.id === photoId);
  if (!photo) return;
  const i = photo.favoriteBy.indexOf(userId);
  if (i >= 0) {
    photo.favoriteBy.splice(i, 1);
  } else {
    photo.favoriteBy.push(userId);
  }
}

// ---- Альбомы ----

export function getAlbumsForUser(userId) {
  return db.albumsByUser[userId] ?? [];
}

export function addAlbum(userId, album) {
  if (!db.albumsByUser[userId]) db.albumsByUser[userId] = [];
  db.albumsByUser[userId].push(album);
}

export function deleteAlbum(userId, albumId) {
  if (!db.albumsByUser[userId]) return;
  db.albumsByUser[userId] = db.albumsByUser[userId].filter((a) => a.id !== albumId);
}

export function addPhotoToAlbum(userId, albumId, photoId) {
  const album = db.albumsByUser[userId]?.find((a) => a.id === albumId);
  if (album && !album.photoIds.includes(photoId)) {
    album.photoIds.push(photoId);
  }
  const photo = db.photos.find((p) => p.id === photoId);
  if (photo && !photo.albums.includes(albumId)) {
    photo.albums.push(albumId);
  }
}

// ---- Сообщения (личный чат 1-на-1, аналог ChatService.getChat) ----

export function getChat(userId1, userId2) {
  return db.messages
    .filter(
      (m) =>
        (m.author === userId1 && m.recipient === userId2) ||
        (m.author === userId2 && m.recipient === userId1)
    )
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

export function getLastMessage(userId1, userId2) {
  const chat = getChat(userId1, userId2);
  return chat[chat.length - 1] ?? null;
}

export function sendMessage({ author, recipient, text, isFromTeacher }) {
  const message = {
    id: `msg_${Date.now()}`,
    text,
    author,
    recipient,
    timestamp: new Date().toISOString(),
    isFromTeacher,
  };
  db.messages.push(message);
  return message;
}

export function updateMessage(messageId, text) {
  const message = db.messages.find((item) => item.id === messageId);
  if (message) message.text = text;
  return message;
}

export function deleteMessage(messageId) {
  const index = db.messages.findIndex((item) => item.id === messageId);
  if (index >= 0) db.messages.splice(index, 1);
}

// ---- Расписание ----

export function getWeeklySchedule() {
  return db.weeklySchedule;
}

export function getScheduleNotesByGroupId(groupId) {
  return db.scheduleNotes
    .filter((n) => n.groupId === groupId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function addScheduleNote(groupId, { date, text }) {
  const note = {
    id: `note_${Date.now()}`,
    groupId,
    date,
    text,
  };
  db.scheduleNotes.push(note);
  return note;
}

export function deleteScheduleNote(noteId) {
  const i = db.scheduleNotes.findIndex((n) => n.id === noteId);
  if (i >= 0) db.scheduleNotes.splice(i, 1);
}

// ---- Управление детьми (админ) ----

export function addChild({ name, groupId, parentId, birthDate, allergies, healthGroup }) {
  const child = {
    id: `child${Date.now()}`,
    name,
    groupId: groupId || null,
    parentId: parentId || null,
    birthDate,
    medicalInfo: { allergies: allergies || 'Нет', healthGroup: healthGroup || 'Основная' },
    height: null,
    parentComment: null,
    isPresent: true,
  };
  db.children.push(child);
  return child;
}

export function assignChildToParent(childId, parentId) {
  const child = db.children.find((c) => c.id === childId);
  if (child) child.parentId = parentId;
}

// ---- Управление группами (админ) ----

export function addGroup({ name, ageRange }) {
  const group = {
    id: `group${Date.now()}`,
    name,
    ageRange,
    childIds: [],
    teacherIds: [],
  };
  db.groups.push(group);
  return group;
}

export function deleteGroup(groupId) {
  const i = db.groups.findIndex((g) => g.id === groupId);
  if (i >= 0) db.groups.splice(i, 1);
}

export function assignTeacherToGroup(groupId, teacherId) {
  const group = db.groups.find((g) => g.id === groupId);
  if (group && !group.teacherIds.includes(teacherId)) {
    group.teacherIds.push(teacherId);
  }
}

export function assignChildToGroup(childId, groupId) {
  const child = db.children.find((c) => c.id === childId);
  if (child) child.groupId = groupId;
}
