import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  return (
    <nav className="navbar">
      <img src={logo} alt="BookNest Logo" className="logo-image" />

      <div className="nav-center">

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button  className='search-btn' type="submit" >Search</button>
      </form>
      </div>
      <div className="nav-right">
      {isLoggedIn ? (
        <>
          <Link to="/favorites" className="nav-link">
            <button>Favorites</button>
          </Link>

          <button className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
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
