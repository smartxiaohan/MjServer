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
var Func = require("./Func.js");
var Config = require("./Config.js");

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
	if (face >= Global.FACE.Global.FACE.MJ_FACE_DONG && face <= Global.FACE.Global.FACE.MJ_FACE_BEI) return true;
	if (face >= Global.FACE.Global.FACE.MJ_FACE_ZHONG && face <= Global.FACE.Global.FACE.MJ_FACE_BAI) return true;

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



//hucard calculator
Calc.CalcHuGains(nCardsLay, face, vecAction, huDetails, wHuType)
{
	var gains = 1;
	return gains;
}


Calc.GetCardRemainsFromLay(nCardsLay, nLayLen)
{
	var nCount = 0;
	for (var i = 0; i < nLayLen; i++){
		nCount += nCardsLay[i];
	}
	return nCount;
}


Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, dec)
{
	jn = jokernum1;
	jn2 = jokernum2;

	if (dec <= 0) return 0;

	var decreased = 0;
	while (jokernum1 > 0 || jokernum2 > 0)//至少还有一个财神
	{
		if (jokernum1 > jokernum2)//财神1的数量多
		{
			if (jokernum2 > 0)//有财神2
			{
				jokernum2--;
				decreased++;
				if (decreased >= dec)
				{
					return dec;
				}
			}
			else //没有财神2了
			{
				if (jokernum1 > 0) //财神1还有剩余
				{
					jokernum1--;
					decreased++;
					if (decreased >= dec)
					{
						return dec;
					}
				}
				else
					return decreased;
			}
		}
		else//使用财神1
		{
			if (jokernum1 > 0)//使用财神1
			{
				jokernum1--;
				decreased++;
				if (decreased >= dec)
				{
					return dec;
				}
			}
			else//使用财神2
			{
				if (jokernum2 > 0)//还有财神2
				{
					jokernum2--;
					decreased++;
					if (decreased >= dec)
					{
						return dec;
					}
				}
				else
					return decreased;
			}
		}
	}
	return jn, jn2, jokernum1, jokernum2;
}

Calc._UseJokerNum(jokernum1, jokernum2)
{
	if (jokernum1 > jokernum2)//财神1的数量多
	{
		if (jokernum2 > 0)//有财神2
		{
			jokernum2--;
			return m_JokerFace2, jokernum1, jokernum2;
		}
		else //没有财神2了
		{
			if (jokernum1 > 0) //财神1还有剩余
			{
				jokernum1--;
				return m_JokerFace1, jokernum1, jokernum2;
			}
			else
				return 0, jokernum1, jokernum2;
		}
	}
	else//使用财神1
	{
		if (jokernum1 > 0)//使用财神1
		{
			jokernum1--;
			return m_JokerFace1, jokernum1, jokernum2;
		}
		else//没有财神1了,使用财神2
		{
			if (jokernum2 > 0)//还有财神2
			{
				jokernum2--;
				return m_JokerFace2, jokernum1, jokernum2;
			}
			else
				return 0, jokernum1, jokernum2;
		}
	}
	return 0, jokernum1, jokernum2;
}

Calc._HuDetailAddJokerUnit(huDetails, type, jokernum1, jokernum2)
{
	huDetails.count++;
	 
	if (huDetails.count > Global.MAX_ANALYSE_UNIT)
	{
		return 0;
	}
	huDetails.analyse[huDetails.count - 1].type = type;

	if (Global.ANALYSE_TYPE.AN_DUIZI == type)
	{ // 对子
		var ret = 0;
		ret, jokernum1, jokernum2 = Calc._UseJokerNum(jokernum1, jokernum2);
		huDetails.analyse[huDetails.count - 1].cardFaces[0] = 0 - ret;

		ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
		huDetails.analyse[huDetails.count - 1].cardFaces[1] = 0 - ret;
	}
	else if (Global.ANALYSE_TYPE.AN_KEZI == type)
	{ // 刻子
		var ret = 0;
		ret, jokernum1, jokernum2 = Calc._UseJokerNum(jokernum1, jokernum2);

		huDetails.analyse[huDetails.count - 1].cardFaces[0] = 0 - ret;

		ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
		huDetails.analyse[huDetails.count - 1].cardFaces[1] = 0 - ret;

		ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
		huDetails.analyse[huDetails.count - 1].cardFaces[2] = 0 - ret;
	}

	return huDetails.count;
}

Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2)
{
	jokernum1 = jn;
	jokernum2 = jn2;
	return jokernum1,jokernum2;
}

Calc._HuDetailAddUnit(huDetails, type, index, jokernum1, jokernum2, jokerpos, emptypos)
{
	huDetails.count++;

	if (huDetails.count > Global.MAX_ANALYSE_UNIT)
	{
		return 0;
	}

	huDetails.analyse[huDetails.count - 1].type = type;
	if (Global.ANALYSE_TYPE.AN_GANGZI == type){ // 杠牌
		huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;
		huDetails.analyse[huDetails.count - 1].cardFaces[1] = index;
		huDetails.analyse[huDetails.count - 1].cardFaces[2] = index;
		if (0 == jokernum1 + jokernum2){
			huDetails.analyse[huDetails.count - 1].cardFaces[3] = index;
		}
		else if (1 == jokernum1 + jokernum2){
			var ret = 0;
			ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
			huDetails.analyse[huDetails.count - 1].cardFaces[3] = 0 - ret;
		}
	}
	else if (Global.ANALYSE_TYPE.AN_KEZI == type){ // 刻子
		huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;
		if (0 == jokernum1 + jokernum2){
			huDetails.analyse[huDetails.count - 1].cardFaces[1] = index;
			huDetails.analyse[huDetails.count - 1].cardFaces[2] = index;
		}
		else if (1 == jokernum1 + jokernum2){
			huDetails.analyse[huDetails.count - 1].cardFaces[1] = index;

			var ret = 0;
			ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
			huDetails.analyse[huDetails.count - 1].cardFaces[2] = 0 - ret;
		}
		else if (2 == jokernum1 + jokernum2){
			var ret = 0;
			ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
			huDetails.analyse[huDetails.count - 1].cardFaces[1] = 0 - ret;

			ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
			huDetails.analyse[huDetails.count - 1].cardFaces[2] = 0 - ret;
		}
	}
	else if (Global.ANALYSE_TYPE.AN_DUIZI == type){ // 对子
		if (0 == jokernum1 + jokernum2){
			huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;
			huDetails.analyse[huDetails.count - 1].cardFaces[1] = index;
		}
		else if (1 == jokernum1 + jokernum2){
			huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;

			var ret = 0;
			ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
			huDetails.analyse[huDetails.count - 1].cardFaces[1] =  0 - ret;
		}
		else if (2 == jokernum1 + jokernum2){
			var ret = 0;
			ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
			huDetails.analyse[huDetails.count - 1].cardFaces[0] = 0 - ret;

			ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
			huDetails.analyse[huDetails.count - 1].cardFaces[1] = 0 - ret;
		}
	}
	else if (Global.ANALYSE_TYPE.AN_SHUNZI == type){ // 顺子
		if (0 == jokernum1 + jokernum2){
			if (2 == emptypos){
				huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;
				huDetails.analyse[huDetails.count - 1].cardFaces[1] = index + 1;
				huDetails.analyse[huDetails.count - 1].cardFaces[2] = index + 3;
			}
			else if (1 == emptypos){
				huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;
				huDetails.analyse[huDetails.count - 1].cardFaces[1] = index + 2;
				huDetails.analyse[huDetails.count - 1].cardFaces[2] = index + 3;
			}
			else if (0 == emptypos){
				huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;
				huDetails.analyse[huDetails.count - 1].cardFaces[1] = index + 1;
				huDetails.analyse[huDetails.count - 1].cardFaces[2] = index + 2;
			}
		}
		else if (1 == jokernum1 + jokernum2){
			if (2 == jokerpos){
				if (1 == emptypos){
					huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;

					var ret = 0;
					ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
					huDetails.analyse[huDetails.count - 1].cardFaces[1] = 0 - ret;
					huDetails.analyse[huDetails.count - 1].cardFaces[2] = index + 3;
				}
				else if (0 == emptypos){
					huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;
					huDetails.analyse[huDetails.count - 1].cardFaces[1] = index + 1;

					var ret = 0;
					ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
					huDetails.analyse[huDetails.count - 1].cardFaces[2] = 0 - ret;
				}
			}
			else if (1 == jokerpos){
				if (2 == emptypos){
					huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;

					var ret = 0;
					ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
					huDetails.analyse[huDetails.count - 1].cardFaces[1] = 0 - ret;
					huDetails.analyse[huDetails.count - 1].cardFaces[2] = index + 3;
				}
				else if (0 == emptypos){
					huDetails.analyse[huDetails.count - 1].cardFaces[0] = index;

					var ret = 0;
					ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
					huDetails.analyse[huDetails.count - 1].cardFaces[1] = 0 - ret;
					huDetails.analyse[huDetails.count - 1].cardFaces[2] = index + 2;
				}
			}
			else if (0 == jokerpos){
				var ret = 0;
				ret, jokernum1, jokernum2 == Calc._UseJokerNum(jokernum1, jokernum2);
				huDetails.analyse[huDetails.count - 1].cardFaces[0] = 0 - ret;
				huDetails.analyse[huDetails.count - 1].cardFaces[1] = index;
				huDetails.analyse[huDetails.count - 1].cardFaces[2] = index + 1;
			}
		}
	}
	else{
	}
	return huDetails.count;
}

Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetailsRun, wHuType, gainsLimit, deepth)
{
	if (deepth>Global.MJ_MAX_DEEPTH)
		return 0;//超过递归上限返回

	deepth++;
	var huDetails = new HuDetails();
	if (!Calc.GetCardRemainsFromLay(lay))//已经没有剩余的牌
	{
		if (jokernum1 + jokernum2 == 0 && bJiang==true)//所有财神匹配完毕
		{
			huDetailsRun.dwHuFlags[0] = Global.HUTYPE.MJ_HU_NORMAL;
			var gains = Calc.CalcHuGains(layOrigin, face, vecAction, huDetailsRun, wHuType);
			if (gains>gains_max)
			{
				gains_max = gains;
				//memcpy(&huDetailsMax, &huDetailsRun, sizeof(HuDetails));
				huDetailsMax = Func.deepCopy(huDetailsRun);
			}
			//清理
			for (var j = 0; j<Global.MJ_HU_GAINS_ARYSIZE; j++)
			{
				huDetailsRun.nHuGains[j] = 0;
				huDetailsRun.nSubGains[j] = 0;
			}

			if (gains >= gainsLimit)//达到胡牌上限，则不再继续递归
				return Global.ACT_TYPE.ACT_HU;
			else
			{
				deepth--;//返回上一层
				return 0;
			}
		}
		//剩余财神大于2张!递归
		if (jokernum1 + jokernum2 >= 3)//剩余财神大于3
		{
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 3);	// 财神减3

			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddJokerUnit(huDetails, AN_KEZI, jn - jokernum1, jn2 - jokernum2);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth))
			{
				return Global.ACT_TYPE.ACT_HU;// 如果超过胡牌上限，结束递归
			}
			else
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
		}

		if (!bJiang && jokernum1 + jokernum2 >= 2)
		{
			bJiang = true;					// 设置将牌标志
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 2);	// 财神减2
			//huDetails = Func.deepCopy(huDetailsRun);
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddJokerUnit(huDetails, Global.ANALYSE_TYPE.AN_DUIZI, jn - jokernum1, jn2 - jokernum2);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth))
			{
				return Global.ACT_TYPE.ACT_HU;// 如果超过胡牌上限，结束递归
			}
			else
			{
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
				bJiang = false;		// 清除将牌标志
			}
		}

		if (deepth == 1)
		{
			return gains_max;
		}
		else
		{
			deepth--;
			return 0;//无法匹配,不能胡!
		}

	}

	if (jokernum1>0)//递归财神1
	{
		jokernum1--;
		huDetails = Func.deepCopy(huDetailsRun);
		lay[m_JokerFace1]++;
		if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth))
			return Global.ACT_TYPE.ACT_HU;		// 如果超过胡牌上限，结束递归
		else
		{
			lay[m_JokerFace1]--;
			jokernum1++;
		}
	}

	if (jokernum2>0)//递归财神2
	{
		jokernum2--;
		huDetails = Func.deepCopy(huDetailsRun);
		lay[m_JokerFace2]++;
		if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth))
			return Global.ACT_TYPE.ACT_HU;		// 如果超过胡牌上限，结束递归
		else
		{
			lay[m_JokerFace2]--;
			jokernum2++;
		}
	}
	var i = 1;
	for (i = 1; lay[i] <= 0 && i < Global.MAX_LAYOUT_NUM; i++); // 找到有牌的地方，i就是当前牌位置, lay[i]是张数

	// 3张组合(大对: 3张一样)
	if (lay[i] >= 3)
	{	// 如果当前牌不少于3张
		lay[i] -= 3;		// 减去3张牌
		huDetails = Func.deepCopy(huDetailsRun);
		Calc._HuDetailAddUnit(huDetails, AN_KEZI, i, 0, 0, 0, 0);
		if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth))
			return Global.ACT_TYPE.ACT_HU;		// 如果超过胡牌上限，结束递归
		else
		{
			lay[i] += 3; // 取消3张组合
		}
	}

	// 3张组合(大对: 2张一样 + 财神)
	if (lay[i] >= 2 && jokernum1 + jokernum2 > 0)
	{ // 如果当前牌不少于2张并且有财神
		lay[i] -= 2;		// 减去2张牌
		var jn, jn2;
		jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);		// 财神减1	
		huDetails = Func.deepCopy(huDetailsRun);
		Calc._HuDetailAddUnit(huDetails, AN_KEZI, i, jn - jokernum1, jn2 - jokernum2, 0, 0);
		if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth))
			return Global.ACT_TYPE.ACT_HU;		// 如果剩余的牌组合成功，胡牌
		else
		{
			lay[i] += 2; // 取消3张组合
			jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
		}
	}

	// 3张组合(牌X + 2张财神)
	if (lay[i] && jokernum1 + jokernum2 >= 2)
	{ // 如果当前牌不少于1张并且有2张以上财神
		lay[i]--; 	// 牌数减1
		var jn, jn2;
		jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 2);	// 财神减2

		huDetails = Func.deepCopy(huDetailsRun);
		Calc._HuDetailAddUnit(huDetails, AN_KEZI, i, jn - jokernum1, jn2 - jokernum2,  0, 0);
		if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth))
			return Global.ACT_TYPE.ACT_HU; // 如果剩余的牌组合成功 胡牌
		else
		{
			lay[i]++; //恢复牌数
			jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
		}
	}

	// 2张组合(将牌: 2张一样)
	if (!bJiang && lay[i] >= 2)
	{ // 如果之前没有将牌，且当前牌不少于2张
		bJiang = TRUE;					// 设置将牌标志
		lay[i] -= 2;				// 减去2张牌
		huDetails = Func.deepCopy(huDetailsRun);
		Calc._HuDetailAddUnit(huDetails, Global.ANALYSE_TYPE.AN_DUIZI, i, 0, 0, 0, 0);
		if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth))
			return Global.ACT_TYPE.ACT_HU;				// 如果剩余的牌组合成功，胡牌
		else
		{
			lay[i] += 2;	// 取消2张组合
			bJiang = FALSE;		// 清除将牌标志
		}
	}

	// 2张组合(将牌: 1张 + 财神)
	if (!bJiang && lay[i] && jokernum1 + jokernum2 > 0) { // 如果之前没有将牌，且当前牌不少于1张并且有财神
		bJiang = TRUE;					// 设置将牌标志
		lay[i]--;				// 减去1张牌
		var jn, jn2;
		jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
		huDetails = Func.deepCopy(huDetailsRun);
		Calc._HuDetailAddUnit(huDetails, Global.ANALYSE_TYPE.AN_DUIZI, i, jn - jokernum1, jn2 - jokernum2, 0, 0);
		if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)) {
			return Global.ACT_TYPE.ACT_HU;				// 如果剩余的牌组合成功，胡牌
		}
		else{
			lay[i]++;	// 取消2张组合
			jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			bJiang = FALSE;		// 清除将牌标志
		}
	}

	if (i < Global.MJ_WANTIAOTONG_MAX_FACE) {
		// 顺牌组合，注意是从前往后组合！
		if (i % Global.MJ_LAYOUT_MOD != Global.MJ_LAYOUT_MOD - 2 && i % Global.MJ_LAYOUT_MOD != Global.MJ_LAYOUT_MOD - 1 && // 排除数值为8和9的牌
			lay[i + 1] && lay[i + 2]) { // 如果后面有连续两张牌

			lay[i]--;
			lay[i + 1]--;
			lay[i + 2]--; // 各牌数减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, i, 0, 0, 0, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)){
				return Global.ACT_TYPE.ACT_HU; // 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[i]++;
				lay[i + 1]++;
				lay[i + 2]++; // 恢复各牌数
			}
		}
		// 顺牌组合，2张连牌 + 1张财神 
		if (i % Global.MJ_LAYOUT_MOD != Global.MJ_LAYOUT_MOD - 1 &&    // 排除数值为9的牌
			lay[i + 1] && jokernum1 + jokernum2 > 0) { // 如果后面有连续1张牌,并且有财神

			lay[i]--;
			lay[i + 1]--;	// 各牌数减1
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, i, jn - jokernum1, jn2 - jokernum2, 2, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)){
				return Global.ACT_TYPE.ACT_HU; // 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[i]++;
				lay[i + 1]++; // 恢复各牌数
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
		// 顺牌组合，牌X + 1张财神 + 牌(X+2)
		if (i % Global.MJ_LAYOUT_MOD != Global.MJ_LAYOUT_MOD - 2 && i % Global.MJ_LAYOUT_MOD != Global.MJ_LAYOUT_MOD - 1 &&    // 排除数值为8和9的牌
			lay[i + 2] && jokernum1 + jokernum2 > 0) { // 如果后面有跳张,并且有财神

			lay[i]--;
			lay[i + 2]--;	// 各牌数减1
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, i, jn - jokernum1, jn2 - jokernum2, 1, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)){

				return Global.ACT_TYPE.ACT_HU; // 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[i]++;
				lay[i + 2]++; // 恢复各牌数
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
	}
	else if (Config.ChiFeng == 1){          //IS_BIT_SET(gameflags, MJ_GF_FENG_CHI)){ // 风板可以吃
		if (lay[Global.FACE.MJ_FACE_DONG] && lay[Global.FACE.MJ_FACE_NAN] && lay[Global.FACE.MJ_FACE_XI]){ // 东南西
			lay[Global.FACE.MJ_FACE_DONG]--;
			lay[Global.FACE.MJ_FACE_NAN]--;
			lay[Global.FACE.MJ_FACE_XI]--;
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_DONG, 0, 0, 0, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)){

				return Global.ACT_TYPE.ACT_HU; // 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_DONG]++;
				lay[Global.FACE.MJ_FACE_NAN]++;
				lay[Global.FACE.MJ_FACE_XI]++;
			}
		}
		if (lay[Global.FACE.MJ_FACE_DONG] && lay[Global.FACE.MJ_FACE_NAN] && lay[Global.FACE.MJ_FACE_BEI]){ // 东南北
			lay[Global.FACE.MJ_FACE_DONG]--;
			lay[Global.FACE.MJ_FACE_NAN]--;
			lay[Global.FACE.MJ_FACE_BEI]--;
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_DONG, 0, 0, 0, 2);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)){

				return Global.ACT_TYPE.ACT_HU; // 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_DONG]++;
				lay[Global.FACE.MJ_FACE_NAN]++;
				lay[Global.FACE.MJ_FACE_BEI]++;
			}
		}
		if (lay[Global.FACE.MJ_FACE_NAN] && lay[Global.FACE.MJ_FACE_XI] && lay[Global.FACE.MJ_FACE_BEI]){ // 南西北
			lay[Global.FACE.MJ_FACE_NAN]--;
			lay[Global.FACE.MJ_FACE_XI]--;
			lay[Global.FACE.MJ_FACE_BEI]--;
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_NAN, 0, 0, 0, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)){
				return Global.ACT_TYPE.ACT_HU; // 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_NAN]++;
				lay[Global.FACE.MJ_FACE_XI]++;
				lay[Global.FACE.MJ_FACE_BEI]++;
			}
		}
		if (lay[Global.FACE.MJ_FACE_DONG] && lay[Global.FACE.MJ_FACE_XI] && lay[Global.FACE.MJ_FACE_BEI]){ // 东西北
			lay[Global.FACE.MJ_FACE_DONG]--;
			lay[Global.FACE.MJ_FACE_XI]--;
			lay[Global.FACE.MJ_FACE_BEI]--;
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_DONG, 0, 0, 0, 1);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)){
				return Global.ACT_TYPE.ACT_HU; // 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_DONG]++;
				lay[Global.FACE.MJ_FACE_XI]++;
				lay[Global.FACE.MJ_FACE_BEI]++;
			}
		}
		if (lay[Global.FACE.MJ_FACE_ZHONG] && lay[Global.FACE.MJ_FACE_FA] && lay[Global.FACE.MJ_FACE_BAI]){ // 中发白
			lay[Global.FACE.MJ_FACE_ZHONG]--;
			lay[Global.FACE.MJ_FACE_FA]--;
			lay[Global.FACE.MJ_FACE_BAI]--;
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_ZHONG, 0, 0, 0, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)){
				return Global.ACT_TYPE.ACT_HU; // 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_ZHONG]++;
				lay[Global.FACE.MJ_FACE_FA]++;
				lay[Global.FACE.MJ_FACE_BAI]++;
			}
		}
		if (lay[Global.FACE.MJ_FACE_DONG] && lay[Global.FACE.MJ_FACE_NAN] && jokernum1 + jokernum2 > 0){ // 东南
			lay[Global.FACE.MJ_FACE_DONG]--;		// 减去1张牌
			lay[Global.FACE.MJ_FACE_NAN]--;		// 减去1张牌
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_DONG, jn - jokernum1, jn2 - jokernum2, 2, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)) {
				return Global.ACT_TYPE.ACT_HU;		// 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_DONG]++;		// 加1张牌
				lay[Global.FACE.MJ_FACE_NAN]++;		    // 加1张牌
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
		if (lay[Global.FACE.MJ_FACE_DONG] && lay[Global.FACE.MJ_FACE_XI] && jokernum1 + jokernum2 > 0){ // 东西
			lay[Global.FACE.MJ_FACE_DONG]--;		// 减去1张牌
			lay[Global.FACE.MJ_FACE_XI]--;		// 减去1张牌
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_DONG, jn - jokernum1, jn2 - jokernum2, 1, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)) {

				return Global.ACT_TYPE.ACT_HU;		// 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_DONG]++;		// 加1张牌
				lay[Global.FACE.MJ_FACE_XI]++;		// 加1张牌
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
		if (lay[Global.FACE.MJ_FACE_DONG] && lay[Global.FACE.MJ_FACE_BEI] && jokernum1 + jokernum2 > 0){ // 东北
			lay[Global.FACE.MJ_FACE_DONG]--;		// 减去1张牌
			lay[Global.FACE.MJ_FACE_BEI]--;		// 减去1张牌
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_DONG, jn - jokernum1, jn2 - jokernum2, 1, 2);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)) {

				return Global.ACT_TYPE.ACT_HU;		// 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_DONG]++;		// 加1张牌
				lay[Global.FACE.MJ_FACE_BEI]++;		// 加1张牌
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
		if (lay[Global.FACE.MJ_FACE_NAN] && lay[Global.FACE.MJ_FACE_XI] && jokernum1 + jokernum2 > 0){ // 南西
			lay[Global.FACE.MJ_FACE_NAN]--;		// 减去1张牌
			lay[Global.FACE.MJ_FACE_XI]--;		// 减去1张牌
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_NAN, jn - jokernum1, jn2 - jokernum2, 2, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)) {

				return Global.ACT_TYPE.ACT_HU;		// 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_NAN]++;		// 加1张牌
				lay[Global.FACE.MJ_FACE_XI]++;		// 加1张牌
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
		if (lay[Global.FACE.MJ_FACE_NAN] && lay[Global.FACE.MJ_FACE_BEI] && jokernum1 + jokernum2 > 0){ // 南北
			lay[Global.FACE.MJ_FACE_NAN]--;		// 减去1张牌
			lay[Global.FACE.MJ_FACE_BEI]--;		// 减去1张牌
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_NAN, jn - jokernum1, jn2 - jokernum2, 1, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)) {
				return Global.ACT_TYPE.ACT_HU;		// 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_NAN]++;		// 加1张牌
				lay[Global.FACE.MJ_FACE_BEI]++;		// 加1张牌
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
		if (lay[Global.FACE.MJ_FACE_XI] && lay[Global.FACE.MJ_FACE_BEI] && jokernum1 + jokernum2 > 0){ // 西北
			lay[Global.FACE.MJ_FACE_XI]--;		// 减去1张牌
			lay[Global.FACE.MJ_FACE_BEI]--;		// 减去1张牌
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_XI, jn - jokernum1, jn2 - jokernum2, 0, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)) {
				return Global.ACT_TYPE.ACT_HU;		// 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_XI]++;		// 加1张牌
				lay[Global.FACE.MJ_FACE_BEI]++;		// 加1张牌
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
		if (lay[Global.FACE.MJ_FACE_ZHONG] && lay[Global.FACE.MJ_FACE_FA] && jokernum1 + jokernum2 > 0){ // 中发
			lay[Global.FACE.MJ_FACE_ZHONG]--;		// 减去1张牌
			lay[Global.FACE.MJ_FACE_FA]--;		// 减去1张牌
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_ZHONG, jn - jokernum1, jn2 - jokernum2, 2, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)) {
				return Global.ACT_TYPE.ACT_HU;		// 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_ZHONG]++;		// 加1张牌
				lay[Global.FACE.MJ_FACE_FA]++;		// 加1张牌
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
		if (lay[Global.FACE.MJ_FACE_ZHONG] && lay[Global.FACE.MJ_FACE_BAI] && jokernum1 + jokernum2 > 0){ // 中白
			lay[Global.FACE.MJ_FACE_ZHONG]--;		// 减去1张牌
			lay[Global.FACE.MJ_FACE_BAI]--;		// 减去1张牌
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_ZHONG, jn - jokernum1, jn2 - jokernum2, 1, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)) {
				return Global.ACT_TYPE.ACT_HU;		// 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_ZHONG]++;		// 加1张牌
				lay[Global.FACE.MJ_FACE_BAI]++;		// 加1张牌
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
		if (lay[Global.FACE.MJ_FACE_FA] && lay[Global.FACE.MJ_FACE_BAI] && jokernum1 + jokernum2 > 0){ // 发白
			lay[Global.FACE.MJ_FACE_FA]--;		// 减去1张牌
			lay[Global.FACE.MJ_FACE_BAI]--;		// 减去1张牌
			var jn, jn2;
			jn, jn2, jokernum1, jokernum2 = Calc._DecreaseJokerNum(jn, jn2, jokernum1, jokernum2, 1);	// 财神减1
			huDetails = Func.deepCopy(huDetailsRun);
			Calc._HuDetailAddUnit(huDetails, AN_SHUNZI, Global.FACE.MJ_FACE_FA, jn - jokernum1, jn2 - jokernum2, 0, 0);
			if (Calc.HuPerFect(layOrigin, lay, face, vecAction, jokernum1, jokernum2, addpos, huDetailsMax, gains_max, bJiang, huDetails, wHuType, gainsLimit, deepth)) {
				return Global.ACT_TYPE.ACT_HU;		// 如果剩余的牌组合成功，胡牌
			}
			else{
				lay[Global.FACE.MJ_FACE_FA]++;		// 加1张牌
				lay[Global.FACE.MJ_FACE_BAI]++;		// 加1张牌
				jokernum1, jokernum2 = Calc._RestoreJokerNum(jn, jn2, jokernum1, jokernum2);
			}
		}
	}

	// 无法全部组合，不胡！

	//递归完毕，返回最大胡数
	if (deepth == 1)
	{
		return gains_max;
	}
	else
	{
		deepth--;
		return 0;
	}
}
 
module.exports = Calc;