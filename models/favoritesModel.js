const pool = require("../models/db");


  
// POST Request addtofavorite
async function addFavorite(data) {

  const checkQuery = `
  SELECT * FROM books
  WHERE user_id = $1 AND title = $2
`;
  const check = await pool.query(checkQuery, [data.user_id, data.title]);

  if (check.rows.length > 0) {
    throw new Error("Book already in favorites");
  }
   
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
  data.category || "Unknown"  

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

async function deleteFavorite(id, user_id) {
  const query = `
    DELETE FROM books 
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [id, user_id]);
  return result.rows[0];
}
async function updateStatus(id, user_id, status) {
  const query = `
    UPDATE books
    SET status = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *;
  `;

  const result = await pool.query(query, [status, id, user_id]);
  return result.rows[0];
}

module.exports = {
  addFavorite,
  getFavorites,
  deleteFavorite,
  updateStatus
};
