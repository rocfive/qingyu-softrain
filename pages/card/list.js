// pages/card/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    menus:[
      { id: 0, name: "项目分类一"},
      { id: 1, name: "项目分类二" },
      { id: 2, name: "项目分类三" },
      { id: 3, name: "项目分类四" },
      { id: 4, name: "项目分类五" }
    ]
  },
  detail:function(){
    wx.navigateTo({
      url: '../goods/detail',
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