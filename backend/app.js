const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
const configDB = require("./config/keys");
const verifytoken = require('./verification/verifytoken');

const users = require("./routes/users");
const images = require("./routes/images");
const topics = require("./routes/topics");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const subcomments = require("./routes/subcomments");
//const posts = require("./routes/posts");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(bodyParser.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = configDB.DB;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connection to ${db} successful.`);
  })
  .catch((err) => {
    console.log(`Connection to ${db} failed due to ${err}`);
  });
  app.use('/public', express.static('public'));

app.use('/api', images);
app.use('/api/v1/users', users);
app.use('/api/v1/topic', verifytoken, topics);
app.use('/api/v1/topic/:topicId/post', verifytoken, posts);
app.use('/api/v1/topic/:topicId/post/:postId/comment', verifytoken, comments);
app.use('/api/v1/topic/:topicId/post/:postId/comment/:commentId/subcomment', verifytoken, subcomments);
app.use('/api/v1/posts', verifytoken, posts);
//app.use('/api/v1/topic/:topicId/post', verifytoken, posts);

app.use(function(req, res) {
  res.type('text/plain').status(404).send('404 Page Not Found.');
});


const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(express.static('uploads'));