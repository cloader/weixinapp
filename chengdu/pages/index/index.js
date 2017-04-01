//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    no:"16114544"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  cardinput:function(e){
    this.setData({
      no:e.detail.value
    })
  },
  bindSearch:function(){
     wx.navigateTo({
            url: 'yue?no='+this.data.no
          })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    wx.request({
      url: 'https://ccaiw.picp.net:5000/webman/index.cgi',
      data: {cardno:"123"},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
       header:{"Content-Type":"application/x-www-form-urlencoded"},
      // dataType:"application/x-www-form-urlencoded",
      success: function(res){
        console.info(res)
        if(res.statusCode==200&&res.data.status==101){
          that.setData({data:res.data});
        }
      }
    }) 
  },
  onShareAppMessage:function(){
     return {
      title: '成都公交卡查询',
      desc: '成都公交卡次数、余额、消费详情查询!',
      path: '/pages/index/index'
    }
  }
})
