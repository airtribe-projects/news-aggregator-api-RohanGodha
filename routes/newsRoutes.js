// --- routes/newsRoutes.js ---
const express = require("express");
const router = express.Router();
const axios = require("axios");
const users = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

const cache = new Map(); // Simple in-memory cache

// GET /news
router.get("/", verifyToken, async (req, res, next) => {
    const user = users.find((u) => u.email === req.user.email);
    const { category = "general", language = "en" } = user.preferences || {};
    const cacheKey = `${category}-${language}`;

    if (cache.has(cacheKey)) return res.json(cache.get(cacheKey));

    try {
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
            params: { category, lang: language, token: process.env.NEWS_API_KEY },
        });
        cache.set(cacheKey, response.data.articles);
        res.json(response.data.articles);
    } catch (err) {
        next(err);
    }
});

// POST /news/:id/read
router.post("/:id/read", verifyToken, (req, res) => {
    const user = users.find((u) => u.email === req.user.email);
    user.read.push(req.params.id);
    res.json({ message: "Marked as read" });
});

// POST /news/:id/favorite
router.post("/:id/favorite", verifyToken, (req, res) => {
    const user = users.find((u) => u.email === req.user.email);
    user.favorites.push(req.params.id);
    res.json({ message: "Marked as favorite" });
});

// GET /news/read
router.get("/read", verifyToken, (req, res) => {
    const user = users.find((u) => u.email === req.user.email);
    res.json(user.read);
});

// GET /news/favorites
router.get("/favorites", verifyToken, (req, res) => {
    const user = users.find((u) => u.email === req.user.email);
    res.json(user.favorites);
});

// GET /news/search/:keyword
router.get("/search/:keyword", verifyToken, async (req, res, next) => {
    try {
        const response = await axios.get(`https://gnews.io/api/v4/search`, {
            params: { q: req.params.keyword, token: process.env.NEWS_API_KEY },
        });
        res.json(response.data.articles);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

