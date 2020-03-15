// pages/goods/coupon.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 不使用优惠券
  notuse:function(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.setData({
      couponId:"",
      coupon_price:"",
      cardoption:true  //设置项目卡可选
    })
    prevPage.computed();
    wx.navigateBack()
  },
  getList: function (price){
    var that=this;

    app.network.request1({
      url: url + "coupons/order",
      method: "GET",
      data: { price: price},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress = res.data.data;

          that.setData({
            list:ress
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
  // 选择优惠券
  usecoupon:function(e){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.setData({
      couponId:e.currentTarget.dataset.id,
      coupon_price: e.currentTarget.dataset.num,
      cardoption:false  //设置项目卡不可选
    })
    prevPage.computed();
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      couponid: options.couponid
    })
    this.getList(options.money)
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