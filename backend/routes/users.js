const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../modal/User");
const verifytoken = require("../verification/verifytoken");
const key = require("../config/keys");

/***** User *****/

// Create User
// /signup
router.post("/signup", (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;

  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Password do not match.",
    });
  }
  //check if username already exists
  User.findOne({
    username: username,
  }).then((un) => {
    if (un !== null) {
      return res.status(400).json({
        message: "Username already exists.",
      });
    }
    //check if email already exists
    User.findOne({
      email: email,
    }).then((e) => {
      if (e !== null) {
        return res.status(400).json({
          message: "Email already exists.",
        });
      }
      else {
        //save new User
        let newUser = new User({
          username: username,
          email: email,
          password: password,
        });

        //hash password before saving new user into database
        //source: https://www.npmjs.com/package/bcrypt
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(() => {
              User.findOne({ username: username }).then((user) => {
                /*if (user !== null) {
                  let jwtData = {
                    id: user._id,
                  };*/
                  // sign jsonwebtoken and set token with users' id
                  /*jwt.sign(
                    { User: jwtData },
                    "secretKey",
                    { algorithm: "HS256" },
                    (err, token) => {
                      res.json({
                        token: token,
                      });*/
                      return res.status(201).json({
                        message: "User signed up successfully.",
                        success: true,
                      });
                    //}
                  //);
                //}
              });
            });
          });
        });
      }
    });
  });
});

// /login
router.post("/login", (req, res) => {
  User.findOne({username: req.body.username, email: req.body.email}, (err, user) => {
    if(err) {
      return res.status(500).json({
        message: "Error caused while logging in"
      });
    }
    if(!user) {
      return res.status(401).json({
        message: "User cannont be logged in. Check entered data."
      });
    }
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        message: "Password is wrong. Login not successful."
      })
    }
    else if(user != null) {
      let jwData = {
        id: user._id
      }
      jwt.sign({User: jwData}, "secretkey", {algorithm: "HS256"}, (err, token) => {
        res.status(200).json({
          message: "Logged in successfully.",
          token: token,
          success: true,
          id: user._id
        })
      })
    }
  })
});

router.get('/profile', verifytoken, (req, res) => {
  jwt.verify(req.token, key.secretKey, (err, auth) => {
      if(err) {
          res.status(403).json({
            message: "Access Forbidden"
          }); 
      } 
      else {
          User
          .findOne({_id: auth.User.id})
          .then((userProfile) => {
              res.json({
                  username: userProfile.username,
                  email: userProfile.email
              })
          })
      }
  })
});



module.exports = router;
