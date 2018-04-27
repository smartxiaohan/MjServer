var Global = require('./Global.js');
var Ctrl = require('./Ctrl.js');

var route = {};

route.receiveRequest = function receiveRequest(socket, cmd_id, data) {
	switch(cmd_id)
	{
		case Global.CMD_ID.CMD_ID_LOGIN:
			console.log("receiveRequest cmd_id=" + cmd_id.toString());
			Ctrl.onLoginReq(socket, data);
			break;
		default:
			break;
	}
};

module.exports = route;