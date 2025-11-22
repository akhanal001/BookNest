"use strict";

require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

// GLOBAL CORS CONFIG
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// Middleware
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// localhost:3000/api/books/users  --> fetch all users for testing
const bookRoutes = require("./routes/bookroute");
app.use("/api/books", bookRoutes);


app.use(express.static("frontend"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});