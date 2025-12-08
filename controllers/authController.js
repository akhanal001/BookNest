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
        { user_id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ message: "Login successful", token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getMe(req, res) {
    try {
      const user = await UserModel.getUserById(req.user.user_id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Cannot fetch user info" });
    }
  },

  async updateUser(req, res) {
    try {
      const user_id = req.user.user_id;
      const data = req.body;

      const updated = await UserModel.updateUser(user_id, data);

      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Cannot update profile" });
    }
  }
};

module.exports = authController;
