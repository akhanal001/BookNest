const pool = require("../models/db");

// POST Request addtofavorite
async function addFavorite(data) {
    const query = `
  INSERT INTO books (user_id, title, author, cover_url, status, category)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`;

const values = [
  data.user_id,
  data.title,
  data.author,    
  data.thumbnail,  
  "To Read",       
  "Unknown"       
];


  const result = await pool.query(query, values);
  return result.rows[0];
}

// GET – get all favorites for one user
async function getFavorites(user_id) {
  const result = await pool.query(
    "SELECT * FROM books WHERE user_id = $1",
    [user_id]
  );
  return result.rows;
}

module.exports = {
  addFavorite,
  getFavorites
};
