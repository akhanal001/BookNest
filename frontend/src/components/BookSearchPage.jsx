import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { addToFavorites } from "./favorites";


function BookSearchPage() {

    const [text, setText] = useState("");
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [topBooks, setTopBooks] = useState([]);


    async function handleSearch(query) {
        setHasSearched(true);
        const res = await fetch(
            `http://localhost:3000/api/books/search?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data);
    }

    const categories = [
        "Harry Potter",
        "The Hobbit",
        "Atomic Habits",
        "The Alchemist",
        "The Great Gatsby",
        "To Kill a Mockingbird"
    ];

    useEffect(() => {
        const current = categories[categoryIndex];

        const interval = setInterval(() => {
            setText(current.slice(0, charIndex + 1));
            setCharIndex((prev) => prev + 1);

            if (charIndex === current.length) {
                clearInterval(interval);

                setTimeout(() => {
                    setCharIndex(0);
                    setCategoryIndex((prev) => (prev + 1) % categories.length);
                }, 1200);
            }
        }, 80);

        return () => clearInterval(interval);
    }, [charIndex, categoryIndex]);

    useEffect(() => {
        async function loadNYTBooks() {
            const res = await fetch("http://localhost:3000/api/books/nyt/top");
            const data = await res.json();
            setTopBooks(data);
        }
        loadNYTBooks();
    }, []);

    return (
        <div>
        
            <Navbar onSearch={handleSearch} />
            {!hasSearched && (
                <>
                    <h1 className="welcome">Welcome to BookNest</h1>
                    <h1 className="search_">Search</h1>
                    <h1 className="search_">{text}</h1>
                </>
            )}
            <div className="results-container">
                {results.map((book) => (
                    <div key={book.id} className="book-card">
                        <img src={book.thumbnail} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p>{book.authors?.join(", ")}</p>
                        <p>{book.publishedDate}</p>
                        <button className="fav-btn" onClick={() => addToFavorites(book)}>
                            Add to Favorites
                        </button>
                        <button className="details-btn">
                            <Link to={`/book/${book.id}`}>View Details</Link>
                        </button>
                    </div>
                ))}
            </div>

            {!hasSearched && (
                <>
                    <h2 className="section-title">Top Books This Week</h2>

                    <div className="results-container">
                        {topBooks.map(book => (
                            <div className="book-card" key={book.id || book.title}>
                                <img src={book.thumbnail} alt={book.title} />
                                <h3>{book.title}</h3>

                                <p>{book.authors?.join(", ")}</p>
                                <p>Rank #{book.rank}</p>

                                <button className="fav-btn" onClick={() => addToFavorites(book)}>
                                    Add to Favorites
                                </button>

                                {book.id && (
                                    <button className="details-btn">
                                        <Link to={`/book/${book.id}`}>View Details</Link>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}




        </div>
    );
}

export default BookSearchPage;
