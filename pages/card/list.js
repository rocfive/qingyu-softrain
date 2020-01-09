// pages/card/list.js
const app = getApp()
var url = getApp().globalData.url, timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    page:1
    // menus:[
    //   { id: 0, name: "项目分类一"},
    //   { id: 1, name: "项目分类二" },
    //   { id: 2, name: "项目分类三" },
    //   { id: 3, name: "项目分类四" },
    //   { id: 4, name: "项目分类五" }
    // ]
  },
  changeTab:function(e){
    this.setData({
      active:e.currentTarget.dataset.id
    })
    this.getList();
  },
  detail:function(e){
    wx.navigateTo({
      url: '../goods/detail?id='+e.currentTarget.dataset.id,
    })
  },
  getMenu:function(){
    var that=this;

    app.network.request({
      url: url + "product/card_category",
      method: "GET",
      data: { hot: that.data.hot},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress = res.data.data;
          that.setData({
            menus:res.data.data,
            active: res.data.data[0].p_id
          })
          that.getList();
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  getList:function(){
    var that=this;

    app.network.request({
      url: url + "product/card_list",
      method: "GET",
      data: { hot: that.data.hot, pid: that.data.active, page: that.data.page, limit:20},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress = res.data.data;
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
    this.setData({
      hot:options.hot?options.hot:0
    })
    this.getMenu();
    if (options.hot){
      wx.setNavigationBarTitle({
        title: '热门项目卡',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '项目卡',
      })
    }
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