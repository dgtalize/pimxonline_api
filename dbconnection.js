//---- Database
const mysql = require('mysql');
const config = require('./config');

var connection = mysql.createConnection(config.db);
connection.connect();

module.exports = connection;