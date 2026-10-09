import Logo from "../../components/common/Logo";
import "../../styles/auth.css";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <Logo size={110} />
        </div>

        <h1 className="auth-title">{title}</h1>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}

        {children}

        {footer && <div className="auth-footer">{footer}</div>}
      </div>

      

      <p className="auth-copyright">
        © {new Date().getFullYear()} KERA — New Ultimate Keke &amp; Motorcycle
        Riders Association, Abuja Branch
      </p>
    </div>
  );
}