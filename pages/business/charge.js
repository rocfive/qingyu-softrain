// pages/business/charge.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1
  },
  getList:function(){
    var that = this;

    if (that.data.options.forms == "staff"){
      app.network.request3({
        url: url + "employee/verific_log",
        method: "GET",
        data: { page: that.data.page, limit: 20 },
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
        url: url + "menshop/verific_log",
        method: "GET",
        data: { page: that.data.page, limit: 20 },
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
  detail: function (e) {
    wx.navigateTo({
      url: 'orderdetail?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options:options
    })
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