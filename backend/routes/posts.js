const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifytoken = require("../verification/verifytoken");
const key = require("../config/keys");

const ObjectId = require("mongodb").ObjectID;
const User = require("../modal/User");
const Topic = require("../modal/Topic");
const Post = require("../modal/Post");

/***** Posts *****/

//create post
router.post("/", (req, res) => {
  jwt.verify(req.token, key.secretKey, (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      var topicId = req.headers.referer.split("/")[4];
      if (ObjectId.isValid(topicId)) {
        //var topicId = req.body.Topic.id
        Topic.findOne({ _id: topicId }).then((topic) => {
          if (topic != null) {
            let newPost = new Post({
              topic: ObjectId(topicId),
              title: req.body.title,
              content: req.body.content,
              postedBy: ObjectId(auth.User.id),
              date: req.body.date,
            });
            newPost.save().then(() => {
              Post.findOne({
                $and: [{ title: req.body.title }, { topic: topicId }],
              }).then((post) => {
                  Topic.findOneAndUpdate(
                    { _id: topicId },
                    { $push: { Post: ObjectId(post._id) } },
                    { new: true, safe: true }
                  )
                  .then(() => {
                    res.status(201).json({
                    message: "Post created successfully",
                    postedBy: ObjectId(auth.User.id),
                    topicId: ObjectId(topicId),
                    postTitle: post.title,
                    postContent: post.content,
                    date: post.date,
                    success: true
                  });
                })
              });
            });
          }
        });
      }
    }
  });
});

//get all posts from one topic
router.get("/", (req, res) => {
  jwt.verify(req.token, key.secretKey, (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      Post.find()
        .then((posts) => {
          if (!posts) {
            return res.sendStatus(400).end();
          }
          res.json({
            posts: posts,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

//get one post
router.get("/:postId", (req, res) => {});

//update one post
router.put("/:postId", (req, res) => {});

//delete post (or update to 'Deleted')
router.put("/:postId", (req, res) => {});

function permission(topic, authId) {
  if (topic.owner.toString() === authId) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
