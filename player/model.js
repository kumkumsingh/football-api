const Sequelize = require('sequelize')
const db = require('../db')
const Player = db.define('player',{name:{type:Sequelize.STRING},number:{type:Sequelize.INTEGER}})

module.exports = Player