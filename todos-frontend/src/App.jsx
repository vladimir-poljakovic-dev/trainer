import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import TodoList from './components/TodoList.jsx'
import TodoForm from './components/TodoForm.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import { fetchTodos, createTodo, updateTodo, deleteTodo, fetchUsers } from './api.js'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [todos, setTodos] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState('login')

  useEffect(() => {
    if (token) {
      loadTodos()
      loadUsers()
    }
  }, [token])

  async function loadTodos() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTodos(token)
      setTodos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function loadUsers() {
    try {
      const data = await fetchUsers(token)
      console.log('users loaded:', data)
      setUsers(data)
    } catch (err) {
      console.log('users error:', err.message)
      setError(err.message)
    }
  }

  async function handleCreate(title, userId) {
    try {
      await createTodo(token, title, userId)
      loadTodos()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(token, id)
      setTodos(todos.filter(t => t.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleToggle(todo) {
    try {
      await updateTodo(token, todo.id, { completed: !todo.completed })
      loadTodos()
    } catch (err) {
      setError(err.message)
    }
  }

  function handleLogin(newToken) {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  function logout() {
    setToken('')
    localStorage.removeItem('token')
    setTodos([])
    setPage('login')
  }

  if (!token && page === 'login') {
    return <Login onLogin={handleLogin} onGoRegister={() => setPage('register')} />
  }

  if (!token && page === 'register') {
    return <Register onGoLogin={() => setPage('login')} />
  }

  return (
    <>
      <Navbar token={token} onLogout={logout} />
      <div className="container mt-4" style={{ maxWidth: 700 }}>
        <TodoForm onCreate={handleCreate} users={users} />
        {error && (
          <div className="alert alert-danger d-flex justify-content-between">
            {error}
            <button className="btn-close" onClick={() => setError(null)} />
          </div>
        )}
        <TodoList
          todos={todos}
          users={users}
          loading={loading}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onRefresh={loadTodos}
        />
      </div>
    </>
  )
}