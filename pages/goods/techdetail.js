// pages/goods/techdetail.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    limit:20
  },
  // 获取评论
  getcomment(){
    var that = this;

    console.log(that.data.page)
    app.network.request({
      url: url + "teach_comment",
      method: "GET",
      data: { id: that.data.id, page: that.data.page, limit: that.data.limit },
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
  // 获取技师详情
  getMsg:function(){
    var that=this;

    app.network.request({
      url: url + "teach_detail",
      method: "GET",
      data: { id: that.data.id},
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getMsg();
    this.getcomment();
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
    var that = this, page=that.data.page;

    that.setData({
      page: page++
    })
    that.getcomment();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})