// pages/goods/searchlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfocus:true,  //初始化自动获得焦点
    index:0,
    types:[
      { id: "0", name:"项目"},
      { id: "1", name: "项目卡" },
      { id: "2", name: "门店" },
      { id: "3", name: "技师" }
    ],
    nolist:false
  },
  bindtypes:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  // 点击取消
  cancle:function(){
    wx.navigateBack()
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