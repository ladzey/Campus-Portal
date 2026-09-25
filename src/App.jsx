import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CourseForm from './pages/CourseForm'
import NotFound from './pages/NotFound'
import { mockCourses } from './data/mockCourses'
import { mockRegistrations } from './data/mockRegistrations'

function App() {
  // In-memory only: the logged-in user lives here, not in localStorage.
  const [currentUser, setCurrentUser] = useState(null)

  // Shared data so the form page and the dashboard stay in sync.
  const [courses, setCourses] = useState(mockCourses)
  const [registrations, setRegistrations] = useState(mockRegistrations)

  function addCourse(course) {
    setCourses((previous) => [...previous, course])
  }

  function addRegistration(registration) {
    setRegistrations((previous) => [...previous, registration])
  }

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
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={currentUser}
                courses={courses}
                registrations={registrations}
              />
            }
          />
          <Route
            path="/courses"
            element={
              <CourseForm
                user={currentUser}
                courses={courses}
                registrations={registrations}
                onAddCourse={addCourse}
                onAddRegistration={addRegistration}
              />
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
