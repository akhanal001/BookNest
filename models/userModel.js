const pool = require("../models/db");

class UserModel {
  static async createUser(username, email, hashedPassword) {
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email;
    `;

    const params = [username, email, hashedPassword];
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
}

module.exports = UserModel;
