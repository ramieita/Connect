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
router.get("/", verifytoken, (req, res) => {
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
router.put("/:topicId", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, auth) => {
    if (err) {
      res.status(403).json({
        message: "Access Forbidden",
      });
    }
    else {
      var topicId = req.params.topicId
      Topic.findOneAndUpdate(
        {_id: topicId},
        { name : req.body.name },
        {new: true, safe: true}
        )
      .then((updated)=>{
        if(!updated){
          res.status(400).json({
            message : " name from the Topic cannot be updated"
          }).end();
        } 
        else{
          res.status(200).json({
            message : " name from the Topic is now updated",
            newName: updated.name,
            date: updated.date
          }).end();
        
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  })
});

//delete topic
router.delete("/:topicId", (req, res) => {});

module.exports = router;
