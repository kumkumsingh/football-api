const Sequelize = require('sequelize')
const Team = require('../team/model')
const db = require('../db')
const Player = db.define('player',{name:{type:Sequelize.STRING},number:{type:Sequelize.INTEGER}})
Player.belongsTo(Team,{onDelete:'CASCADE'})
Team.hasMany(Player)

module.exports = Player