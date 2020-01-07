// pages/myzoe/index.js
const app = getApp()
var url = getApp().globalData.url, timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false
  },
  order:function(e){
    app.globalData.showOrdercur=e.currentTarget.dataset.id;
    wx.switchTab({
      url: 'orderlist',
    })
  },
  // 充值
  recharge:function(){
    wx.navigateTo({
      url: 'recharge',
    })
  },
  // 售后
  aftersale:function(){
    wx.navigateTo({
      url: 'aftersale',
    })
  },
  // 点击我的分销
  commission:function(){
    // wx.navigateTo({
    //   url: 'retail',
    // })
    wx.navigateTo({
      url: '../commission/index',
    })
  },
  getUser:function(){
    var that=this;

    app.network.request1({
      url: url + "user",
      method: "GET",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            msg:res.data.data,
            islogin:true
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
  login:function(){
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    if (wx.getStorageSync('token')){
      this.getUser();
    }
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