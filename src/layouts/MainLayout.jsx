import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function MainLayout({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleToggleSidebar() {
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches
    if (isSmallScreen) {
      setMobileOpen((open) => !open)
    } else {
      setCollapsed((value) => !value)
    }
  }

  function closeMobileSidebar() {
    setMobileOpen(false)
  }

  const sidebarClassName = [
    'sidebar',
    collapsed ? 'sidebar--collapsed' : '',
    mobileOpen ? 'sidebar--open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="app-shell">
      <Navbar
        user={user}
        onLogout={onLogout}
        onToggleSidebar={handleToggleSidebar}
      />

      <div className="app-body">
        <Sidebar
          user={user}
          className={sidebarClassName}
          onNavigate={closeMobileSidebar}
        />

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
