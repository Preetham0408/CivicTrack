import AuthForm from "../components/AuthForm";
import "./Login.css";

export default function Login({ onLogin }) {
  return (
    <main className="login-page">
      <section className="login-intro">
        <div className="login-brand">
          <span className="login-brand-icon">C</span>
          <span>CivicTrack</span>
        </div>

        <div className="login-intro-content">
          <p className="login-eyebrow">YOUR COMMUNITY, YOUR VOICE</p>

          <h1>
            Together, we can
            <br />
            build better
            <br />
            communities.
          </h1>

          <p className="login-description">
            Report local issues, track progress, and help make
            your neighborhood a better place for everyone.
          </p>

          <div className="login-benefits">
            <p>✓ Report civic issues easily</p>
            <p>✓ Follow updates on your reports</p>
            <p>✓ Make your community better</p>
          </div>
        </div>

        <p className="login-footer">
          Making every community count.
        </p>
      </section>

      <section className="login-panel">
        <div className="login-form-container">
          <p className="login-mobile-brand">CivicTrack</p>

          <p className="login-eyebrow login-eyebrow-dark">
            WELCOME BACK
          </p>

          <h2>Sign in to CivicTrack</h2>

          <p className="login-form-description">
            Welcome back! Enter your account details to continue.
          </p>

          <AuthForm onLogin={onLogin} />

          <p className="login-security-note">
            Your community starts with you.
          </p>
        </div>
      </section>
    </main>
  );
}
