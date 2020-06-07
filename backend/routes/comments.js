const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifytoken = require("../verification/verifytoken");
const key = require("../config/keys");

const ObjectId = require("mongodb").ObjectID;
const User = require("../modal/User");
const Post = require("../modal/Post");
const Comment = require("../modal/Comment");

/***** Comments *****/

//create comment
router.post("/", (req, res) => {
  jwt.verify(req.token, key.secretKey, (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      var postId = req.headers.referer.split("/")[6];
      if (ObjectId.isValid(postId)) {
        //var topicId = req.body.Topic.id
        Post.findOne({ _id: postId }).then((post) => {
          if (post != null) {
            let newComment = new Comment({
              post: ObjectId(postId),
              commentContent: req.body.commentContent,
              commentedBy: ObjectId(auth.User.id),
              date: req.body.date,
            });
            newComment.save().then(() => {
              Comment.findOne({
                $and: [
                  { commentContent: req.body.commentContent },
                  { post: postId },
                ],
              }).then((comment) => {
                Post.findOneAndUpdate(
                  { _id: postId },
                  { $push: { comments: ObjectId(comment._id) } },
                  { new: true, safe: true }
                ).then(() => {
                  res.status(201).json({
                    message: "Comment created successfully",
                    commentedBy: ObjectId(auth.User.id),
                    postId: ObjectId(postId),
                    commentContent: comment.commentContent,
                    date: comment.date,
                    success: true,
                  });
                });
              });
            });
          }
        });
      }
    }
  });
});

/*router.post("/", (req, res) => {
  jwt.verify(req.token, key.secretKey, (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      var topicId = req.headers.referer.split("/")[4];
      var postId = req.headers.referer.split("/")[6];

      if (ObjectId.isValid(topicId)) {
        //var topicId = req.body.Topic.id
        Topic.findOne({ _id: topicId }).then((topic) => {
          if (topic != null) {
            Post.findOne({ _id: postId }).then((post) => {
              if (post != null) {
                let newComment = new Comment({
                  post: ObjectId(postId),
                  commentContent: req.body.commentContent,
                  commentedBy: ObjectId(auth.User.id),
                  date: req.body.date,
                });
                newComment.save().then(() => {
                  Comment.findOne({
                    $and: [
                      { commentContent: req.body.commentContent },
                      { post: postId },
                    ],
                  }).then((comment) => {
                    Post.findOneAndUpdate(
                      { _id: postId },
                      { $push: { comment: ObjectId(comment._id) } },
                      { new: true, safe: true }
                    ).then(() => {
                      res.status(201).json({
                        message: "Comment created successfully",
                        commentedBy: ObjectId(auth.User.id),
                        postId: ObjectId(postId),
                        commentContent: comment.commentContent,
                        date: comment.date,
                        success: true,
                      });
                    });
                  });
                });
              }
            });
          }
        });
      }
    }
  });
});*/

router.get("/", (req, res) => {
  jwt.verify(req.token, key.secretKey, (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      Comment.find()
        .then((comments) => {
          if (!comments) {
            return res.sendStatus(400).end();
          }
          res.json({
            comments: comments,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

module.exports = router;
