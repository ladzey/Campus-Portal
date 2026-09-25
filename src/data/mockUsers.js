// Hardcoded users for the simulated login (no backend, no real auth).
// Each user has a username, password, and role: "administrator" or "client".
export const mockUsers = [
  {
    id: 'u1',
    username: 'admin',
    password: 'admin123',
    role: 'administrator',
    name: 'Dr. Sarah Wijaya',
    email: 'sarah.wijaya@campus.edu',
    title: 'Head of Academic Affairs',
  },
  {
    id: 'u2',
    username: 'student',
    password: 'student123',
    role: 'client',
    name: 'Andi Pratama',
    email: 'andi.pratama@student.campus.edu',
    studentId: 'CS2023001',
    program: 'Computer Science',
  },
  {
    id: 'u3',
    username: 'bella',
    password: 'student123',
    role: 'client',
    name: 'Bella Kusuma',
    email: 'bella.kusuma@student.campus.edu',
    studentId: 'CS2023002',
    program: 'Computer Science',
  },
]
