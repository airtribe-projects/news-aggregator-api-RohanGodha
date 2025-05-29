// --- routes/userRoutes.js ---
const express = require("express");
const router = express.Router();
const users = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

// GET /preferences
router.get("/preferences", verifyToken, (req, res) => {
  const user = users.find((u) => u.email === req.user.email);
  res.json(user.preferences || {});
});

// PUT /preferences
router.put("/preferences", verifyToken, (req, res) => {
  const user = users.find((u) => u.email === req.user.email);
  user.preferences = req.body;
  res.json({ message: "Preferences updated" });
});

module.exports = router;