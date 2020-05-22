const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifytoken = require("../verification/verifytoken");
const key = require("../config/keys");

const ObjectId = require('mongodb').ObjectID;
const User = require("../modal/User");
const Post = require('../modal/Post')

/***** Post *****/

//create post
router.post('/', (req, res) => {
    
})

//get all posts
router.get('/', (req, res) => {

})

//get one post
router.get('/:postId', (req, res) => {

})

//update post
router.put('/:postId', (req, res) => {

})

//delete post
router.get('/:postId', (req, res) => {

})

module.exports = router;
