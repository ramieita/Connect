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

//put comment route
router.put("/:commentId", (req, res) => {
  jwt.verify(req.token, key.secretKey, (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      var commentId = req.params.commentId;
      if (ObjectId.isValid(commentId)) {
        Comment.findOne({ _id: commentId })
          .then((c) => {
            if (c != null) {
              if (permission(c, auth.User.id)) {
                Comment.findOneAndUpdate(
                  { _id: commentId },
                  { commentContent: req.body.commentContent },
                  { new: true, safe: true }
                ).then((updated) => {
                  if (!updated) {
                    res
                      .status(400)
                      .json({
                        message: " comment cannot be updated",
                      })
                      .end();
                  } else {
                    res
                      .status(200)
                      .json({
                        message: " comment is now updated",
                        newComment: updated.commentContent,
                        date: updated.date,
                      })
                      .end();
                  }
                });
              } else {
                res.json({
                  message: "Cannot update! You are not the owner of this comment.",
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });
});

router.delete('/:commentId', (req, res) => {
  //delete comment
  jwt.verify(req.token, key.secretKey, (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access forbidden",
      });
    } else {
      let commentId = req.params.commentId;
      let postId = req.headers.referer.split("/")[6];
      if (ObjectId.isValid(commentId)) {
        Post.findOne({ _id: postId }).then((p) => {
          if (p != null) {
            Post.findOneAndUpdate(
              { _id: postId },
              { $pull: { comments: ObjectId(commentId) } },
              { new: true, safe: true }
            ).then((c) => {
              Comment.findOneAndDelete({ _id: commentId })
                .then(() => {
                    res.status(200).json({
                      message: "Comment Deleted",
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }
        });
      }
    }
  });
})


function permission(comment, authId) {
  if (comment.commentedBy.toString() === authId) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
