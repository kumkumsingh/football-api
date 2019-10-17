const express = require('express');
const bodyParser = require('body-parser')
// const model = require('./team/model');
// const db = require('./db');
const model = require('./player/model')
const app = express()
const port = process.env.PORT || 4000

const teamRouter = require('./team/router')
const playerRouter = require('./player/router')

const jsonParser = bodyParser.json()

app.use(jsonParser);
app.use(teamRouter);
app.use(playerRouter)

app.listen(port,() => console.log(`listen to my port ${port}`))