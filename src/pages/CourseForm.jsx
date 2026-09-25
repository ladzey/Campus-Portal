import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import CourseTable from '../components/CourseTable'
import EmptyState from '../components/EmptyState'

const TERMS = ['2025/2026-1', '2025/2026-2']

const emptyCourseForm = {
  code: '',
  title: '',
  credits: '3',
  term: TERMS[0],
  instructor: '',
  seats: '30',
}

const emptyRegistrationForm = {
  courseId: '',
  term: TERMS[0],
}

function CourseForm({
  user,
  courses,
  registrations,
  onAddCourse,
  onAddRegistration,
}) {
  const [courseForm, setCourseForm] = useState(emptyCourseForm)
  const [registrationForm, setRegistrationForm] = useState(emptyRegistrationForm)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const isAdministrator = user.role === 'administrator'

  function handleCourseChange(event) {
    const { name, value } = event.target
    setCourseForm((previous) => ({ ...previous, [name]: value }))
    setErrors({})
    setSuccessMessage('')
  }

  function handleRegistrationChange(event) {
    const { name, value } = event.target
    setRegistrationForm((previous) => ({ ...previous, [name]: value }))
    setErrors({})
    setSuccessMessage('')
  }

  function validateCourse() {
    const nextErrors = {}
    const code = courseForm.code.trim().toUpperCase()

    if (!code) {
      nextErrors.code = 'Course code is required.'
    } else if (!/^[A-Z]{2,4}\s?\d{3}$/.test(code)) {
      nextErrors.code = 'Use a format like CS101.'
    } else if (courses.some((course) => course.code.toUpperCase() === code)) {
      nextErrors.code = 'A course with this code already exists.'
    }

    if (!courseForm.title.trim()) {
      nextErrors.title = 'Course title is required.'
    }

    const credits = Number(courseForm.credits)
    if (!Number.isInteger(credits) || credits < 1 || credits > 6) {
      nextErrors.credits = 'Credits must be a whole number from 1 to 6.'
    }

    if (!courseForm.instructor.trim()) {
      nextErrors.instructor = 'Instructor name is required.'
    }

    const seats = Number(courseForm.seats)
    if (!Number.isInteger(seats) || seats < 1) {
      nextErrors.seats = 'Seats must be a whole number of at least 1.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function validateRegistration() {
    const nextErrors = {}

    if (!registrationForm.courseId) {
      nextErrors.courseId = 'Please choose a course.'
    } else {
      const course = courses.find((item) => item.id === registrationForm.courseId)
      const isDuplicate = registrations.some(
        (registration) =>
          registration.studentId === user.studentId &&
          registration.courseCode === course.code &&
          registration.term === registrationForm.term,
      )
      if (isDuplicate) {
        nextErrors.courseId = 'You are already registered for this course this term.'
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleCourseSubmit(event) {
    event.preventDefault()
    setSubmitError('')
    setSuccessMessage('')

    if (!validateCourse()) {
      return
    }

    setIsSubmitting(true)
    // Simulated save delay so the loading state is visible.
    setTimeout(() => {
      try {
        const code = courseForm.code.trim().toUpperCase()
        onAddCourse({
          id: `c-${Date.now()}`,
          code,
          title: courseForm.title.trim(),
          credits: Number(courseForm.credits),
          term: courseForm.term,
          instructor: courseForm.instructor.trim(),
          seats: Number(courseForm.seats),
        })
        setSuccessMessage(
          `Course ${code} — ${courseForm.title.trim()} was added successfully.`,
        )
        setCourseForm(emptyCourseForm)
      } catch {
        setSubmitError('Something went wrong while saving the course. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }, 600)
  }

  function handleRegistrationSubmit(event) {
    event.preventDefault()
    setSubmitError('')
    setSuccessMessage('')

    if (!validateRegistration()) {
      return
    }

    setIsSubmitting(true)
    // Simulated save delay so the loading state is visible.
    setTimeout(() => {
      try {
        const course = courses.find(
          (item) => item.id === registrationForm.courseId,
        )
        onAddRegistration({
          id: `r-${Date.now()}`,
          studentId: user.studentId,
          studentName: user.name,
          courseCode: course.code,
          courseTitle: course.title,
          term: registrationForm.term,
          status: 'pending',
        })
        setSuccessMessage(
          `Your request for ${course.code} — ${course.title} was submitted and is pending approval.`,
        )
        setRegistrationForm(emptyRegistrationForm)
      } catch {
        setSubmitError(
          'Something went wrong while submitting your registration. Please try again.',
        )
      } finally {
        setIsSubmitting(false)
      }
    }, 600)
  }

  return (
    <div>
      <h1 className="page-title">
        {isAdministrator ? 'Add Course Offering' : 'Course Registration'}
      </h1>
      <p className="page-subtitle">
        {isAdministrator
          ? 'Create a new course offering for the Computer Science program.'
          : 'Register for an available course this term.'}
      </p>

      {successMessage ? (
        <div className="alert alert--success">{successMessage}</div>
      ) : null}
      {submitError ? <div className="alert alert--error">{submitError}</div> : null}

      {isAdministrator ? (
        <section className="card">
          <form onSubmit={handleCourseSubmit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="code">Course Code</label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={courseForm.code}
                  onChange={handleCourseChange}
                  placeholder="CS101"
                />
                {errors.code ? (
                  <span className="field__error">{errors.code}</span>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="title">Course Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={courseForm.title}
                  onChange={handleCourseChange}
                  placeholder="Introduction to Programming"
                />
                {errors.title ? (
                  <span className="field__error">{errors.title}</span>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="credits">Credits</label>
                <input
                  id="credits"
                  name="credits"
                  type="number"
                  min="1"
                  max="6"
                  value={courseForm.credits}
                  onChange={handleCourseChange}
                />
                {errors.credits ? (
                  <span className="field__error">{errors.credits}</span>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="term">Term</label>
                <select
                  id="term"
                  name="term"
                  value={courseForm.term}
                  onChange={handleCourseChange}
                >
                  {TERMS.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="instructor">Instructor</label>
                <input
                  id="instructor"
                  name="instructor"
                  type="text"
                  value={courseForm.instructor}
                  onChange={handleCourseChange}
                  placeholder="Dr. Maya Lestari"
                />
                {errors.instructor ? (
                  <span className="field__error">{errors.instructor}</span>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="seats">Seats</label>
                <input
                  id="seats"
                  name="seats"
                  type="number"
                  min="1"
                  value={courseForm.seats}
                  onChange={handleCourseChange}
                />
                {errors.seats ? (
                  <span className="field__error">{errors.seats}</span>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving…' : 'Add Course'}
            </button>
          </form>
        </section>
      ) : (
        <section className="card">
          {courses.length === 0 ? (
            <EmptyState
              title="No courses available"
              message="There are no course offerings to register for right now. Please check back later."
            />
          ) : (
            <form onSubmit={handleRegistrationSubmit} noValidate>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="courseId">Course</label>
                  <select
                    id="courseId"
                    name="courseId"
                    value={registrationForm.courseId}
                    onChange={handleRegistrationChange}
                  >
                    <option value="">Select a course…</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.code} — {course.title} ({course.credits} credits)
                      </option>
                    ))}
                  </select>
                  {errors.courseId ? (
                    <span className="field__error">{errors.courseId}</span>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="registrationTerm">Term</label>
                  <select
                    id="registrationTerm"
                    name="term"
                    value={registrationForm.term}
                    onChange={handleRegistrationChange}
                  >
                    {TERMS.map((term) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting…' : 'Submit Registration'}
              </button>
            </form>
          )}
        </section>
      )}

      <section className="card card--spaced">
        <div className="section-head">
          <h2 className="section-head__title">
            {isAdministrator ? 'Current Course Offerings' : 'Available Courses'}
          </h2>
          <span className="section-head__count">{courses.length} courses</span>
        </div>

        {courses.length === 0 ? (
          <EmptyState
            title="No courses yet"
            message="Course offerings will appear here once they are added."
          />
        ) : (
          <CourseTable courses={courses} />
        )}
      </section>
    </div>
  )
}

export default CourseForm
