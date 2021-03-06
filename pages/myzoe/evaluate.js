// pages/myzoe/evaluate.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  intcontent:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  // 打分
  rank:function(e){
    this.setData({
      score:e.currentTarget.dataset.id
    })
  },
  orderDetail:function(){
    var that = this;

    app.network.request1({
      url: url + "order/detail",
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
  btnsubmit:function(){
    var that=this;

    if (!that.data.score){
      wx.showToast({
        icon:"none",
        title: '请打分',
      })
      return false
    }
    if (!that.data.content){
      wx.showToast({
        icon:"",
        title: '请对本次服务做出评价',
      })
      return false
    }

    app.network.request1({
      url: url + "order/comment",
      method: "POST",
      data: { 
        unique: that.data.msg.cartInfo[0].unique,
        comment: that.data.content,
        service_score: that.data.score
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: '评价成功',
          })
          timer=setTimeout(function(){
            wx.navigateBack()
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
    this.setData({
      uni: options.id
    })
    this.orderDetail();
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