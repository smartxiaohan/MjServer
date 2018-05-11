var mysql = require('mysql');

var db = {};

/*
////////////// tb_user start /////////////////
CREATE TABLE `tb_user` (
  `uid` int(11) NOT NULL DEFAULT '0',
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `createtime` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
 
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`uid`);
  ////////////// tb_user end /////////////////
  
*/

db.query = function sqlback(sqlstr, callback) {
	var conn = mysql.createConnection({
		host:'43.226.44.154',
		user:'mysql180510bb9f',
		password:'bb9f7da7Me',
		database:'mysql180510bb9f_db',
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

		if(callback)
		{
			callback(rows, fields);
		}
	});
	
	conn.end(function(err){
		if(err) {
			return;
		}else {
			 
		}
	});
};

module.exports = db;