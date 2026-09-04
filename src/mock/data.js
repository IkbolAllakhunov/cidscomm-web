// Мок-данные Kidscomm. Структура полей повторяет модели из Flutter-версии
// (UserModel, GroupModel, ChildModel, PhotoModel, AlbumModel, MessageModel),
// В production эти записи будут заменены данными backend.

export const users = [
  {
    id: 'admin1',
    telegramId: 100000001,
    role: 'admin',
    name: 'Администратор',
    username: 'admin',
    passwordHash: 'admin123',
    phone: '+996700000001',
    email: 'admin@kidscomm.kg',
    isActive: true,
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'teacher1',
    telegramId: 100000002,
    role: 'teacher',
    name: 'Айгуль Эсенова',
    username: 'teacher',
    passwordHash: 'teacher123',
    phone: '+996700000002',
    email: 'teacher@kidscomm.kg',
    isActive: true,
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'parent1',
    telegramId: 100000003,
    role: 'parent',
    name: 'Бакыт Каныбеков',
    username: 'parent',
    passwordHash: 'parent123',
    phone: '+996700000003',
    email: 'parent@kidscomm.kg',
    isActive: true,
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'doctor1',
    role: 'doctor',
    name: 'Медработник садика',
    username: 'doctor',
    passwordHash: 'doctor123',
    phone: '+996700000004',
    email: 'doctor@kidscomm.kg',
    isActive: true,
    createdAt: '2026-01-10T09:00:00Z',
  },
];

export const groups = [
  {
    id: 'group1',
    name: 'Звёздочки',
    ageRange: '3-4 года',
    childIds: ['child1'],
    teacherIds: ['teacher1'],
  },
  {
    id: 'group2',
    name: 'Солнышки',
    ageRange: '4-5 лет',
    childIds: [],
    teacherIds: ['teacher1'],
  },
  {
    id: 'group3',
    name: 'Радуга',
    ageRange: '5-6 лет',
    childIds: [],
    teacherIds: ['teacher1'],
  },
];

export const children = [
  {
    id: 'child1',
    name: 'Айдана Каныбекова',
    groupId: 'group1',
    parentId: 'parent1',
    birthDate: '2020-03-15',
    medicalInfo: { allergies: 'Нет', healthGroup: 'Основная' },
    height: null,
    parentComment: null,
    isPresent: true,
    attendanceStatus: 'present',
  },
  {
    id: 'child2',
    name: 'Тимур Асанов',
    groupId: 'group1',
    parentId: null,
    birthDate: '2020-07-22',
    medicalInfo: { allergies: 'Лактоза', healthGroup: 'Основная' },
    height: null,
    parentComment: null,
    isPresent: true,
    attendanceStatus: 'present',
  },
  {
    id: 'child3',
    name: 'Эльмира Жумабекова',
    groupId: 'group1',
    parentId: null,
    birthDate: '2020-01-09',
    medicalInfo: { allergies: 'Нет', healthGroup: 'Подготовительная' },
    height: null,
    parentComment: null,
    isPresent: false,
    attendanceStatus: 'absent',
  },
];

// PhotoModel: { id, groupId, uploadedBy, timestamp, url, favoriteBy: [], albums: [] }
export const photos = [
  {
    id: 'photo1',
    groupId: 'group1',
    uploadedBy: 'teacher1',
    timestamp: '2026-06-19T10:00:00Z',
    url: 'https://images.unsplash.com/photo-1587616211892-b8e5e80e5acf?w=600',
    favoriteBy: [],
    albums: [],
  },
  {
    id: 'photo2',
    groupId: 'group1',
    uploadedBy: 'teacher1',
    timestamp: '2026-06-19T11:00:00Z',
    url: 'https://images.unsplash.com/photo-1597248374161-426f0d6d2dab?w=600',
    favoriteBy: [],
    albums: [],
  },
  {
    id: 'photo3',
    groupId: 'group1',
    uploadedBy: 'teacher1',
    timestamp: '2026-06-20T09:00:00Z',
    url: 'https://images.unsplash.com/photo-1576765608866-5b51046452be?w=600',
    favoriteBy: ['parent1'],
    albums: [],
  },
  {
    id: 'photo4',
    groupId: 'group1',
    uploadedBy: 'teacher1',
    timestamp: '2026-06-20T14:30:00Z',
    url: 'https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b6?w=600',
    favoriteBy: [],
    albums: [],
  },
];

// albumsByUser: { [userId]: AlbumModel[] }
export const albumsByUser = {};

// messages: MessageModel[] — личные сообщения 1-на-1 (author <-> recipient),
// как ChatService.getChat() во Flutter. Раньше были messagesByGroup,
// но в оригинале чат именно личный (родитель <-> конкретный воспитатель).
export const messages = [
  {
    id: 'msg1',
    text: 'Здравствуйте! Завтра не забудьте сменную обувь.',
    author: 'teacher1',
    recipient: 'parent1',
    timestamp: '2026-06-20T08:30:00Z',
    isFromTeacher: true,
  },
  {
    id: 'msg2',
    text: 'Спасибо, передам!',
    author: 'parent1',
    recipient: 'teacher1',
    timestamp: '2026-06-20T08:45:00Z',
    isFromTeacher: false,
  },
  {
    id: 'msg3',
    text: 'Завтра собираем детей на осмотр.',
    author: 'doctor1',
    recipient: 'parent1',
    timestamp: '2026-06-20T09:15:00Z',
    isFromTeacher: false,
  },
  {
    id: 'msg4',
    text: 'Доброе утро! Кто сегодня идет на прогулку?',
    author: 'parent1',
    recipient: 'group:group1',
    timestamp: '2026-06-20T10:00:00Z',
    isFromTeacher: false,
  },
];

// weeklySchedule: статичное расписание занятий по дням недели (одно на сад,
// как было в schedule_page.dart у родителя — там оно было захардкожено).
export const weeklySchedule = [
  { day: 'Понедельник', items: [
    { time: '09:00', subject: 'Музыка' },
    { time: '10:00', subject: 'Рисование' },
    { time: '11:00', subject: 'Прогулка' },
  ] },
  { day: 'Вторник', items: [
    { time: '09:00', subject: 'Математика' },
    { time: '10:00', subject: 'Игра' },
    { time: '11:00', subject: 'Чтение' },
  ] },
  { day: 'Среда', items: [
    { time: '09:00', subject: 'Спорт' },
    { time: '10:00', subject: 'Лепка' },
    { time: '11:00', subject: 'Танцы' },
  ] },
  { day: 'Четверг', items: [
    { time: '09:00', subject: 'Логика' },
    { time: '10:00', subject: 'Поделки' },
    { time: '11:00', subject: 'Сказки' },
  ] },
  { day: 'Пятница', items: [
    { time: '09:00', subject: 'Прогулка' },
    { time: '10:00', subject: 'Флешмоб' },
    { time: '11:00', subject: 'Свободное время' },
  ] },
];

// scheduleNotes: заметки воспитателя на конкретные даты, привязанные к группе.
// В оригинале (teacher_schedule_page.dart) это был in-memory список без
// сохранения и без связи с родителем — здесь привязываем к groupId,
// чтобы родитель реально видел заметки своей группы.
export const scheduleNotes = [
  {
    id: 'note1',
    groupId: 'group1',
    date: '2026-06-23',
    text: 'Возьмите спортивную форму — будет занятие на улице',
  },
];
