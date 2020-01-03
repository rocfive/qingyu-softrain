// pages/store/chose.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  chose:function(e){
    var that = this, list = that.data.list, store_id = e.currentTarget.dataset.id;

    that.setData({
      store_id: store_id
    })
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    for(var i=0; i<list.length; i++){
      if(list[i].id==store_id){
        prevPage.setData({
          store_id: store_id,
          store_name: list[i].name,
          start_time: list[i].start_time,
          end_time: list[i].end_time
        })
        wx.navigateBack();
      }
    }
    
  },
  detail: function (e) {
    wx.navigateTo({
      url: 'detail?id=' + e.currentTarget.dataset.id,
    })
  },
  getList: function (lat, lng) {
    var that = this;

    app.network.request({
      url: url + "shop_list",
      method: "GET",
      data: { lat: lat, lng: lng, },
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
  // 拨打电话
  toCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(wx.getStorageSync('latitude'), wx.getStorageSync('longitude'));
    this.setData({
      store_id: options.store_id
    })
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