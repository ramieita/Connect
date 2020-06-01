const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifytoken = require("../verification/verifytoken");
const key = require("../config/keys");

const ObjectId = require('mongodb').ObjectID;
const User = require("../modal/User");
const Post = require('../modal/Post')

/***** Posts *****/

//create post
router.post('/', (req, res) => {
    
})

//get all posts from one topic
router.get('/', (req, res) => {

})

//get one post
router.get('/:postId', (req, res) => {

})

//update one post
router.put('/:postId', (req, res) => {

})

//delete post (or update to 'Deleted')
router.put('/:postId', (req, res) => {

})

module.exports = router;
