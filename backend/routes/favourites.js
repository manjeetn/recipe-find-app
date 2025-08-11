const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");


router.post("/", auth, async (req, res) => {
    const { recipe } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const exists = user.favorites.some((fav) => fav.id === recipe.id);

        if (exists) {
            return res.status(400).json({ message: "Recipe is already in your favorites." });
        } else {
            user.favorites.push(recipe);
            await user.save(); 
            return res.status(201).json(user.favorites);
        }
    } catch (err) {
        console.error("Error saving favorite:", err);
        return res.status(500).json({ message: "Server error. Failed to save favorite." });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch favorites" });
    }
});

module.exports = router;
