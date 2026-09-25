const statusClassNames = {
  approved: 'badge badge--approved',
  pending: 'badge badge--pending',
  rejected: 'badge badge--rejected',
}

function StatusBadge({ status }) {
  const className = statusClassNames[status] ?? 'badge'
  return <span className={className}>{status}</span>
}

export default StatusBadge
