// pages/index/yue.js
Page({
  data:{
    data:{},
    data1:{},
    no:""
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    that.setData({no:options.no})
      var that = this
    console.info(this.data)
     wx.request({
      url: 'https://hv5.basiapp.com/MyCard/GetYeYc',
      data: {cardno:this.data.no},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      //"X-Requested-With":"XMLHttpRequest",
       header:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/x-www-form-urlencoded"},
      success: function(res){
        console.info(res)
          that.setData({data:res.data});
      
      }
    }) 

      wx.request({
      url: 'https://hv5.basiapp.com/MyCard/GetTopUp',
      data: {cardno:this.data.no},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
       header:{"Content-Type":"application/x-www-form-urlencoded"},
      success: function(res){
        if(res.data.status==101){
          that.setData({data1:res.data});
        }
      }
    }) 
  },
 bindSearch:function(){
   wx.navigateTo({
            url: 'xiaofei?no='+this.data.no
          })
 },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },onShareAppMessage:function(){
     return {
      title: '成都公交卡查询',
      desc: '成都公交卡次数、余额、消费详情查询!',
      path: '/pages/index/index'
    }
  }
})