// pages/card/index.js
const app = getApp()
var url = getApp().globalData.url, timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  getMsg: function (lat, lng) {
    var that = this;

    app.network.request({
      url: url + "preferential",
      method: "GET",
      data: { },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress = res.data.data;
          that.setData({
            banner:ress.banner,
            card:ress.card,
            hot_card:ress.hot_card,
            seckill_img: ress.seckill_img
          })
          wx.setNavigationBarTitle({
            title: ress.title,
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
  detail: function (e) {
    wx.navigateTo({
      url: '../goods/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMsg();
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