export default function Navbar({ token, onLogout }) {
    return (
      <nav className="navbar px-4 py-3">
        <span className=" navbar-brand ">TodoApp</span>
        {token && (
          <button className="btn btn-logout btn-sm" onClick={onLogout}>
            Logout
          </button>
        )}
      </nav>
    )
  }