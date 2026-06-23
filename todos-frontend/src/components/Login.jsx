import { useState } from 'react'
import Navbar from './Navbar.jsx'
import { loginUser } from '../api.js'

export default function Login({ onLogin, onGoRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const token = await loginUser(email, password)
      onLogin(token)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <Navbar token={null} />
      <div className="container mt-5" style={{ maxWidth: 400 }}>
        <h2 className="mb-4 text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
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
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          No account?{' '}
          <span
            onClick={onGoRegister}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register
          </span>
        </p>
      </div>
    </>
  )
}