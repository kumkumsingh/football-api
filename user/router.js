const express = require('express')
const { Router } = express
const router = new Router()
const User = require('./model')
const bcrypt = require('bcrypt')

router.post('/users', (req, res, next) => {
    // console.log('req email',req.body.email)
    // console.log('req password',req.body.password)
    if (req.body.email && req.body.password) {
        User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
            .then(() => res.status(201).send({ message: "user created successfully" }))
            .catch(next)
    }
    else {
        res.send({ message: 'please provide user name and password' })
    }

})

module.exports = router