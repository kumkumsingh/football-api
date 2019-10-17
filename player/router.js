const express = require('express')
const {Router} = express
const Player = require('./model')

const router = new Router()
router.get('/player',(request,response,next) => {
    Player.findAll()
    .then(players => response.send(players))
    .catch(err =>next(err))
})
router.post('/player',(request,response,next) =>{
    Player.create()
    .then(data => response.send(data))
    .catch(err =>next(err))
})
module.exports = router