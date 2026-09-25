import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

function Navbar({ user, onLogout, onToggleSidebar }) {
  const navigate = useNavigate()

  function handleLogout() {
    onLogout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <button
        type="button"
        className="navbar__toggle"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>

      <Link to="/dashboard" className="navbar__brand">
        <img src={logo} alt="" width="32" height="32" />
        <span>Campus Portal</span>
      </Link>

      <div className="navbar__spacer" />

      {user ? (
        <div className="navbar__account">
          <div className="navbar__identity">
            <span className="navbar__name">{user.name}</span>
            <span className="navbar__role">{user.role}</span>
          </div>
          <button type="button" className="btn btn--ghost" onClick={handleLogout}>
            Log out
          </button>
        </div>
      ) : (
        <Link to="/login" className="btn btn--ghost">
          Sign in
        </Link>
      )}
    </header>
  )
}

export default Navbar
