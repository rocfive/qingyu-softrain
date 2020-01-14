// pages/business/orderdetail.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noscan:true
  },
  getDetail:function(){
    var that=this;

    app.network.request2({
      url: url + "menshop/order/detail",
      method: "GET",
      data: { uni: that.data.uni },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            msg: res.data.data
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
  // 点击核销
  scan:function(){
    var that=this;

    app.network.request2({
      url: url + "menshop/order/order_verific",
      method: "POST",
      data: { verify_code: that.data.options.verify_code, is_confirm:1 },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: '核销成功'
          })
          timer=setTimeout(function(){
            that.setData({
              noscan:false
            })
            that.getDetail();
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
  // 取消核销
  toback:function(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options,
      uni: options.id
    })
    this.getDetail();  
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