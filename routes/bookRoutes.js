"use strict";
const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
router.get("/search", bookController.searchBooks);
module.exports = router;