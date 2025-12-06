"use strict";

const Favorite = require("../models/favoritesModel");

// POST
async function addFavorite(req, res) {
  try {
    const user_id = req.user.user_id;
    const data = req.body;
    data.user_id = user_id;
    const result = await Favorite.addFavorite(data);
    res.json(result);
  } catch (err) {
    console.error("Add favorite error:", err);
    res.status(500).json({ error: "Cannot add favorite" });
  }
}

// GET
async function getFavorites(req, res) {
  try {
    const user_id = req.user.user_id;
    const result = await Favorite.getFavorites(user_id);
    res.json(result);
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ error: "Cannot fetch favorites" });
  }
}

module.exports = {
  addFavorite,
  getFavorites
};
