package com.ccaiw.weixinapp.task;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.alibaba.fastjson.JSON;
import com.ccaiw.weixinapp.model.Subri;
import com.ccaiw.weixinapp.service.AppService;
import com.jfinal.kit.HttpKit;
import com.jfinal.log.Log;
import com.xiaoleilu.hutool.date.DateUnit;
import com.xiaoleilu.hutool.date.DateUtil;

public class ChenDuBusTask implements Job{
	Log logger=Log.getLog(ChenDuBusTask.class);
	AppService appService=new AppService();
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		logger.info("执行task");
		List<Subri> subris=Subri.dao.find("select * from subri where isover=0");
		for(Subri subri:subris){
			String money=getMoney(subri.getStr("no"));
			Date addtime=subri.getDate("addtime");
			Date now=new Date();
			long betw=DateUtil.between(addtime, now, DateUnit.DAY);
			if(Double.parseDouble(money)<10||betw>=6){
				appService.sendMsg(subri,money);
				subri.set("isover", 1).set("money", money).update();
			}
			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
	
	public String getMoney(String no){
		Map<String,String> headers=new HashMap<>();
		String url="https://hv5.basiapp.com/MyCard/GetYeYc";
		headers.put("X-Requested-With", "XMLHttpRequest");
		headers.put("Content-Type", "application/x-www-form-urlencoded");
		String res=HttpKit.post(url, null, "cardno="+no, headers);
		logger.info(res);
		return JSON.parseObject(res).getString("remainMoney");
	}
}
