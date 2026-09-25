import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CourseForm from './pages/CourseForm'
import NotFound from './pages/NotFound'

function App() {
  // In-memory only: the logged-in user lives here, not in localStorage.
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes live outside MainLayout (no sidebar/navbar) */}
        <Route path="/login" element={<Login onLogin={setCurrentUser} />} />

        {/* Application routes share the MainLayout shell (the menu) */}
        <Route
          element={
            <MainLayout user={currentUser} onLogout={() => setCurrentUser(null)} />
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard user={currentUser} />} />
          <Route path="/courses" element={<CourseForm user={currentUser} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
