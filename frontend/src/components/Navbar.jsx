import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); // redirect back to login
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.username);
      setIsLoggedIn(true);
    } catch (err) {
      console.log("Invalid token");
    }
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" onClick={() => onSearch && onSearch("")}>
        <img src={logo} alt="BookNest Logo" className="logo-image" />
      </Link>

      <div className="nav-center">

        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className='search-btn' type="submit" >Search</button>
        </form>
      </div>
      <div className="nav-right">

        {isLoggedIn && (
          <div className="profile-container">
            <span className="profile-name">
              Hello, {username}  ▼
            </span>

            <div className="profile-dropdown">
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/favorites" className="nav-link"> Favorites </Link>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="nav-link">
              <button>Login</button>
            </Link>

            <Link to="/signup" className="nav-link">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

  export default Navbar;
