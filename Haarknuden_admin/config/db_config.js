module.exports = function(app) {

const mysql = require('mysql');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'haarknuden'
});

connection.connect();

global.db = connection;

};
