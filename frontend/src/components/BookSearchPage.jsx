import { useState, useEffect } from "react";
import Navbar from "./Navbar";

function BookSearchPage() {
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    async function handleSearch(query) {
        setHasSearched(true); // this hide welcome + animation
        const res = await fetch(
            `http://localhost:3000/api/books/search?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data);
    }

    async function addToFavorites(book) {
        await fetch("http://localhost:3000/api/favorites/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: 1,
                title: book.title,
                author: book.authors?.join(", "),   
                thumbnail: book.thumbnail         
              })
              
        });

        alert(`${book.title} added to favorites!`);
    }

    const categories = [
        "Harry Potter",
        "The Hobbit",
        "Atomic Habits",
        "The Alchemist",
        "The Great Gatsby",
        "To Kill a Mockingbird"
    ];

    const [text, setText] = useState("");
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookSearchPage;
