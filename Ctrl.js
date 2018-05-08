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
			var uid = row["uid"];
			var logindata = {"name": name, "uid": uid};
			var backdata = {"cmd_id":Global.CMD_ID.CMD_ID_LOGIN, "data": JSON.stringify(logindata)};
			socket.sendText(JSON.stringify(backdata));
		}

		if(find == false){
			Db.query("select * from tb_user order by uid desc limit 1", function(rs, f){
				for(var r of rs){
					var uid = r["uid"];
					uid = uid + 1;
					var nowtime = new Date().getTime();
					var password = "123456";
					var sql = "insert into tb_user values('"+uid+"','" + self.name + "','" + password + "','" +nowtime + "')";
					Db.query(sql, null);

					var logindata = {"name": self.name, "uid": uid};
					var backdata = {"cmd_id":Global.CMD_ID.CMD_ID_LOGIN, "data": JSON.stringify(logindata)};
					socket.sendText(JSON.stringify(backdata));
				}
			});
		}
	});
};

Ctrl.onCreateFKTableReq = function(socket, data) {
	var tablenum = Func.RandomTableNum();

	var createtable_str = data.data;
	var createtable_data = JSON.parse(createtable_str);
	var uid = createtable_data.uid;
	var username = createtable_data.username;

	if(tablenum > 0) {
		var table = Game.createTable(socket, tablenum, uid, username);
		var tabledata = table.buildTableData();
		var tablestr = JSON.stringify(tabledata);
		var backdata = {"cmd_id":Global.CMD_ID.CMD_ID_CREATE_FKTABLE, "data": tablestr};
		socket.sendText(JSON.stringify(backdata));
	}
};

Ctrl.onJoinFKTableReq = function(socket, data) {
	var data_str = data.data;
	var data_json = JSON.parse(data_str);
	var tablenum = data_json.tablenum;
	var uid = data_json.uid;
	var username = data_json.username;

	Game.onJoinFKTable(socket, tablenum, uid, username);

	// var table = Game.enterTable(socket, tablenum, uid, username);

	// if(table != null)
	// {
 
	// 	for(var i=0; i<table.players.length; i++) {
	// 		var player = table.players[i];
	// 		if(player && player.socket) {
	// 			var tabledata = table.buildTableData();
	// 			var tablestr = JSON.stringify(tabledata);
	// 			var backdata = {"cmd_id":Global.CMD_ID.CMD_ID_JOIN_FKTABLE, "data": tablestr};
	// 			player.socket.sendText(JSON.stringify(backdata));
	// 		}
	// 	}	
	// }
};

Ctrl.onReadyReq = function(socket, data) {
	var data_str = data.data;
	var data_json = JSON.parse(data_str);

	var tablenum = data_json.tablenum;
	var uid = data_json.uid;
	Game.onReady(tablenum, uid);
}

Ctrl.onOutCardReq = function(socket, data) {
	var data_str = data.data;
	var data_json = JSON.parse(data_str);

	var tablenum = data_json.tablenum;
	varchairnouid = data_json.chairno;
	var cardid = data_json.cardid;

	Game.onOutCard(tablenum, chairno, cardid);
}

Ctrl.onCatchCardReq = function(socket, data) {
	var data_str = data.data;
	var data_json = JSON.parse(data_str);

	var tablenum = data_json.tablenum;
	var chairno = data_json.chairno;
 
	Game.onCatchCard(tablenum, chairno);
}

Ctrl.onGuoCardReq = function(socket, data) {
	var data_str = data.data;
	var data_json = JSON.parse(data_str);

	var tablenum = data_json.tablenum;
	var chairno = data_json.chairno;
 
	Game.onGuoCard(tablenum, chairno);
}
 

module.exports = Ctrl;
