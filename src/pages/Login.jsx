import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { mockUsers } from '../data/mockUsers'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.username.trim()) {
      nextErrors.username = 'Username is required.'
    }
    if (!form.password) {
      nextErrors.password = 'Password is required.'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitError('')

    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    // Simulated network delay so the loading state is visible.
    setTimeout(() => {
      const matchedUser = mockUsers.find(
        (user) =>
          user.username === form.username.trim() &&
          user.password === form.password,
      )

      if (!matchedUser) {
        setSubmitError('Invalid username or password. Please try again.')
        setIsSubmitting(false)
        return
      }

      onLogin(matchedUser)
      navigate('/dashboard')
    }, 600)
  }

  return (
    <div className="auth">
      <aside className="auth__brand">
        <div className="auth__brand-inner">
          <img src={logo} alt="" width="44" height="44" />
          <h1 className="auth__brand-title">Campus Portal</h1>
          <p className="auth__brand-text">
            Manage courses and registrations for the Computer Science program —
            all in one place.
          </p>
        </div>
      </aside>

      <section className="auth__panel">
        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <h2 className="auth__title">Sign in</h2>
          <p className="auth__subtitle">
            Enter your campus credentials to continue.
          </p>

          {submitError ? <div className="alert alert--error">{submitError}</div> : null}

          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. admin or student"
            />
            {errors.username ? (
              <span className="field__error">{errors.username}</span>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
            />
            {errors.password ? (
              <span className="field__error">{errors.password}</span>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--block"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="auth__demo">
            <span className="auth__demo-title">Demo accounts</span>
            <span>
              Administrator — <code>admin</code> / <code>admin123</code>
            </span>
            <span>
              Client (Student) — <code>student</code> / <code>student123</code>
            </span>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login
