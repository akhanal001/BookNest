// models/bookModels.js
"use strict";

const pool = require("./db");

async function getAllUsers() {
    const queryText = 'SELECT * FROM users';
    const result = await pool.query(queryText);
    return result.rows;
}

module.exports = { 
    getAllUsers
};
