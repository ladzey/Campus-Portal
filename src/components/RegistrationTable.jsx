import StatusBadge from './StatusBadge'

function RegistrationTable({ registrations, showStudent = false }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {showStudent ? <th>Student</th> : null}
            <th>Course</th>
            <th>Term</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.id}>
              {showStudent ? (
                <td>
                  <span className="table__strong">{registration.studentName}</span>
                  <span className="table__muted">{registration.studentId}</span>
                </td>
              ) : null}
              <td>
                <span className="table__strong">{registration.courseCode}</span>
                <span className="table__muted">{registration.courseTitle}</span>
              </td>
              <td>{registration.term}</td>
              <td>
                <StatusBadge status={registration.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RegistrationTable
