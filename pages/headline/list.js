// pages/headline/list.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  detail:function(e){
    wx.navigateTo({
      url: 'detail?id='+e.currentTarget.dataset.id,
    })
  },
  getBanner:function(){
    var that=this;

    app.network.request({
      url: url + "notice_banner",
      method: "GET",
      data: {},
      success: function (res) {
        // console.log(res)
        if (res.data.status == 200) {
          that.setData({
            banner:res.data.data
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
  getList: function (page, limit){
    var that = this;

    app.network.request({
      url: url + "notice_list",
      method: "GET",
      data: { store_id: 0, page: page, limit: limit},
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner();
    this.getList(1,20);
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