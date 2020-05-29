const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifytoken = require("../verification/verifytoken");
const key = require("../config/keys");

const ObjectId = require("mongodb").ObjectID;
const User = require("../modal/User");
const Topic = require("../modal/Topic");
const Post = require("../modal/Post");

/***** Topic *****/

//create post
router.post("/", (req, res) => {
  jwt.verify(req.token, key.secretKey, (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      let newTopic = new Topic({
        name: req.body.name,
        owner: ObjectId(auth.User.id),
      });
      newTopic.save().then(() => {
        Topic.findOne({
          $and: [{ name: req.body.name }, { owner: auth.User.id }],
        }).then((topic) => {
          if (topic != null) {
            User.findByIdAndUpdate(
              { _id: ObjectId(auth.User.id) },
              { $push: { Topic: ObjectId(topic._id) } },
              { new: true, safe: true }
            );
            return res.status(201).json({
              message: "Topic created successfully",
              ownerId: ObjectId(auth.User.id),
              topicName: topic.name,
              date: topic.date,
              success: true,
            });
          } else {
            res.status(404).json({
              message: "Could not found any topic.",
              success: false,
            });
          }
        });
      });
    }
  });
});

router.post("/checkTopicTitle", (req, res) => {
  jwt.verify(req.token, key.secretKey, (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      Topic.findOne({ name: req.body.name, owner: auth.User.id }).then(
        (topic) => {
          // topic title already exists
          if (topic != null) {
            res.json({
              topicAvailable: false,
            });
          }
          //topic title doesn't exist
          else {
            res.json({
              topicAvailable: true,
            });
          }
        }
      );
    }
  });
});

//get all topics
router.get("/", (req, res) => {
  jwt.verify(req.token, key.secretKey, (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      Topic.find()
        .then((allTopic) => {
          if (!allTopic) {
            return res.sendStatus(400).end();
          }
          res.send(allTopic);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

//get one topic
router.get("/:topicId", (req, res) => {
  jwt.verify(req.token, "secretkey", (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access forbidden",
      });
    } else {
      var topicId = req.params.topicId;
      // check if topicId is valid
      if (ObjectId.isValid(topicId)) {
        Topic.findOne({ _id: topicId }).then((t) => {
          if (t !== null) {
            var postArr = [];
            //if (postArr.length === t.post.length) {
            res.json({
              posts: postArr,
            });
            //}
            for (var i = 0; i < t.post.length; i++) {
              Post.findOne({ _id: t.post[i] }).then((p) => {
                if (p !== null) {
                  postArr.push({
                    _id: p._id,
                    title: p.title,
                    content: p.content,
                    postedBy: auth.User.id,
                    date: p.date,
                  });
                  if (postArr.length === t.post.length) {
                    res.json({
                      posts: postArr,
                    });
                  }
                }
              });
            }
          } else {
            res.sendStatus(404);
          }
        });
      } else {
        res.sendStatus(404);
      }
    }
  });
});

//update topic name
router.put("/:topicId", (req, res) => {
  jwt.verify(req.token, "secretkey", (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      var topicId = req.params.topicId;
      if (ObjectId.isValid(topicId)) {
        Topic.findOne({ _id: topicId })
          .then((t) => {
            if (t != null) {
              if (permission(t, auth.User.id)) {
                Topic.findOneAndUpdate(
                  { _id: topicId },
                  { name: req.body.name },
                  { new: true, safe: true }
                ).then((updated) => {
                  if (!updated) {
                    res
                      .status(400)
                      .json({
                        message: " name from the Topic cannot be updated",
                      })
                      .end();
                  } else {
                    res
                      .status(200)
                      .json({
                        message: " name from the Topic is now updated",
                        newName: updated.name,
                        date: updated.date,
                      })
                      .end();
                  }
                });
              } else {
                res.json({
                  message:
                    "Cannot update! You are not the owner of this topic.",
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

//delete topic



router.delete("/:topicId", (req, res) => {
  jwt.verify(req.token, "secretkey", (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    } else {
      var topicId = req.params.topicId;
      if (ObjectId.isValid(topicId)) {
        Topic.findOne({ _id: topicId })
          .then((t) => {
            if (t != null) {
              if (permission(t, auth.User.id)) {
                Topic.findOneAndDelete(
                  { _id: topicId }
                ).then((deleted) => {
                  if (!deleted) {
                    res
                      .status(400)
                      .json({
                        message: " error... topic couldnt be deleted",
                      })
                      .end();
                      for(var i=0; i < t.post.length; i++) {
                        var postNum = 0;
                        Post.findOneAndDelete({
                          _id: t.Post[i].toString()
                        }).then(() => {
                          postNum += 1;
                        }).catch((err) => {
                          console.log(err);
                          
                        })
                      }
                  } else {
                    res
                      .status(200)
                      .json({
                        message: " topic is now deleted",
                        posts: deleted.post,
                        date: deleted.date
                      })
                      .end();
                  }
                });
              } else {
                res.json({
                  message:
                    "Cannot delete! You are not the owner of this topic.",
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

function permission(topic, authId) {
  if (topic.owner.toString() === authId) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
