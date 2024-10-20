const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname , "public")));


app.listen(8080, () => {
    console.log(`app listening on port 8080`);
});

app.get("/", (req, res) => { 
    res.render("index.ejs", { posts });
});

let posts = [
    {
        id: uuidv4(),
        username: "sanket",
        content: "I am currently pursing my B.Tech degree."
    },
    {
        id: uuidv4(),
        username: "shinde",
        content: "This is post which is written by me"
    },
    {
        id: uuidv4(),
        username: "hello",
        content: "I am currently learning back-end development."
    }
];

app.get("/posts", (req, res) => { 
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});