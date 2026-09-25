import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import StatCard from '../components/StatCard'
import RegistrationTable from '../components/RegistrationTable'
import EmptyState from '../components/EmptyState'
import Spinner from '../components/Spinner'

function Dashboard({ user, courses, registrations }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulated data fetch so the loading state is visible.
    const timer = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const role = user.role

  if (isLoading) {
    return (
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Loading your information…</p>
        <Spinner />
      </div>
    )
  }

  if (role === 'administrator') {
    const totalStudents = new Set(
      registrations.map((registration) => registration.studentId),
    ).size
    const pendingCount = registrations.filter(
      (registration) => registration.status === 'pending',
    ).length

    return (
      <div>
        <div className="welcome">
          <h1 className="welcome__title">Welcome back, {user.name}</h1>
          <p className="welcome__text">
            Here is an overview of course registrations across the Computer
            Science program.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard label="Course Offerings" value={courses.length} />
          <StatCard label="Students" value={totalStudents} />
          <StatCard label="Registrations" value={registrations.length} />
          <StatCard label="Pending Approvals" value={pendingCount} hint="Needs review" />
        </div>

        <section className="card">
          <div className="section-head">
            <h2 className="section-head__title">All Registrations</h2>
            <span className="section-head__count">
              {registrations.length} records
            </span>
          </div>

          {registrations.length === 0 ? (
            <EmptyState
              title="No registrations yet"
              message="Registrations submitted by students will appear here."
            />
          ) : (
            <RegistrationTable registrations={registrations} showStudent />
          )}
        </section>
      </div>
    )
  }

  const myRegistrations = registrations.filter(
    (registration) => registration.studentId === user.studentId,
  )
  const myApproved = myRegistrations.filter(
    (registration) => registration.status === 'approved',
  ).length
  const myPending = myRegistrations.filter(
    (registration) => registration.status === 'pending',
  ).length

  return (
    <div>
      <div className="welcome">
        <h1 className="welcome__title">Welcome back, {user.name}</h1>
        <p className="welcome__text">
          Here is a summary of your course registrations this term.
        </p>
      </div>

      <div className="dashboard-grid">
        <section className="card profile-card">
          <h2 className="section-head__title">My Profile</h2>
          <dl className="profile-list">
            <div>
              <dt>Name</dt>
              <dd>{user.name}</dd>
            </div>
            <div>
              <dt>Student ID</dt>
              <dd>{user.studentId}</dd>
            </div>
            <div>
              <dt>Program</dt>
              <dd>{user.program}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>
                <span className="badge">client</span>
              </dd>
            </div>
          </dl>
        </section>

        <section className="card">
          <div className="section-head">
            <h2 className="section-head__title">My Registrations</h2>
            <span className="section-head__count">
              {myRegistrations.length} records
            </span>
          </div>

          <div className="stats-grid stats-grid--compact">
            <StatCard label="Registered" value={myRegistrations.length} />
            <StatCard label="Approved" value={myApproved} />
            <StatCard label="Pending" value={myPending} />
          </div>

          {myRegistrations.length === 0 ? (
            <EmptyState
              title="No courses registered"
              message="You have not registered for any courses yet. Use the Course Registration page to get started."
            />
          ) : (
            <RegistrationTable registrations={myRegistrations} />
          )}
        </section>
      </div>
    </div>
  )
}

export default Dashboard
