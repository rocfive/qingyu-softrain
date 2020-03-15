// pages/business/noticed.js
const app = getApp()
var url = getApp().globalData.url, timer;
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1
  },
  getMsg: function (id) {
    var that = this;

    app.network.request({
      url: url + "notice_detail",
      method: "GET",
      data: { id: that.data.id },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            title: res.data.data.title,
            add_time: res.data.data.add_time
          })
          var content = res.data.data.content;
          WxParse.wxParse('content', 'html', content, that, 5);

        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  changeTab:function(e){
    this.setData({
      type:e.currentTarget.dataset.id
    })
    this.readnum();
  },
  // 阅读记录
  readnum:function(){
    var that=this;

    app.network.request2({
      url: url + "menshop/sel_logs",
      method: "POST",
      data: { aid: that.data.id, type: that.data.type},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            list:res.data.data
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 增加阅读记录
  addread:function(){
    var that=this;

    app.network.request3({
      url: url + "employee/add_log",
      method: "POST",
      data: { id: that.data.id},
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options:options,
      id: options.id
    })
    this.getMsg();
    if (options.forms == "staff"){
      this.addread();
    }else{
      this.readnum();
    }    
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
    return {
      path: '/pages/index/index?scene=' + (wx.getStorageSync("shareid") ? wx.getStorageSync("shareid") : "")
    }
  }
})