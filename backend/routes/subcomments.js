const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifytoken = require("../verification/verifytoken");
const key = require("../config/keys");

const ObjectId = require("mongodb").ObjectID;
const User = require("../modal/User");
const Comment = require("../modal/Comment");
const Subcomment = require("../modal/Subcomment");

/***** Subcomments *****/

//create reply comment
router.post("/", (req, res) => {
    jwt.verify(req.token, key.secretKey, (err, auth) => {
      if (err) {
        res.status(403).json({
          message: "Access Forbidden",
        });
      } else {
        var commentId = req.headers.referer.split("/")[8];
        if (ObjectId.isValid(commentId)) {
          //var topicId = req.body.Topic.id
          Comment.findOne({ _id: commentId }).then((comment) => {
            if (comment != null) {
              let newReply = new Subcomment({
                comment: ObjectId(commentId),
                replyContent: req.body.replyContent,
                replyedBy: ObjectId(auth.User.id),
                date: req.body.date,
              });
              newReply.save().then(() => {
                Subcomment.findOne({
                  $and: [
                    { replyContent: req.body.replyContent },
                    { comment: commentId },
                  ],
                }).then((reply) => {
                  Comment.findOneAndUpdate(
                    { _id: commentId },
                    { $push: { subcomments: ObjectId(reply._id) } },
                    { new: true, safe: true }
                  ).then(() => {
                    res.status(201).json({
                      message: "Reply created successfully",
                      replyedBy: ObjectId(auth.User.id),
                      commentId: ObjectId(commentId),
                      replyContent: reply.replyContent,
                      date: reply.date,
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

  module.exports = router;
