//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    no:"16114544",
    history:[]
  },
  cardinput:function(e){
    this.setData({
      no:e.detail.value
    })
  },
  bindSearch:function(){
    if (this.data.no==""){
      wx.showToast({ title: "卡号不能为空" })
      return;
    }
    if (this.data.no.length != 8) {
      wx.showToast({ title: "卡号长度为8位" })
      return;
    }
     
     if(this.data.history.indexOf(this.data.no)==-1){
         if(this.data.history.length>=6)
            this.data.history.pop();
         this.data.history.unshift(this.data.no);
      }else{
       this.data.history.splice(this.data.history.indexOf(this.data.no),1);
        this.data.history.unshift(this.data.no);
      }
       wx.setStorageSync('history', this.data.history);
     wx.navigateTo({
            url: 'yue?no='+this.data.no
          });
     
  },
  bindSearch1:function(event){
    this.setData({
      no: event.currentTarget.dataset.no
    });
      this.bindSearch();
  },
  onLoad: function () {
    var that = this;
  var history = wx.getStorageSync('history');
  if (history&&history.length>0) {
     this.setData({
      history:history,
      no: history[0]
    })
  }
  },
  onShareAppMessage:function(){
     return {
      title: '成都公交卡查询',
      desc: '成都公交卡次数、余额、消费详情查询!',
      path: '/pages/index/index'
    }
  }
})
