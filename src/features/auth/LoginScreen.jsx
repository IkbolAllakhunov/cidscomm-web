// Аналог LoginScreen из login_screen.dart. Точно по дизайну оригинала:
// bgBeige фон, ссылка "Регистрация" оранжевая справа вверху,
// заголовок "Вход" 28px по центру, два _FieldWrapper (белая карточка
// radius 24px + тень), чёрная кнопка radius 24px, текст ошибки красный.
// Вместо email/password принимает username/password из моков.

import { useState } from 'react';
import { getUserByUsername } from '../../mock/repository.js';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }
    setLoading(true);
    setError(null);

    // Имитация задержки сети как в оригинале (Future.delayed 500ms)
    await new Promise((r) => setTimeout(r, 500));

    const user = getUserByUsername(username.trim());
    if (!user || user.passwordHash !== password) {
      setLoading(false);
      setError('Неверный логин или пароль');
      return;
    }

    setLoading(false);
    onLogin(user);
  }

  return (
    <div className="login-screen">
      <div className="login-register-row">
        <button type="button" className="login-register-link">Регистрация</button>
      </div>

      <h1 className="login-title">Вход</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="field-wrapper">
          <input
            className="field-wrapper-input"
            type="text"
            placeholder="Почта"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="field-wrapper">
          <input
            className="field-wrapper-input"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        {loading ? (
          <div className="login-loading">
            <div className="spinner" />
          </div>
        ) : (
          <button type="submit" className="login-btn">Войти</button>
        )}
      </form>

      <div className="login-hint">
        <p className="muted small">Для теста: admin/admin123 · teacher/teacher123 · parent/parent123</p>
      </div>
    </div>
  );
}
