import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "./AuthLayout";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Admin",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.password) {
      setError("Full name, email, and password are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: replace with a real account-creation call, e.g.
    // await api.post("/auth/register", form);
    login({
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      role: form.role,
    });
    navigate("/");
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Register as an Admin to manage union activities"
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}

        <div className="auth-field">
          <label>Full Name</label>
          <div className="auth-input">
            <FaUser />
            <input type="text" name="fullName" placeholder="Jane Doe" value={form.fullName} onChange={handleChange} />
          </div>
        </div>

        <div className="auth-field">
          <label>Email Address</label>
          <div className="auth-input">
            <FaEnvelope />
            <input type="email" name="email" placeholder="you@kera-abuja.org" value={form.email} onChange={handleChange} />
          </div>
        </div>

        <div className="auth-field">
          <label>Phone Number</label>
          <div className="auth-input">
            <FaPhone />
            <input type="text" name="phone" placeholder="0803 000 0000" value={form.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="auth-field">
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange} className="auth-select">
            <option value="Admin">Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>

        <div className="auth-field">
          <label>Password</label>
          <div className="auth-input">
            <FaLock />
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
          </div>
        </div>

        <div className="auth-field">
          <label>Confirm Password</label>
          <div className="auth-input">
            <FaLock />
            <input type="password" name="confirmPassword" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="auth-submit">Create Account</button>
      </form>
    </AuthLayout>
  );
}