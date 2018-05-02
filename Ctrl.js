var Func =  require("./Func.js");
var Global = require('./Global.js');
var Db = require("./Db.js");
var Game = require("./Game.js");
var Ctrl = {};

Ctrl.onLoginReq = function(socket, data) {
	var login_str = data.data;
	var login_data = JSON.parse(login_str);
	var name = login_data.name;
	var self = this;
	self.name = name;

	if(name == "" || name == undefined) return;

	Db.query("select * from tb_user where username='"+name+"'", function(rows, fields){
		var find = false;
 
		for(var row of rows){
			find = true;

			var name = row["username"];
			var password = row["password"];
			var logindata = {"name": name, "password": password};
			var backdata = {"cmd_id":Global.CMD_ID.CMD_ID_LOGIN, "data": JSON.stringify(logindata)};
			socket.sendText(JSON.stringify(backdata));
		}

		if(find == false){
			var sql = "insert into tb_user values('"+self.name+"','777')";
			Db.query(sql, function(){});

			var logindata = {"name": self.name, "password": "777"};
			var backdata = {"cmd_id":Global.CMD_ID.CMD_ID_LOGIN, "data": JSON.stringify(logindata)};
			socket.sendText(JSON.stringify(backdata));
		}
	});
};

Ctrl.onCreateFKRoomReq = function() {
	var roomnum = Func.RandomRoomNum();

	if(roomnum > 0) {
		Game.createRoom(roomnum);
	}
};

module.exports = Ctrl;
