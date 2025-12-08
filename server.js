"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// GLOBAL CORS CONFIG
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
      origin: "http://localhost:5173",
      methods: "GET,POST,PUT,DELETE",
      credentials: true
    }));
    }
    

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// localhost:3000/api/books/users  --> fetch all users for testing
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const favoriteRoutes = require("./routes/favoritesRoutes");
app.use("/api/favorites", favoriteRoutes);

// Authentication routes 
app.use("/api/auth", require("./routes/authRoutes"));

const frontendPath = path.join(__dirname, "frontend/dist");

app.use(express.static(frontendPath));

app.get('/{*splat}', function (req, res) {
    res.sendFile(path.join(frontendPath, "index.html"));
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});