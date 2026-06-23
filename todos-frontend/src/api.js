const API = 'http://localhost:3000'

export async function loginUser(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')
  return data.access_token
}

export async function registerUser(email, username, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Register failed')
  return data
}

export async function fetchTodos(token) {
  const res = await fetch(`${API}/todos`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}

export async function createTodo(token, title, userId) {
  const res = await fetch(`${API}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, userId: parseInt(userId), completed: false }),
  })
  if (!res.ok) throw new Error('Failed to create todo')
  return res.json()
}

export async function updateTodo(token, id, data) {
  const res = await fetch(`${API}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update todo')
  return res.json()
}

export async function deleteTodo(token, id) {
  const res = await fetch(`${API}/todos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to delete todo')
}

export async function fetchUsers(token) {
  const res = await fetch(`${API}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}