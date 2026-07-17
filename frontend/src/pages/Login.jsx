import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext.jsx"
import toast from 'react-hot-toast'
import Navbar from "../components/Navbar/Navbar.jsx"
import "./css/login.css"

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

 const [formData, setFormData] = useState({
  email: "",
  password: ""
})
const [showPassword, setShowPassword] = useState(false)
const [submitting, setSubmitting] = useState(false)

const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value
  }))
}
const handleSubmit = async (e) => {
  e.preventDefault()
  if (!formData.email.trim() || !formData.password.trim(  )) {
      toast.error("Please enter your email and password.")
      return
    }

    try {
      setSubmitting(true)                                          
      await login(formData)
      navigate("/")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Couldn't log you in. Please check your details and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <Navbar/>
    <div className="login-page__grid">
        <div className="login-art">
          <svg viewBox="0 0 320 320" className="login-art__svg" aria-hidden="true">
            <circle cx="160" cy="160" r="140" fill="var(--secondary)" opacity="0.12" />
            <rect x="90" y="110" width="140" height="150" rx="18" fill="var(--primary)" />
            <path
              d="M120 110V90a40 40 0 0 1 80 0v20"
              stroke="var(--primary-dark)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M100 150h120" stroke="var(--surface)" strokeWidth="4" opacity="0.5" />
            <path d="M100 190h120" stroke="var(--surface)" strokeWidth="4" opacity="0.3" />
          </svg>
          <div className="login-art__chip login-art__chip--top">🔒 Secure checkout</div>
          <div className="login-art__chip login-art__chip--bottom">🚚 Fast delivery</div>
        </div>
        <div className="login-form-wrap">
          <div className="login-form-card">
            <h1 className="login-form__title">Welcome Back 👋</h1>
            <p className="login-form__subtitle">Login to continue shopping</p>
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <label className="field">
                <span className="field__label">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />
              </label>

              <label className="field">
                <span className="field__label">Password</span>
                <div className="field__control">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    required
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="field__toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M6.5 6.7C4.3 8.1 2.7 10 2 12c1.6 4.2 5.6 7 10 7 1.7 0 3.3-.4 4.7-1.1M9.9 5.1A10.7 10.7 0 0112 5c4.4 0 8.4 2.8 10 7-.5 1.2-1.2 2.4-2.1 3.4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M2 12c1.6-4.2 5.6-7 10-7s8.4 2.8 10 7c-1.6 4.2-5.6 7-10 7s-8.4-2.8-10-7z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>
              <button type="button" className="login-form__forgot">
                Forgot Password?
              </button>
              <button  type="submit" className="btn btn--solid login-form__submit" disabled={submitting}>
                {submitting ? "Logging in..." : "Log In"}
              </button>
            </form>
            <p className="login-form__footer">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login