const express = require('express')
const Team = require('./model')
const { Router } = express
const router = new Router()
const Player = require('../player/model')
router.get('/team', (request, response, next) => {
    Team.findAll()
        .then(teams => {
            // console.log(teams)
            response.json(teams)
        })
        .catch(err => next(err))
}
)

router.post('/team', (request, response, next) => {
    Team.create(request.body)
        .then(data => {
            response.json(data)
            //console.log('cheking my data',data)
        })
        .catch(err => next(err))
})
router.put('/team/:id', (request, response, next) => {
    Team.findByPk(request.params.id)
        .then(team => {
            if (team) {
                return team.update(request.body)
                    .then(team => { response.json(team) })
            }
        })
        .catch(err => next(err))
})
router.get('/team/:id', (request, response, next) => {
    Team.findByPk(request.params.id, { include: [Player] })
        .then(team => response.send(team))
        .catch(err => next(err))

})
router.delete('/team/:id', (request, response, next) => {
    Team.destroy({
        where: {
            id: request.params.id,
        }
    })
        .then(numDeleted => {
            if (numDeleted) {
                response.status(204).end();
            } else {
                response.status(404).end();
            }
        })
        .catch(next);
})

module.exports = router