const Sequelize = require('sequelize');
//const databaseUrl = 'postgres://postgres:secret@localhost:5432/postgres'
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres';
const db = new Sequelize(databaseUrl);
db.sync()//{ force: true }
.then(() => console.log('logs a message confirming the database schema has been updated.'))
.catch(console.error)

module.exports = db ;