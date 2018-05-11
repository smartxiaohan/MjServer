var ws = require('nodejs-websocket');

var route = require('./Route.js');
var game = require('./Game.js')
 
var server = ws.createServer(function(conn) {
	console.log("new connection");
	
	conn.on("text", function(str) {
		console.log("received " + str);
		
		var data = JSON.parse(str);
		var cmd_id = data.cmd_id;
		
		console.log("cmd_id == " + cmd_id.toString());
        route.receiveRequest(conn, cmd_id, data);
	});
	
	conn.on("close", function (code, reason) {
        console.log("Connection closed")
    });
	
	conn.on("error", function(code, reason) {
		console.log("error code="+code+"reason=="+reason);
	});
}).listen(8001,"0.0.0.0");

game.init();