import { useState } from 'react'

export default function TodoForm({ onCreate, users = [] }) {
  const [title, setTitle] = useState('')
  const [userId, setUserId] = useState('')
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!title || !userId) {
      setError('Title and user must be filled.')
      return
    }

    if (/[0-9]/.test(title)) {
      setError('Title cannot contain numbers.')
      return
    }

    const userExists = users.find(u => u.id === parseInt(userId))
    if (!userExists) {
      setError('No account found with that User ID.')
      return
    }

    onCreate(title, userId)
    setTitle('')
    setUserId('')
  }

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3">New Todo</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <input
          className="form-control"
          placeholder="Title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <select
          className="form-control"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          style={{ width: 160 }}
        >
          <option value="">Select user...</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username} (#{user.id})
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-styled">Add</button>
      </form>
    </div>
  )
}