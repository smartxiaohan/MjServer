var ws = require('nodejs-websocket');
 
var server = ws.createServer(function(conn) {
	console.log("new connection");
	
	conn.on("text", function(str) {
		console.log("received " + str);
		
		var data = JSON.parse(str);
		var cmd_id = data.cmd_id;
		
		console.log("cmd_id == " + cmd_id.toString());
		
		var senddata = {"cmd_id":5555, "data":"fuck"};
		
		conn.sendText(JSON.stringify(senddata));
	});
	
	conn.on("close", function (code, reason) {
        console.log("Connection closed")
    });
	
	conn.on("error", function(code, reason) {
		console.log("error code="+code+"reason=="+reason);
	});
}).listen(8000);