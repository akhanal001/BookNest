"use strict";
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
  async register(req, res) {
    const { username, email, password, favorite_category } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserModel.createUser(
        username,
        email,
        hashedPassword,
        favorite_category
      );

      res.status(201).json({ message: "User created", user });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Missing fields" });

    try {
      const user = await UserModel.findByEmail(email);

      if (!user)
        return res.status(401).json({ error: "Invalid credentials" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { user_id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ message: "Login successful", token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = authController;
