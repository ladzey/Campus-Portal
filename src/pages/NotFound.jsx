import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <div className="card" style={{ textAlign: 'center', maxWidth: 420 }}>
        <h1 className="page-title">404 — Page not found</h1>
        <p className="page-subtitle">
          The page you are looking for does not exist.
        </p>
        <Link to="/dashboard" className="btn btn--primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound
