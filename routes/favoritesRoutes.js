"use strict";

const express = require("express");
const router = express.Router();

const favoritesController = require("../controllers/favoritesController");

router.post("/add", favoritesController.addFavorite);
router.get("/user/:user_id", favoritesController.getFavorites);

module.exports = router;
