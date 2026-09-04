// Главный роутер приложения. Поток:
// 1. WelcomeScreen (один раз за сессию)
// 2. LoginScreen (username + password из моков)
// 3. Нужный интерфейс по роли (parent/teacher/admin)
//
// Продукт — обычный адаптивный сайт (открывается по прямой ссылке в
// браузере, на телефоне и на ноутбуке). Основной путь авторизации —
// логин/пароль. Опциональная авторизация через Telegram ID (useTelegramAuth.js)
// не используется в текущем потоке — это задел на будущее, если Telegram
// понадобится как дополнительный канал (см. CLAUDE.md).

import { useMemo, useState } from 'react';
import { UserContext } from '../shared/context/UserContext.jsx';
import WelcomeScreen from '../features/auth/WelcomeScreen.jsx';
import LoginScreen from '../features/auth/LoginScreen.jsx';
import ParentHome from '../features/parent/ParentHome.jsx';
import TeacherHome from '../features/teacher/TeacherHome.jsx';
import AdminHome from '../features/admin/AdminHome.jsx';

export default function RootSwitcher() {
  const [step, setStep] = useState('welcome'); // 'welcome' | 'login' | 'app'
  const [appUser, setAppUser] = useState(null);
  const userContext = useMemo(() => ({
    telegramUser: null,
    appUser,
    isInTelegram: false,
    logout: () => {
      setAppUser(null);
      setStep('login');
    },
  }), [appUser]);

  if (step === 'welcome') {
    return <WelcomeScreen onNext={() => setStep('login')} />;
  }

  if (step === 'login') {
    return (
      <LoginScreen
        onLogin={(user) => {
          setAppUser(user);
          setStep('app');
        }}
      />
    );
  }

  // step === 'app'
  return (
    <UserContext.Provider value={userContext}>
      {appUser.role === 'parent' && <ParentHome />}
      {appUser.role === 'teacher' && <TeacherHome />}
      {appUser.role === 'admin' && <AdminHome />}
    </UserContext.Provider>
  );
}
