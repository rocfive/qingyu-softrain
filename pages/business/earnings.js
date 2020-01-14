// pages/business/earnings.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  bindDate:function(e){
    this.setData({
      choseDate: e.detail.value
    })
    this.getTotal();
    this.getList();
  },
  // 获取收益总额
  getTotal:function(){
    var that=this;

    if (that.data.options.forms =="staff"){
      app.network.request3({
        url: url + "employee/earnings_total",
        method: "POST",
        data: { time: that.data.choseDate },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              total: res.data.msg
            })
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.msg,
            })
          }
        }
      })
    }else{
      app.network.request2({
        url: url + "menshop/earnings_total",
        method: "POST",
        data: { time: that.data.choseDate },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              total: res.data.msg
            })
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.msg,
            })
          }
        }
      })
    }
    
  },
  getList:function(){
    var that=this;

    if (that.data.options.forms == "staff"){
      app.network.request3({
        url: url + "employee/earnings_log",
        method: "POST",
        data: { time: that.data.choseDate },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              list: res.data.data
            })
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.msg,
            })
          }
        }
      })
    }else{
      app.network.request2({
        url: url + "menshop/earnings_log",
        method: "POST",
        data: { time: that.data.choseDate },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              list: res.data.data
            })
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.msg,
            })
          }
        }
      })
    }    
  },
  appendZero:function(obj) {
    if(obj<10) return "0" + "" + obj;
    else return obj;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var oDate=new Date();
    this.setData({
      nowDate: oDate.getFullYear() + '-' + this.appendZero(oDate.getMonth()+1),
      choseDate: oDate.getFullYear() + '-' + this.appendZero(oDate.getMonth() + 1),
      options:options
    })
    this.getTotal();
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})