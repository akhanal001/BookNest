import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/favorites/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setFavorites(data)
    }
    loadFavorites();
  }, []);

  async function removeFromFavorites(id) {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/favorites/remove/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setFavorites(favorites.filter((item) => item.id !== id));
    } else {
      alert("Failed to remove favorite");
    }
  }


  return (
    <>
      <Navbar />
      <div>

        <h1 className="welcome"> Your's Favorite Books</h1>
        <Link to="/" className="nav-link">
          <button>Back to HomePage</button></Link>
        <div className="results-container">
          {favorites.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.cover_url} alt={book.title} />
              <h3>{book.title}</h3>
              <p><strong>Author: </strong> {book.author}</p>
              <p><strong>Added on:</strong>
                {new Date(book.added_at).toLocaleDateString()}
              </p>
              <p> <strong>Category: </strong> {book.category}</p>

              <button
                className="remove-btn"
                onClick={() => removeFromFavorites(book.id)}
              >
                Remove
              </button>
            </div>

          ))}
        </div>
      </div>
    </>
  );
}

export default FavoritesPage;
