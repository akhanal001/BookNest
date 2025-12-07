"use strict";
const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
router.get("/search", bookController.searchBooks);
router.get("/nyt/top", bookController.getNYTBooks);
router.get("/details/:id", bookController.getBookDetails);


module.exports = router;