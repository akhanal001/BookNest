"use strict";
const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
router.get("/users", bookController.fetchAllusers);
module.exports = router;