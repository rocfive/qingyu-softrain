// pages/business/withdraw.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getMoney:function(){
    var that=this;

    app.network.request2({
      url: url + "menshop/getfield",
      method: "GET",
      data: { fields:"now_money"},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            now_money:res.data.msg
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
  // 提现
  withdraw:function(){
    var that=this;

    app.network.request2({
      url: url + "menshop/menshop_withdraw",
      method: "POST",
      data: { money: that.data.now_money },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: '提现成功',
          })
          timer=setTimeout(function(){
            that.getMoney();
          },2000)
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
    this.getMoney();
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
    clearTimeout(timer)
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