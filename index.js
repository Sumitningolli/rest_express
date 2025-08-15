const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sample posts
let posts = [
    {
        id: uuidv4(),
        username: "Rahul",
        content:
            "What are some effective ways to stay consistent while learning coding as a beginner?",
    },
    {
        id: uuidv4(),
        username: "Ananya",
        content:
            "Why do some people find it easier to wake up early, and how can night owls change their routine?",
    },
];

// Root redirect
app.get("/", (req, res) => {
    res.redirect("/posts");
});

// List all posts
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

// Form to create new post
app.get("/posts/new", (req, res) => {
    res.render("new");
});

// Create new post
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    posts.push({ id: uuidv4(), username, content });
    res.redirect("/posts");
});

// Show single post
app.get("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === req.params.id);
    res.render("show", { post });
});

// Form to edit post
app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find((p) => p.id === req.params.id);
    res.render("edit", { post });
});

// Update post
app.patch("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === req.params.id);
    if (post) post.content = req.body.content;
    res.redirect("/posts");
});

// Delete post
app.delete("/posts/:id", (req, res) => {
    posts = posts.filter((p) => p.id !== req.params.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
