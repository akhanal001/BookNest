const pool = require("../models/db");

class UserModel {
  static async createUser(username, email, hashedPassword,favorite_category) {
    // Insert the fav catogorty into the database while user signup select them
    const query = `
      INSERT INTO users (username, email, password, favorite_category) 
      VALUES ($1, $2, $3,$4)
      RETURNING id, username, email, favorite_category;
    `;

    const params = [username, email, hashedPassword,favorite_category];
    const result = await pool.query(query, params);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  }

static async getUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

static async updateUser(id, data) {
  const query = `
    UPDATE users
    SET username = $1,
        email = $2,
        favorite_category = $3
    WHERE id = $4
    RETURNING *;
  `;

  const values = [
    data.username,
    data.email,
    data.favorite_category,
    id
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
  }
}


module.exports = UserModel;

