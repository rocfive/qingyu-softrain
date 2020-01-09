// pages/business/itemrecord.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timetype:1,
    year: ""
  },
  changeTab:function(e){
    this.setData({
      timetype: e.currentTarget.dataset.id,
      year:""
    })
    this.getList();
  },
  // 选择月
  changeyear:function(e){
    this.setData({
      timetype:0,
      year:this.data.times[e.detail.value].time
    })
    this.getList();
  },
  // 获取门店品项统计时间段
  getTime: function () {
    var that = this;

    app.network.request2({
      url: url + "menshop/product_statics_time",
      method: "GET",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            times: res.data.data
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
  getList: function (){
    var that=this;

    app.network.request2({
      url: url + "menshop/product_statics",
      method: "POST",
      data: { timetype: that.data.timetype, time:that.data.year},
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
    this.getTime();
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