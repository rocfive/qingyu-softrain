// pages/myzoe/orderlist.js
const app = getApp()
var url = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    active:0,
    verification: true,
  },
  // 订单状态
  changeacitve: function (e) {
    var that = this, id = e.currentTarget.dataset.id;
    that.setData({
      page:1,
      active: e.currentTarget.dataset.id
    })
    app.globalData.showOrdercur = e.currentTarget.dataset.id;
    that.getList();
  },
  detail:function(e){
    wx.navigateTo({
      url: 'orderdetail?id='+e.currentTarget.dataset.id,
    })
  },
  // 生成核销码
  charge: function (e) {
    var that = this;

    that.setData({
      verification: false,
      _verify_code: e.currentTarget.dataset.code,
      codeimg: e.currentTarget.dataset.codeimg
    })
  },
  // 隐藏核销框
  cancle_charge: function () {
    this.setData({
      verification: true
    })
  },
  // 评价
  evaluate:function(){
    wx.navigateTo({
      url: 'evaluate',
    })
  },
  getList:function(){
    var that=this;

    app.network.request1({
      url: url + "order/list",
      method: "GET",
      data: { type: that.data.active, page: that.data.page, limit:20},
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
    this.setData({
      active: app.globalData.showOrdercur
    })
    this.getList();
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