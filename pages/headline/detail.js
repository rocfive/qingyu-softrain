// pages/headline/detail.js
const app = getApp()
var url = getApp().globalData.url, timer;
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getMsg:function(id){
    var that=this;

    app.network.request({
      url: url + "notice_detail",
      method: "GET",
      data: { id: id },
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMsg(options.id)
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