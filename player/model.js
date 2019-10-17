const Sequelize = require('sequelize')
const Team = require('../team/model')
const db = require('../db')
const Player = db.define('player',{name:{type:Sequelize.STRING},number:{type:Sequelize.INTEGER}})
Player.belongsTo(Team)

module.exports = Player