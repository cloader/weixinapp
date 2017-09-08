package com.ccaiw.weixinapp.common;

public class WxToken {
	private String token;
	private long uptime;
	public WxToken(String token){
		this.token=token;
		this.uptime=System.currentTimeMillis();
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public long getUptime() {
		return uptime;
	}
	public void setUptime(long uptime) {
		this.uptime = uptime;
	}
}
