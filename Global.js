var Global = {};

Global.INVALID_CARDID = 0;
Global.INVALID_FACE = 0;
Global.MJ_MAX_DEEPTH = 10000;
Global.MJ_HU_GAINS_ARYSIZE = 100;
Global.MAX_ANALYSE_UNIT = 7;
Global.MAX_LAYOUT_NUM = 100;
Global.MJ_LAYOUT_MOD = 10;
Global.MJ_WANTIAOTONG_MAX_FACE  = 40;
Global.MJ_HU_FLAGS_ARYSIZE = 4;

Global.CMD_ID = {
	//////////////base 
	"CMD_ID_LOGIN" : 1000,
	"CMD_ID_CREATE_FKTABLE": 1001,
	"CMD_ID_JOIN_FKTABLE": 1002,
	"CMD_ID_READY": 1003,
	//////////////base 


	//////////////mj
	"CMD_ID_OUTCARD": 2000,
	"CMD_ID_CATCHCARD": 2001,
	"CMD_ID_GUOCARD": 2002,
	"CMD_ID_CHICARD": 2003,
	"CMD_ID_PENGCARD": 2004,
	"CMD_ID_GANGCARD": 2005,
	"CMD_ID_HUCARD": 2006,
	/////////////mj
};

Global.WAITING_STATUS = {
	"TS_PLAYING" :1,
	"TS_WAITING_CATCH" : 2,
	"TS_WAITING_OUT" : 4,
	"TS_WAITING_QIANG_MINGGANG" : 8,
	"TS_WAITING_QIANG_ANGANG" : 16,
	"TS_WAITING_QIANG_BUGANG" : 32,
};

Global.ACT_TYPE = 
{
	"ACT_NULL"		: 0x0000,		//无动作		
	"ACT_GUO"			: 0x0001,		//取消			
	"ACT_CHI"			: 0x0002,		//吃	
	"ACT_PENG"		: 0x0004,		//碰			
	"ACT_MINGGANG"	: 0x0008,		//明杠			
	"ACT_BUGANG"		: 0x0010,		//补杠			
	"ACT_ANGANG"		: 0x0020,		//暗杠			
	"ACT_TING"		: 0x0040,		//听牌			
	"ACT_HUA"			: 0x0080,		//补花			
	"ACT_HU"		: 0x0100,		//胡			
	"ACT_OUT"			: 0x0200,		//出牌			
	"ACT_CATCH"		: 0x0400,		//抓牌	
};

 
Global.HU_TYPE = 
{
	"MJ_HU_FANG"		: 1,	// 放冲
	"MJ_HU_ZIMO" :2,				// 自摸
	"MJ_HU_QGNG_MING":3, 		// 抢明杠
	"MJ_HU_QGNG_AN":4,			// 抢碰杠
	"MJ_HU_QGNG_BU":5,			// 抢补杠
};

Global.ACT_TYPE = 
{
	"ACT_NULL"		: 0,		//无动作		
	"ACT_GUO"			: 1,		//取消			
	"ACT_CHI"			: 2,		//吃	
	"ACT_PENG"	: 4,		//碰			
	"ACT_MINGGANG"	: 8,		//明杠			
	"ACT_BUGANG"		: 16,		//补杠			
	"ACT_ANGANG"		: 32,		//暗杠			
	"ACT_TING"		: 64,		//听牌			
	"ACT_HUA"			: 128,		//补花			
	"ACT_HU"			: 256,		//胡			
	"ACT_OUT"			: 512,		//出牌			
	"ACT_CATCH"		: 1024,		//抓牌	
};

Global.HUTYPE = {
	"MJ_HU_NORMAL": 1
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
