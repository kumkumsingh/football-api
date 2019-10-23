const { toJWT, toData } = require('./jwt')
const express = require('express')
const { Router } = express
const bcrypt = require("bcrypt");
const router = new Router()
const User = require('../user/model')
const authMiddleware= require('./middleware')

router.get('/secret-endpoint', authMiddleware, (req, res) => {
    res.send({
      message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
    })
  })

  router.post("/login", (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: "Please give me some credentials, stranger" });
    }
  
    // Query to find a user by email (unique, right ;) )
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        // we can get null, it was not found
        if (!user) {
          res.status(400).send({
            // message: "User with that email does not exist" ... yeah, but let's not tell people ok?
            message: "Email or password incorrect, sorry"
          });
        }
  
        // 2. use bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(req.body.password, user.password)) {
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: user.id }) 
        // make a token, with userId encrypted inside of it
          });
        } else {
          res.status(400).send({
            // message: "Password was incorrect" ... yeah, but let's not tell people ok?
            message: "Email or password incorrect, sorry"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  });
  

module.exports = router