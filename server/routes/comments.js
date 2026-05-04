const express = require("express");
const router = express.Router();
const fs = require("fs");

const COMMENTS_FILE = "comments.json";

function readComments() {
    try {
        const data = fs.readFileSync(COMMENTS_FILE, "utf8");
        return data.split("\n").filter(l => l.trim()).map(l => JSON.parse(l));
    } catch {
        return [];
    }
}

// GET all comments for a recipe
router.get("/:recipeId", (req, res) => {
    const all = readComments();
    const filtered = all.filter(c => c.recipeId === req.params.recipeId);
    res.json(filtered);
});

// POST a new comment - pulls username from session
router.post("/", express.json(), (req, res) => {
    const username = req.session.userName;
    if (!username) return res.status(401).json({ error: "Not logged in" });

    const { recipeId, body, rating } = req.body;

    if (!recipeId || !body || !rating) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const ratingNum = parseInt(rating);
    if (ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({ error: "Rating must be 1-5" });
    }

    const comment = {
        id: Math.random().toString(36).substring(2, 10),
        recipeId,
        username,
        body,
        rating: ratingNum,
        timestamp: new Date().toISOString()
    };

    fs.appendFileSync(COMMENTS_FILE, JSON.stringify(comment) + "\n");
    res.json({ success: true, comment });
});

// DELETE - pulls username from session
router.delete("/:id", express.json(), (req, res) => {
    const username = req.session.userName;
    if (!username) return res.status(401).json({ error: "Not logged in" });

    const all = readComments();
    const target = all.find(c => c.id === req.params.id);

    if (!target) return res.status(404).json({ error: "Not found" });
    if (target.username !== username) return res.status(403).json({ error: "Not your comment" });

    const updated = all.filter(c => c.id !== req.params.id);
    fs.writeFileSync(COMMENTS_FILE, updated.map(c => JSON.stringify(c)).join("\n") + (updated.length ? "\n" : ""));
    res.json({ success: true });
});

module.exports = router;
