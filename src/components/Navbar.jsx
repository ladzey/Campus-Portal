import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

function Navbar({ onToggleSidebar }) {
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

      <span className="navbar__user">Guest</span>
    </header>
  )
}

export default Navbar
