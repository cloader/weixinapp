//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    no:"16114544"
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
  },
  onShareAppMessage:function(){
     return {
      title: '成都公交卡查询',
      desc: '成都公交卡次数、余额、消费详情查询!',
      path: '/pages/index/index'
    }
  }
})
