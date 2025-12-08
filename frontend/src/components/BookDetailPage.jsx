import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { addToFavorites } from "./favorites";


function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch(`/api/books/details/${id}`);
      const data = await res.json();
      setBook(data);
    }
    fetchDetails();
  }, [id]);

  if (!book) return <h2>Loading...</h2>;

  return (
    <div>
      <Navbar />

        <Link to="/" className="nav-link">
          <button>Back to HomePage</button></Link>
      <div className="detail-container">
        <img
          className="detail-image"
          src={book.thumbnail}
          alt={book.title}
        />

        <div className="detail-info">
          <h1>{book.title}</h1>
          <h3>By {book.authors?.join(", ")}</h3>
          
          <p><strong>Published:</strong> {book.publishedDate}</p>
          <p><strong>Pages:</strong> {book.pageCount}</p>
          <p><strong>Categories:</strong> {book.categories?.join(", ")}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>

          <p className="description">{book.description}</p>

          {book.previewLink && (
            <a className="preview-btn" href={book.previewLink} target="_blank">
              Preview on Google Books
            </a>
          )}
          <button className="fav-btn" onClick={() => addToFavorites(book)}>
              Add to Favorites
                </button>

        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
