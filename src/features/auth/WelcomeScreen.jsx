// Аналог WelcomeScreen из welcome_screen.dart. В оригинале это первый
// экран перед логином/паролем. В TMA отдельный логин не нужен (Telegram
// сам передаёт пользователя), поэтому экран служит брендированной заставкой
// перед тем, как приложение определит роль — нажатие "Дальше" сразу
// продолжает в RootSwitcher.

export default function WelcomeScreen({ onNext }) {
  return (
    <div className="welcome-screen">
      <img src="/images/welcome_pattern.png" alt="" className="welcome-pattern" />

      <div className="welcome-header">
        <p className="welcome-title">
          Добро<br />пожаловать в
        </p>
        <p className="welcome-brand">Kidscomm</p>
      </div>

      <div className="welcome-illustration-wrap">
        <img src="/images/welcome_illustration.png" alt="Дети из детского сада" className="welcome-illustration" />
      </div>

      <button type="button" className="welcome-btn" onClick={onNext}>
        Вход
      </button>
    </div>
  );
}
