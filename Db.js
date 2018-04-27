var mysql = require('mysql');

var db = {};

db.query = function sqlback(sqlstr, callback) {
	var conn = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'123456',
		database:'zjgame',
		port:3306
	});
	
	conn.connect(function(err){
		if(err) {
			console.log(err);
			return;
		}
	});
	
	var sql = sqlstr;
	if(!sql) return;
	
	conn.query(sql, function(err, rows, fields){
		if(err) {
			console.log(err);
			return;
		}
		callback(rows, fields);
	});
	
	conn.end(function(err){
		if(err) {
			return;
		}else {
			 
		}
	});
};

module.exports = db;