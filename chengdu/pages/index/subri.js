// pages/index/yue.js
var app = getApp();
Page({
  data: {
    data: {},
    userInfo: {},
    data1: {},
    no: ""
  },
  onLoad: function (options) {
    var that = this;
    that.setData({ no: options.no })
    // 页面初始化 options为页面跳转所带来的参数
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
      wx.request({
        url: 'https://api.5doutu.com/weixinapp/chengduapp',
        data: { cardno: this.data.no, nickname: this.data.userInfo.openid },
        method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        //"X-Requested-With":"XMLHttpRequest",
        header: {
          "X-Requested-With": "XMLHttpRequest"
        },
        success: function (res) {

        }
      })

    });

    wx.request({
      url: 'https://hv5.basiapp.com/MyCard/GetYeYc',
      data: { cardno: this.data.no },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      //"X-Requested-With":"XMLHttpRequest",
      header: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        //console.info(res)
        that.setData({ data: res.data });
      }
    });
    

    /*历史次数查询
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
        **/
  },
  bindSearch: function () {
    wx.navigateTo({
      url: 'xiaofei?no=' + this.data.no
    })
  },
  bindSubri: function (e) {
    var that=this;
    wx.request({
      url: 'https://api.5doutu.com/weixinapp/chengduapp/subri',
      data: { openid: this.data.userInfo.openid, form_id: e.detail.formId, no: this.data.no, nickname: this.data.userInfo.openid },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      //"X-Requested-With":"XMLHttpRequest",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.info(res)
        wx.showToast({
          title: res.data
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }, onShareAppMessage: function () {
    return {
      title: '成都公交卡查询',
      desc: '成都公交卡次数、余额、消费详情查询!',
      path: '/pages/index/index'
    }
  }
})