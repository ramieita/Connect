const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifytoken = require("../verification/verifytoken");
const key = require("../config/keys");

const ObjectId = require("mongodb").ObjectID;
const User = require("../modal/User");
const Topic = require("../modal/Topic");

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

router.post("/checkTopicTitle", verifytoken, (req, res) => {
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
router.get("/", (req, res) => {});

//get one topic
router.get("/:topicId", (req, res) => {});

//update topic name
router.put("/:topicId", (req, res) => {});

//delete topic
router.delete("/:topicId", (req, res) => {});

module.exports = router;
