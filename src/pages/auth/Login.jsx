import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "./AuthLayout"; 

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    // TODO: replace with a real authentication call, e.g.
    // const { role } = await api.post("/auth/login", form);
    login({ email: form.email });
    navigate("/");
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your union's activities"
      footer={
        <>
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}

        <div className="auth-field">
          <label>Email Address</label>
          <div className="auth-input">
            <FaEnvelope />
            <input type="email" name="email" placeholder="you@kera-abuja.org" value={form.email} onChange={handleChange} />
          </div>
        </div>

        <div className="auth-field">
          <label>Password</label>
          <div className="auth-input">
            <FaLock />
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
          </div>
        </div>

        <div className="auth-row">
          <label className="auth-checkbox">
            <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
            Remember me
          </label>
          <a href="#" className="auth-link" onClick={(e) => e.preventDefault()}>Forgot password?</a>
        </div>

        <button type="submit" className="auth-submit">Sign In</button>
      </form>
    </AuthLayout>
  );
}