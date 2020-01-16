// pages/staff/onoff.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 开关
  switchtime:function(e){
    this.setData({
      open: this.data.open==1?0:1
    })
  },
  // 获取页面信息
  getMsg: function () {
    var that = this;

    app.network.request3({
      url: url + "employee/leave",
      method: "POST",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            open: res.data.data.open,
            st: res.data.data.st,
            et: res.data.data.et,
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
  // 不足两位补0
  appendZero: function (obj) {
    if (obj < 10) return "0" + "" + obj;
    else return obj;
  },
  // 开始时间
  changest:function(e){
    this.setData({
      st:e.detail.value
    })
  },
  // 结束时间
  changeet:function(e){
    this.setData({
      et:e.detail.value
    })
  },
  // 点击确定
  confirm:function(){
    var that=this;

    app.network.request3({
      url: url + "employee/leave_edit",
      method: "POST",
      data: { start_time: (that.data.open == 1 ? that.data.st : ""), end_time: (that.data.open == 1 ? that.data.et:"")},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: '设置成功',
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
    var oDate=new Date();
    this.setData({
      nowDate: oDate.getFullYear() + '-' + this.appendZero(oDate.getMonth() + 1) + '-' + this.appendZero(oDate.getDate())
    })
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

  }
})