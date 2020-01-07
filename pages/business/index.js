// pages/business/index.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 点击提现
  tx:function(){
    wx.navigateTo({
      url: 'withdraw',
    })
  },
  toback:function(){
    wx.switchTab({
      url: '../myzoe/index',
    })
  },
  getbusiness:function(){
    var that=this;

    app.network.request2({
      url: url + "mslogin",
      method: "POST",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          
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
    this.getbusiness();
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