package com.ccaiw.weixinapp.controller;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.ccaiw.weixinapp.service.AppService;
import com.jfinal.core.Controller;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.LogKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class ChengduAppController extends Controller {
	AppService appService=new AppService();

	public void index() {
		LogKit.info(getPara());
		Record record = new Record();
		record.set("cardno", getPara("cardno"));
		record.set("nickname", getPara("nickname"));
		Db.save("logs", record);
		renderJson("{message:'ok'}");
	}

	public void token() {
		String token = appService.getToken();
		LogKit.info(token);
		renderText(token);
	}

	public void openid() {
		String code = getPara("code");
		String openid = appService.getOpenid(code);
		LogKit.info(openid);
		renderText(openid);
	}

	public void subri() {
		String usercode=getPara("usercode");
		String form_id=getPara("form_id");
		String no=getPara("no");
		String touser=getPara("openid");
		String nickname=getPara("nickname");
		if(touser==null){
			renderText("订阅失败 ,请重试!");
			return;
		}else{
			appService.subri(nickname, no, touser, form_id);
			renderText("订阅成功.");
		}
		
	}
}
