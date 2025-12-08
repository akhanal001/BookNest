"use strict";

const express = require("express");
const router = express.Router();

const favoritesController = require("../controllers/favoritesController");
const auth = require("../middleware/auth");

router.post("/add" ,auth, favoritesController.addFavorite);
router.get("/user",auth, favoritesController.getFavorites);
router.delete("/remove/:id", auth, favoritesController.removeFavorite);
router.put("/status/:id", auth, favoritesController.updateStatus);




module.exports = router;
