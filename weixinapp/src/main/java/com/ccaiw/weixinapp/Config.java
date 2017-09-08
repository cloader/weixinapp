package com.ccaiw.weixinapp;

import com.ccaiw.weixinapp.controller.ChengduAppController;
import com.ccaiw.weixinapp.model.Subri;
import com.ccaiw.weixinapp.task.QuartzPlugin;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.template.Engine;

public class Config extends JFinalConfig{

	@Override
	public void configConstant(Constants me) {
		// TODO Auto-generated method stub
		me.setDevMode(true);
	}

	@Override
	public void configRoute(Routes me) {
		me.add("/chengduapp", ChengduAppController.class);
	}

	@Override
	public void configEngine(Engine me) {
		// TODO Auto-generated method stub
	}

	@Override
	public void configPlugin(Plugins plugins) {
		// TODO Auto-generated method stub
		loadPropertyFile("application.properties");
		DruidPlugin dp = new DruidPlugin(getProperty("jdbc_url"), getProperty("jdbc_usr"), getProperty("jdbc_pwd"));
		ActiveRecordPlugin arp = new ActiveRecordPlugin(dp);
		arp.addMapping("subri", Subri.class);
		plugins.add(dp);
		plugins.add(arp);
		plugins.add(new QuartzPlugin());
	}

	@Override
	public void configInterceptor(Interceptors me) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configHandler(Handlers me) {
		// TODO Auto-generated method stub
		
	}
	
	public static void main(String[] args) {
		JFinal.start("src/main/webapp", 80, "/weixinapp", 5);
	}

}
