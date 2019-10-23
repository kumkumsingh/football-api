const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const teamRouter = require('./team/router')
const playerRouter = require('./player/router')
const db = require('./db')
const Team = require('./team/model')
const Player = require('./player/model')
const authRouter = require('./auth/authrouter')
const userRouter = require('./user/router')

const app = express()
const middlewarecors = cors()
const port = process.env.PORT || 4000


const jsonParser = bodyParser.json()
app
    .use(middlewarecors)
    .use(jsonParser)
    .use(userRouter)
    .use(teamRouter)
    .use(playerRouter)
    .use(authRouter)
    .listen(port, () => console.log(`listen to my port ${port}`))

db
    .sync({ force: true })//
    .then(() => {
        console.log('logs a message confirming the database schema has been updated.')
        const teamNames = ['Egel', 'Das', 'Eagle', 'Pinguin']
        const teams = teamNames.map(teamName => Team.create({ name: teamName }))
        return Promise.all(teams)
    })
    
    .then(() => {
        const players = [
            { name: 'Mimi', number: 4, teamId: 1 },
            { name: 'Wouter', number: 1, teamId: 2 },
            { name: 'David', number: 9, teamId: 3 },
            { name: 'Bram', number: 8, teamId: 4 },
            { name: 'Lisa', number: 10, teamId: 1 },
            { name: 'Miloud', number: 2, teamId: 2 },
            { name: 'Violeta', number: 3, teamId: 3 },
            { name: 'Johan', number: 5, teamId: 4 },
            { name: 'Danny', number: 6, teamId: 3 },
            { name: 'Rembert', number: 7, teamId: 2 },
            { name: 'Kelley', number: 10, teamId: 1 },
            { name: 'Jeroen', number: 12, teamId: 4 },
            { name: 'Rein', number: 11, teamId: 2 },
        ]

        const playerPromises = players.map((player) => Player.create(player))
        return Promise.all(playerPromises)
    })
    .catch(console.error)
