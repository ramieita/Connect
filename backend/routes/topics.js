const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifytoken = require("../verification/verifytoken");
const key = require("../config/keys");

const ObjectId = require('mongodb').ObjectID;
const User = require("../modal/User");
//const Post = require('../modal/Post');
const Module = require('../modal/Module');
const Topic = require('../modal/Topic');

/***** Topic *****/

//create post 
// not tested if it works - modules are needed
router.post('/', (req, res) => {
    jwt.verify(req.token, key.secretKey, (err, auth) => {
        if(err) {
            res.status(403).json({
                "message": "Access Forbidden"
            })
        }
        else {
            let topicList = 0;
            let username = auth.User.username;
            //only admin can create topics
            if(username == 'admin') {
                let newTopic = new Topic({
                    name: req.body.name
                })
                newTopic.save()
                .then(() => {
                    Topic.findOne({$and: [{title: req.body.name}, {module: auth.Module.id}]})
                    .then((topic) => {
                        if(topic != null) {
                            //save topic id in module object
                            Module.findByIdAndUpdate({_id: ObjectId(auth.Module.id)}, {$push: {topic: ObjectId(topic._id)}}, {new: true, save: true})
                            .then(() => {
                                topicList += 1;
                            })
                        }
                        else {
                            res.sendStatus(404);
                        }
                    })
                })
            }
        }
    })
    
})

router.post('/checkTopicTitle', verifytoken, (req, res) => {
    jwt.verify(req.token, key.secretKey, (err, auth) => {
        if(err) {
            res.status(403).json({
                message: "Access Forbidden"
            })
        }
        else {
            Topic.findOne({title: req.body.name})
            .then((topic) => {
                // topic title already exists
                if(topic != null) {
                    res.json({
                        topicAvailable: false
                    })
                }
                //topic title doesn't exist
                else {
                    res.json({
                        topicAvailable: true
                    })
                }
            })
        }
    })
})

//get all topics
router.get('/', (req, res) => {

})

//get one topic
router.get('/:topicId', (req, res) => {

})

//update topic
router.put('/:topicId', (req, res) => {

})

//delete topic
router.delete('/:topicId', (req, res) => {

})

module.exports = router;
