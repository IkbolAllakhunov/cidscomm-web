// Хук авторизации через Telegram. Заменяет login_screen.dart + auth_service.dart.
//
// В реальном TMA Telegram передаёт initData (подписанные данные пользователя)
// автоматически при открытии — никакого экрана логина с паролем не нужно.
// Мы достаём telegram-пользователя из window.Telegram.WebApp и ищем
// соответствующую запись в моках по telegramId.
//
// Когда появится бэкенд: initData нужно будет отправить на сервер
// для проверки подписи (hash). Сейчас на этапе моков мы доверяем
// данным от Telegram SDK напрямую — это нормально только для разработки.

import { useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { getUserByTelegramId } from '../../mock/repository.js';

// Тестовый telegram-пользователь — используется когда приложение
// открыто не в Telegram (обычный браузер при разработке).
const DEV_FALLBACK_TELEGRAM_USER = {
  id: 100000003, // совпадает с parent1 в моках
  first_name: 'Бакыт',
  last_name: 'Каныбеков',
  username: 'baktyk_dev',
};

function resolveAuthState() {
  let telegramUser = null;
  let isInTelegram = false;

  try {
    WebApp.ready();
    WebApp.expand();
    telegramUser = WebApp.initDataUnsafe?.user ?? null;
    isInTelegram = Boolean(WebApp.initData);
  } catch {
    // SDK недоступен — мы не в Telegram
  }

  if (!telegramUser) {
    telegramUser = DEV_FALLBACK_TELEGRAM_USER;
  }

  const appUser = getUserByTelegramId(telegramUser.id);

  return {
    loading: false,
    telegramUser,
    appUser,
    isInTelegram,
  };
}

export function useTelegramAuth() {
  // Логика синхронная (без реальных async side-effect), поэтому вычисляем
  // состояние один раз через lazy initializer, а не через useEffect + setState.
  const [state] = useState(resolveAuthState);
  return state;
}
