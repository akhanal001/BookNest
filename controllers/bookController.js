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

    const items = response.data.items || [];


    const books = items.map((item) => {
      const info = item.volumeInfo || {};
      const imageLinks = info.imageLinks || {};

      return {
        id: item.id,
        title: info.title || "No title",
        authors: info.authors || [],
        publishedDate: info.publishedDate || "",
        description: info.description || "",
        thumbnail: imageLinks.thumbnail || imageLinks.smallThumbnail || "",
        pageCount: info.pageCount || null,
      };
    });

    res.json(books);
  } catch (err) {
    console.error("Google Books API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch books from Google Books" });
  }
}

module.exports = {
  searchBooks,
};
