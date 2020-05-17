const mysql = require('mysql');

let connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'videoapp'
});

module.exports = connection;