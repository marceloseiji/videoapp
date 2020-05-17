const mysql = require('mysql');

let connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'videoapp',
  port: '3308'
});

module.exports = connection;