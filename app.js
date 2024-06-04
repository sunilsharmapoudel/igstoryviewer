const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;
const path = require("path");
const favicon = require("favicons")

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static('public'));

app.get("/", (req, res) => {
    const username = req.query.username;
    res.render("index", {
        name : username,
    })
})

app.post("/", (req, res) => {
    const username = req.body.username;
    res.redirect(`/?username=${username}`);
})

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})