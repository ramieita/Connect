const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../modal/User");

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
                if (user !== null) {
                  let jwtData = {
                    id: user._id,
                  };
                  // sign jsonwebtoken and set token with users' id
                  jwt.sign(
                    { User: jwtData },
                    "secretKey",
                    { algorithm: "HS256" },
                    (err, token) => {
                      res.json({
                        token: token,
                      });
                      return res.status(201).json({
                        message: "User signed up successfully.",
                        success: true,
                      });
                    }
                  );
                }
              });
            });
          });
        });
      }
    });
  });
});
// /login
router.post("/login", (req, res) => {});

module.exports = router;
