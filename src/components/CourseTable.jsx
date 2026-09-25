function CourseTable({ courses }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Course</th>
            <th>Credits</th>
            <th>Term</th>
            <th>Instructor</th>
            <th>Seats</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>
                <span className="table__strong">{course.code}</span>
              </td>
              <td>{course.title}</td>
              <td>{course.credits}</td>
              <td>{course.term}</td>
              <td>{course.instructor}</td>
              <td>{course.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CourseTable
