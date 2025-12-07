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

async function removeFavorite(req, res) {
  try {
    const user_id = req.user.user_id;
    const { id } = req.params;

    const removed = await Favorite.deleteFavorite(id, user_id);

    if (!removed) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.json({ message: "Removed from favorites", removed });
  } catch (err) {
    console.error("Remove favorite error:", err);
    res.status(500).json({ error: "Cannot remove favorite" });
  }
}

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite
};
