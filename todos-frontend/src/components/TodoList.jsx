export default function TodoList({ todos, users, loading, onDelete, onToggle, onRefresh }) {
    function getUser(userId) {
      const user = users.find(u => u.id === userId)
      if (!user) return { label: 'No account found', error: true }
      return { label: `${user.username} (ID #${userId})`, error: false }
    }
  
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
          <p className="mt-2">Loading todos...</p>
        </div>
      )
    }
  
    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Todos ({todos.length})</h5>
          <button className="btn btn-styled btn-sm" onClick={onRefresh}>
            Refresh
          </button>
        </div>
  
        {todos.length === 0 && (
          <p className="text-center">No todos yet. Create one above!</p>
        )}
  
        <ul className="list-group">
          {todos.map(todo => {
            const user = getUser(todo.userId)
            return (
              <li
                key={todo.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#aaa' : 'inherit' }}>
                    {todo.title}
                  </span>
                  <small className="d-block" style={{ color: user.error ? 'red' : '#888', fontWeight: user.error ? 'bold' : 'normal' }}>
                  {user.error ? 'No account found' : user.label}
                  </small>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className={`btn btn-styled btn-sm ${todo.completed ? 'btn-styled' : 'btn-styled'}`}
                    onClick={() => onToggle(todo)}
                  >
                    {todo.completed ? 'Undo' : 'Done'}
                  </button>
                  <button
                    className="btn btn-sm btn-styled"
                    onClick={() => onDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </>
    )
  }