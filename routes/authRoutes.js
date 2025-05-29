const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/User");

// POST /register
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password || password.length < 6)
      return res.status(400).json({ message: "Invalid input" });
  
    const exists = users.find((u) => u.email === email);
    if (exists) return res.status(400).json({ message: "User exists" });
  
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword, preferences: {}, read: [], favorites: [] });
    res.status(201).json({ message: "User registered" });
  });
  
  // POST /login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  });
  
  module.exports = router;