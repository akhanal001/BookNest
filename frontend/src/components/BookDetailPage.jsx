import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch(`http://localhost:3000/api/books/details/${id}`);
      const data = await res.json();
      setBook(data);
    }
    fetchDetails();
  }, [id]);

  if (!book) return <h2>Loading...</h2>;

  return (
    <div>
      <Navbar />

      <div className="detail-container">
        <img
          className="detail-image"
          src={book.thumbnail}
          alt={book.title}
        />

        <div className="detail-info">
          <h1>{book.title}</h1>
          <h3>{book.authors?.join(", ")}</h3>

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
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
