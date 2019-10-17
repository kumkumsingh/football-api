const express = require('express')
const {Router} = express
const Player = require('./model')
const Team = require('../team/model')

const router = new Router()
router.get('/player',(request,response,next) => {
    Player.findAll()
    .then(players => response.send(players))
    .catch(err =>next(err))
})
router.post('/player',(request,response,next) =>{
    Player.create(request.body)
    .then(data => response.json(data))
    .catch(err =>next(err))
})
router.get('/player/:id',(request,response,next) =>{
    Player.findByPk(request.params.id,{ include: [Team] })
    .then(player =>response.json(player))
    .catch(err =>next(err))

})
module.exports = router