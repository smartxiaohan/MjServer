var Global = require('./Global.js');
var Ctrl = require('./Ctrl.js');

var route = {};

route.receiveRequest = function receiveRequest(socket, cmd_id, data) {
	console.log("receiveRequest cmd_id=" + cmd_id.toString());
	switch(cmd_id)
	{
		case Global.CMD_ID.CMD_ID_LOGIN:		
			Ctrl.onLoginReq(socket, data);
			break;
		case Global.CMD_ID.CMD_ID_CREATE_FKROOM:
			Ctrl.onCreateFKRoomReq(socket, data);
			break;
		default:
			break;
	}
};

module.exports = route;