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

// medicalInfo расширен по макету Figma «Профиль ребенка» (2286:299): помимо
// аллергии и группы здоровья, ТЗ также требует хронические заболевания,
// прививки, противопоказания и особые мед. состояния (см. CLAUDE.md, п. 3).
export const children = [
  {
    id: 'child1',
    name: 'Айдана Каныбекова',
    groupId: 'group1',
    parentId: 'parent1',
    birthDate: '2020-03-15',
    status: 'Активен',
    father: { name: 'Бакыт Каныбеков', phone: '+996700000003' },
    mother: { name: 'Айгерим Каныбекова', phone: '+996550112233' },
    medicalInfo: {
      allergies: 'Нет',
      allergyDetails: null,
      healthGroup: 'Основная',
      chronicConditions: 'Нет',
      vaccinations: 'По календарю, без отклонений',
      contraindications: 'Нет',
      specialConditions: 'Нет',
    },
    notes: null,
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
    status: 'Активен',
    father: { name: 'Эркин Асанов', phone: '0778899123' },
    mother: { name: 'Айпери Асанова', phone: '0998877123' },
    medicalInfo: {
      allergies: 'Лактоза',
      allergyDetails: {
        reactionType: 'Расстройство пищеварения',
        severity: 'Лёгкая',
        action: 'Исключить молочные продукты из рациона, при дискомфорте сообщить родителям.',
      },
      healthGroup: 'Основная',
      chronicConditions: 'Нет',
      vaccinations: 'Нет данных',
      contraindications: 'Нет',
      specialConditions: 'Нет',
    },
    notes: 'Тяжело засыпает в тихий час, помогает колыбельная.',
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
    status: 'Активен',
    father: { name: 'Данияр Жумабеков', phone: '0770112233' },
    mother: { name: 'Нургуль Жумабекова', phone: '0550998877' },
    medicalInfo: {
      allergies: 'Пыль, орех',
      allergyDetails: {
        reactionType: 'Сыпь',
        severity: 'Средняя',
        action: 'Немедленно прекратить контакт с аллергеном, дать ребёнку антигистаминный препарат в возрастной дозировке (например, Зиртек, Эриус или Супрастин) и сорбент для вывода остатков продукта (Смекта, Полисорб), а затем вызвать врача.',
      },
      healthGroup: 'Подготовительная',
      chronicConditions: 'Нет',
      vaccinations: 'Нет',
      contraindications: 'Нет',
      specialConditions: 'Плохой слух, зрение (правый глаз -1,5), ДЦП',
    },
    notes: 'Говорит только на кыргызском, тяжело расстаётся с мамой по утрам.',
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

// weeklySchedule: распорядок дня по дням недели (один на сад), портирован
// по макету Figma «Занятия» — полный день с 8:00 до 19:45. Только утренние
// и дневное занятие меняются по дням, остальной распорядок (завтрак,
// прогулки, обед, полдник, сон, ужин, уход домой) одинаков каждый день.
function dayRoutine(morningActivities, middayActivity) {
  return [
    { time: '08:00', endTime: '08:45', subject: morningActivities[0] },
    { time: '09:00', endTime: '09:45', subject: morningActivities[1] },
    { time: '10:00', endTime: '10:45', subject: morningActivities[2] },
    { time: '11:00', endTime: '11:45', subject: 'Завтрак' },
    { time: '12:00', endTime: '12:45', subject: 'Прогулка' },
    { time: '13:00', endTime: '13:45', subject: middayActivity },
    { time: '14:00', endTime: '14:45', subject: 'Обед' },
    { time: '15:00', endTime: '15:45', subject: 'Прогулка' },
    { time: '16:00', endTime: '16:45', subject: 'Полдник' },
    { time: '17:00', endTime: '17:45', subject: 'Дневной сон' },
    { time: '18:00', endTime: '18:45', subject: 'Ужин' },
    { time: '19:00', endTime: '19:45', subject: 'Уход домой' },
  ];
}

export const weeklySchedule = [
  { day: 'Понедельник', items: dayRoutine(['Чтение', 'Рисование', 'Речевая деятельность'], 'Занятия') },
  { day: 'Вторник', items: dayRoutine(['Математика', 'Музыка', 'Игра'], 'Логика') },
  { day: 'Среда', items: dayRoutine(['Спорт', 'Лепка', 'Танцы'], 'Занятия') },
  { day: 'Четверг', items: dayRoutine(['Логика', 'Поделки', 'Сказки'], 'Занятия') },
  { day: 'Пятница', items: dayRoutine(['Чтение', 'Флешмоб', 'Свободное время'], 'Занятия') },
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
