// pages/goods/cardlist.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getList:function(){
    var that=this;

    app.network.request1({
      url: url + "cards/order",
      method: "GET",
      data: that.data.options,
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
  // 选择项目卡
  choseCard:function(e){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.setData({
      cardId:this.data.list[e.currentTarget.dataset.id].id,
      usableCard: this.data.list[e.currentTarget.dataset.id],
      couponoption:false  //设置优惠券不可选
    })
    prevPage.computed();
    wx.navigateBack()
  },
  // 不使用项目卡
  notuse:function(){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.setData({
      cardId:"",
      usableCard:"",
      couponoption:true  //设置优惠券可选
    })
    prevPage.computed();
    wx.navigateBack()
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
    return {
      path: '/pages/index/index?scene=' + (wx.getStorageSync("shareid") ? wx.getStorageSync("shareid") : "")
    }
  }
})