import { createContext, useContext } from 'react';

// Хранит текущего авторизованного пользователя приложения (с ролью)
// и telegram-данные. Доступен из любого компонента через useUser().
export const UserContext = createContext(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser должен использоваться внутри <UserContext.Provider>');
  }
  return ctx;
}
