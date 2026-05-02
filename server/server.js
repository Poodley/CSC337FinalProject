const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/recipes", require("./routes/recipes.js"));
app.use("/api/comments", require("./routes/module3.js"));
app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "../public", "recipes.html")); });
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
