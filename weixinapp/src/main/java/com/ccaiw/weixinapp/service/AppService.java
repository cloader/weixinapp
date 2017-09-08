package com.ccaiw.weixinapp.service;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.ccaiw.weixinapp.common.WxToken;
import com.ccaiw.weixinapp.model.Subri;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.LogKit;
import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class AppService {
	Log logger = Log.getLog(AppService.class);
	private static WxToken wxToken;
	private static String appid = "wx01df8f36c93e0e47";
	private static String secret = "8be7d8d4615fba1d726cce81e6b85515";
	private static String template_id = "ujy4D6iyQjHjF_k_X2d2qR3z9LZ5FzvkV3sPNKsbpSc";

	public String getOpenid(String usercode) {
		String tokenJson = HttpKit.get("https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret="
				+ secret + "&js_code=" + usercode + "&grant_type=authorization_code");
		LogKit.info(tokenJson);
		Record openid=new Record();
		openid.set("code", usercode);
		openid.set("openid", tokenJson);
		Db.save("openid", openid);
		return JSON.parseObject(tokenJson).getString("openid");
	}

	public String getToken() {
		synchronized (appid) {
			if (wxToken == null || wxToken.getUptime() < System.currentTimeMillis() - (2 * 60 * 60 * 1000)) {
				String tokenJson = HttpKit
						.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid
								+ "&secret=" + secret);
				LogKit.info(tokenJson);
				String access_token = JSON.parseObject(tokenJson).getString("access_token");
				this.wxToken = new WxToken(access_token);
			}
		}

		return wxToken.getToken();
	}

	public void subri(String nickname, String no, String touser, String formid) {
		Subri subri = new Subri();
		subri.set("nickname", nickname);
		subri.set("no", no);
		subri.set("touser", touser);
		subri.set("formid", formid);
		subri.save();

	}

	public String sendMsg(Subri subri, String money) {
		String url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + getToken();
		Map params = new HashMap<String, String>();
		params.put("touser", subri.getStr("touser"));
		params.put("template_id", template_id);
		params.put("form_id", subri.getStr("formid"));
		params.put("page", "pages/index/subri?no=" + subri.getStr("no"));
		Map data = new HashMap<>();
		Map keyword1 = new HashMap<>();
		Map keyword2 = new HashMap<>();
		keyword1.put("value", money);
		keyword2.put("value", subri.getStr("no"));
		data.put("keyword1", keyword1);
		data.put("keyword2", keyword2);
		params.put("data", data);
		String res = HttpKit.post(url, JSON.toJSONString(params));
		LogKit.info(res);
		return res;
	}
}
