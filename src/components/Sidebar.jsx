import { NavLink } from 'react-router-dom'

const dashboardIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
)

const coursesIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10l1.5 2H18.5A1.5 1.5 0 0 1 20 7.5v10A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5Z" />
    <path d="M12 10.5v6M9 13.5h6" strokeLinecap="round" />
  </svg>
)

function Sidebar({ user, className, onNavigate }) {
  const isAdministrator = user?.role === 'administrator'

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: dashboardIcon },
    {
      to: '/courses',
      label: isAdministrator ? 'Course Offerings' : 'Course Registration',
      icon: coursesIcon,
    },
  ]

  return (
    <aside className={className}>
      <nav className="sidebar__nav" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'sidebar__link active' : 'sidebar__link'
            }
            onClick={onNavigate}
          >
            <span className="sidebar__icon" aria-hidden="true">
              {link.icon}
            </span>
            <span className="sidebar__label">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
