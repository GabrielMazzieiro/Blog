const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// DataBase

mongoose.connect(
  "mongodb+srv://admin-gab:Test1234@cluster0.unnxt.mongodb.net/dailyJournalDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Homepage
app.get("/", (req, res) => {
  Post.find({}, function (err, posts) {
    res.render("home", {
      homeContent: homeStartingContent,

      posts: posts,
    });
  });
});

// About
app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

// Contact
app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

// Compose
app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.newPost,
  });

  post.save((err) => {
    if (err) {
      console.log("error");
    } else {
      res.redirect("/");
    }
  });
});

// Posts
app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;

  console.log(requestedPostId);

  Post.findOne({ _id: requestedPostId }, (err, post) => {
    if (!err) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    } else {
      console.log("erro");
    }
  });
});

// Server
app.listen(5500, function () {
  console.log("Server started on port 5500");
});
