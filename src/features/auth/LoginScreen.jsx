// Аналог LoginScreen из login_screen.dart, сверено с макетом Figma (sadik,
// фрейм "вход" 110:18): без ссылки на регистрацию — учителей и родителей
// заводит админ, самостоятельной регистрации в системе нет. Поля с подписью
// сверху и тонкой обводкой, чекбокс согласия с условиями, кнопка "Войти"
// залита оранжевым.

import { useState } from 'react';
import { getUserByUsername } from '../../mock/repository.js';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
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
      <h1 className="login-title">Вход</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label className="field-label" htmlFor="login-username">Номер</label>
          <input
            id="login-username"
            className="field-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="login-password">Пароль</label>
          <div className="field-input-wrap">
            <input
              id="login-password"
              className="field-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="field-toggle-visibility"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            >
              <i className={`ti ${showPassword ? 'ti-eye' : 'ti-eye-off'}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        <label className="login-consent">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span>
            Я согласен с <span className="login-link">условиями</span> и{' '}
            <span className="login-link">политикой конфиденциальности</span>
          </span>
        </label>

        {error && <p className="login-error">{error}</p>}

        {loading ? (
          <div className="login-loading">
            <div className="spinner" />
          </div>
        ) : (
          <button type="submit" className="login-btn" disabled={!agreed}>Войти</button>
        )}
      </form>

      <div className="login-hint">
        <p className="muted small">Для теста: admin/admin123 · teacher/teacher123 · parent/parent123</p>
      </div>
    </div>
  );
}
