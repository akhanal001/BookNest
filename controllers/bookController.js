// controllers/bookController.js
"use strict";
const axios = require("axios");

async function searchBooks(req, res) {
  const query = req.query.q; // /api/books/search?q=harry+potter

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Missing search query ?q=" });
  }

  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: query,
        key: apiKey,
        maxResults: 20, // Limit results
      },
    });

    const books = (response.data.items || [])
      .filter(item => {
        const info = item.volumeInfo || {};
        const access = item.accessInfo || {};


        if (access.pdf?.isAvailable) return false;


        if (info.printType && info.printType !== "BOOK") return false;


        if (!info.imageLinks) return false;

        const thumb = info.imageLinks.thumbnail || "";


        const isPagePreview =
          thumb.includes("pg=PP") ||
          thumb.includes("pg=PR");
        if (isPagePreview) return false;


        return true;
      })
      .map(item => {
        const info = item.volumeInfo || {};
        const imageLinks = info.imageLinks || {};

        let thumbnail =
          imageLinks.thumbnail ||
          imageLinks.smallThumbnail ||
          "";

        return {
          id: item.id,
          title: info.title || "No title",
          authors: info.authors || [],
          publishedDate: info.publishedDate || "",
          description: info.description || "",
          thumbnail,
          pageCount: info.pageCount || null,
          categories: info.categories || [],
        };
      });

    res.json(books);
  } catch (err) {
    console.error("Google Books API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch books from Google Books" });
  }
}

async function getBookDetails(req, res) {
  const bookId = req.params.id;

  try {
    // let response;
    let info;
    if (isNaN(bookId)) {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      info = response.data.volumeInfo || {};
    }
      
    else {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${bookId}`
      );
      if (!response.data.items || response.data.items.length === 0) {
        return res.status(404).json({ error: "Book details not found" });
      }
      info = response.data.items[0].volumeInfo || {};
    }

    const book = {
      id: bookId,
      title: info.title || "No title",
      authors: info.authors || [],
      publishedDate: info.publishedDate,
      description: info.description || "No description available.",
      pageCount: info.pageCount,
      categories: info.categories || [],
      thumbnail: info.imageLinks?.thumbnail ||
      info.imageLinks?.smallThumbnail ||
      "/placeholder-book.png",
      previewLink: info.previewLink || null,
      publisher: info.publisher || "Unknown"
    };

    res.json(book);
  } catch (err) {
    console.error("Book details error:", err.message);
    res.status(500).json({ error: "Failed to fetch book details" });
  }
}


async function getNYTBooks(req, res) {
  const apiKey = process.env.NYT_API_KEY;

  try {
    const response = await axios.get(
      "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json",
      { params: { "api-key": apiKey } }
    );

    const books = response.data.results.books.map(b => ({
      id: b.primary_isbn10 || b.primary_isbn13 || b.title,
      title: b.title,
      authors: [b.author],
      rank: b.rank,
      thumbnail: b.book_image,
      category: response.data.results.list_name 
    }));

    res.json(books);
  } catch (err) {
    console.error("NYT Error:", err.message);
    res.status(500).json({ error: "Failed to fetch NYT books" });
  }
}


module.exports = {
  searchBooks, getBookDetails, getNYTBooks
};
