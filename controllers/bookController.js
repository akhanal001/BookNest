// controllers/bookController.js
"use strict";

const models = require("../models/bookModels");

async function fetchAllusers(req, res) {
    try {
        const result = await models.getAllUsers();
        res.json(result);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { 
    fetchAllusers
};
