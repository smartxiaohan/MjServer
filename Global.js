var Global = {};

Global.INVALID_CARDID = 0;

Global.CMD_ID = {
	"CMD_ID_LOGIN" : 1000,
	"CMD_ID_CREATE_FKTABLE": 1001,
	"CMD_ID_JOIN_FKTABLE": 1002
};

Global.ANALYSE_TYPE = {
	"AN_NULL": 0,
	"AN_SHUNZI": 1,
	"AN_KEZI": 2,
	"AN_DUIZI": 3,
	"AN_GANGZI": 4
};

Global.COLOR = {
	"CLR_WAN": 1,
	"CLR_TIAO": 2,
	"CLR_TONG": 3,
	"CLR_FENG": 4,
	"CLR_ZFB": 5,
	"CLR_HUA1": 6,
	"CLR_HUA2": 7,
	"CLR_HUA3": 8,
};

Global.FACE = {
	"MJ_FACE_1WAN": 11,
	"MJ_FACE_9WAN": 19,

	"MJ_FACE_1TIAO": 21,
	"MJ_FACE_9TIAO": 29,

	"MJ_FACE_1TONG": 31,
	"MJ_FACE_9TONG": 39,

	"MJ_FACE_DONG": 41,
	"MJ_FACE_NAN": 42,
	"MJ_FACE_XI": 43,
	"MJ_FACE_BEI": 44,

	"MJ_FACE_ZHONG": 51,
	"MJ_FACE_FA":52,
	"MJ_FACE_BAI": 53,
};

Global.TABLE_MAX_NUM = 10;

module.exports = Global;
