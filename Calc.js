/*
cardID:
万：	1 ~36 （1 -- 9， 10--18，  19--27， 28--36）
条：	37 ~72 （37--45， 46--54， 55--63， 64--72）
筒：	73 ~ 108 （73--81， 82--90， 91--99， 100--108）
风：	109~ 124 （109 -- 112， 113--116，117--120, 121--124)
字：	125 ~ 136 (125 -- 127, 128--130, 131 -- 133, 134 -- 136)
花1 :	137~140	  梅兰竹菊
花2：	141~144   春夏秋冬
花3：	145~152   老鼠，财神，猫 + 4白搭

FACE:
万：11 - 19
条：21-29
筒：31-39
风：41-44
字：51-53
花1：61-64
花2：71-74
花3：81-88

//花色
#define  CLR_WAN    1  //万
#define  CLR_TIAO   2  //条
#define  CLR_TONG   3  //筒
#define  CLR_FENG   4  //东南西北
#define  CLR_ZFB   5  //中发白
#define  CLR_HUA1   6  //梅兰竹菊
#define  CLR_HUA2   7  //春夏秋冬
#define  CLR_HUA3   8  //老鼠/财神/猫/聚宝盆各1张，合计4张
*/

var Global = require("./Global.js");
var Calc = {};

class AnalyseUnit {
	constructor() {
		this.reset();
	}

	reset() {
		this.type = -1;
		this.cardFaces = [];
	}
}

class HuDetails {
	constructor() {
		this.reset();
	}

	reset() {
		this.dwHuFlags = [];
		this.nHuGains = [];
		this.nSubGains = [];
		
		this.count = 0;
		this.analyse = [];
	}
}

Calc.IsValidFace = function(face)
{
	if (face >= Global.FACE.MJ_FACE_1WAN && face <= Global.FACE.MJ_FACE_9WAN) return true;
	if (face >= Global.FACE.MJ_FACE_1TIAO && face <= Global.FACE.MJ_FACE_9TIAO) return true;
	if (face >= Global.FACE.MJ_FACE_1TONG && face <= Global.FACE.MJ_FACE_9TONG) return true;
	if (face >= Global.FACE.MJ_FACE_DONG && face <= Global.FACE.MJ_FACE_BEI) return true;
	if (face >= Global.FACE.MJ_FACE_ZHONG && face <= Global.FACE.MJ_FACE_BAI) return true;

	var huDetails = new HuDetails();
	huDetails.count = 9;

	return false;
}

Calc.GetCardColorByID = function(cardid)
{
	if (cardid > 0 && cardid <= 36){
		return Global.COLOR.CLR_WAN;   // 万
	}
	else if (cardid > 36 && cardid <= 72){
		return Global.COLOR.CLR_TIAO;  // 条
	}
	else if (cardid > 72 && cardid <= 108){
		return Global.COLOR.CLR_TONG;  // 筒
	}
	else if (cardid > 108 && cardid <= 124){
		return Global.COLOR.CLR_FENG;  // 东南西北
	}
	else if (cardid > 124 && cardid <= 136){
		return Global.COLOR.CLR_ZFB;   // 中发白
	}
	else if (cardid > 136 && cardid <= 140){
		return Global.COLOR.CLR_HUA1;  // 春夏秋冬
	}
	else if (cardid > 140 && cardid <= 144){
		return Global.COLOR.CLR_HUA2;  // 梅兰竹菊
	}
	else if (cardid > 144 && cardid <= 152){
		return Global.COLOR.CLR_HUA3;  // 其余
	}
	else{
		return 0;
	}
}

Calc.GetCardValueByID = function(cardid)
{
	if (cardid > 0 && cardid <= 108){
		return (cardid - 1) % 9 + 1;
	}
	else if (cardid > 108 && cardid <= 124){
		return (cardid - 108 - 1) % 4 + 1;
	}
	else if (cardid > 124 && cardid <= 136){
		return (cardid - 124 - 1) % 3 + 1;
	}
	else if (cardid > 136 && cardid <= 140){
		return cardid - 136;
	}
	else if (cardid > 140 && cardid <= 144){
		return cardid - 140;
	}
	else if (cardid > 144 && cardid <= 152){
		return cardid - 144;
	}
	else{
		return 0;
	}
}

Calc.GetCardFaceByID = function(cardid)
{
	var color = this.GetCardColorByID(cardid);
	var value = this.GetCardValueByID(cardid);

	return this.MakeFace(color, value);
}

Calc.MakeFace = function(color, value) {
	return color * 10 + value;
}

Calc.IsSameCard = function(cardID1, cardID2)
{
	if (Global.INVALID_CARDID == cardID1 || Global.INVALID_CARDID == cardID2)
		return false;

	return (this.GetCardFaceByID(cardID1) == this.GetCardFaceByID(cardID2));
}
 
module.exports = Calc;
