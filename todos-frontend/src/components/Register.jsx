import { useState } from 'react'
import Navbar from './Navbar.jsx'
import { registerUser } from '../api.js'

export default function Register({ onGoLogin }) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    try {
      await registerUser(email, username, password)
      setSuccess('Registered successfully! Redirecting to login...')
      setTimeout(() => onGoLogin(), 1500)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <Navbar token={null} />
      <div className="container mt-5" style={{ maxWidth: 400 }}>
        <h2 className="mb-4 text-center">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{' '}
          <span
            onClick={onGoLogin}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Login
          </span>
        </p>
      </div>
    </>
  )
}