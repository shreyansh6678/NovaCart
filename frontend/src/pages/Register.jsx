import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { useAuth } from "../context/authContext.jsx"
import Navbar from "../components/Navbar/Navbar.jsx"
import "./css/register.css"

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const { fullName, email, password } = formData

    if (!fullName.trim() || !email.trim() || !password) {
      toast.error("Please fill in all the fields to continue.")
      return
    }

    if (password.length < 6) {
      toast.error("Your password should be at least 6 characters long.")
      return
    }

    try {
      setLoading(true)
      await register(formData)
      toast.success("Account created! Redirecting to login...")
      navigate("/login")
    } catch (err) {
      toast.error(err?.message || "Something went wrong while creating your account.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="signup-screen">
      <Navbar/>
      <Toaster position="top-center" />
      <div className="signup-layout">
        <div className="signup-visual">
          <svg viewBox="0 0 320 320" className="signup-visual-svg" aria-hidden="true">
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
          <div className="floating-tag tag-top">🎉 Member perks</div>
          <div className="floating-tag tag-bottom">🚚 Fast delivery</div>
        </div>
        <div className="signup-form-area">
          <div className="signup-box">
            <h1 className="signup-heading">Create Account 🚀</h1>
            <p className="signup-tagline">Join NovaCart and start shopping today.</p>

            <form onSubmit={onSubmit} noValidate>
              <div className="input-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-box">
                  <input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="peek-btn"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? (
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
              </div>

              <button type="submit" className="signup-submit" disabled={loading}>
                {loading ? "Creating account..." : "CREATE ACCOUNT"}
              </button>
            </form>

            <p className="switch-line">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register