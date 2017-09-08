//app.js
App({
   onLaunch: function () {
   
  },
  
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (usr) {
          that.globalData.userInfo = usr;
          wx.request({
            url: 'https://api.5doutu.com/weixinapp/chengduapp/openid',
            data: { code: usr.code },
            method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            //"X-Requested-With":"XMLHttpRequest",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              that.globalData.userInfo.openid = res.data;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          })
          
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})