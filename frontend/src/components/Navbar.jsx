import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query); 
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="BookNest Logo" className="logo-image" />

      <form className="search-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Link to="/favorites" className="nav-link">
        <button>Favorites</button></Link>
    </nav>
  );
}

export default Navbar;
