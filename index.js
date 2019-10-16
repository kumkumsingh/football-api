const express = require('express');
const model = require('./team/model');
const db = require('./db');
const app = express()
const port = process.env.PORT || 4000

app.listen(port,() => console.log(`listen to my port ${port}`))