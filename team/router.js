const express = require('express')
const Team = require ('./model')
const {Router} = express
const router = new Router()
router.get('/team',(request,response,next)=>
{
    Team.findAll()
    .then(teams => response.send(teams))
    .catch(err => next(err))
}
)

module.exports = router