const express = require("express");
const router = express.Router();
const fs = require("fs");


router.post("/create", express.urlencoded({ extended: true }), (req, res) => {
    const prepTime = parseInt(req.body.prepTime) || 0;
    const cookTime = parseInt(req.body.cookTime) || 0;
    const recipe = {
        title: req.body.title,
        prepTime: prepTime,
        cookTime: cookTime,
        totalTime: prepTime + cookTime,
        servings: req.body.servings,
        ingredients: req.body.ingredients.split("\n").map(i => i.trim()).filter(i => i.length > 0),
        instructions: req.body.instructions,
        image: req.body.image || "https://png.pngtree.com/png-vector/20260114/ourlarge/pngtree-chef-hat-in-cartoon-style-isolated-vector-png-image_18494610.webp",
        username: req.body.username || "anonymous",
        id: Math.random().toString(36).substring(2, 10)
    };

    fs.appendFileSync("recipes.json", JSON.stringify(recipe) + "\n");

    res.redirect("/recipes.html");
});


router.get("/", (req, res) => {
    try {
        const data = fs.readFileSync("recipes.json", "utf8");

        const recipes = data
            .split("\n")
            .filter(line => line)
            .map(line => JSON.parse(line));

        res.json(recipes);
    } catch {
        res.json([]);
    }
});

module.exports = router;