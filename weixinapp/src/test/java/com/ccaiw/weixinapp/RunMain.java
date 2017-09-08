/**   
* @Title: RunMain.java 
* @Package com.yba 
* @Description: TODO
* @author SirChen
* @date 2017年3月30日 下午4:25:17 
* @version V1.0   
*/
package com.ccaiw.weixinapp;

import com.jfinal.core.JFinal;

/**
 * @ClassName: RunMain
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author SirChen
 * @date 2017年3月30日 下午4:25:17
 * 
 */
public class RunMain {
	public static void main(String[] args) {
		JFinal.start("src/main/webapp", 80, "/weixinapp", 5);
	}
}
