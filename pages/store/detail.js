// pages/store/detail.js
const app = getApp()
var url = getApp().globalData.url, timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,        
  },
  engineerchange:function(e){
    this.setData({
      current: e.detail.current
    })
  },
  getMsg: function () {
    var that = this;

    app.network.request({
      url: url + "shop_detail",
      method: "GET",
      data: {id:that.data.id},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            menshop: res.data.data.menshop,
            hot_product: res.data.data.hot_product,
            teach_list: res.data.data.teach_list,
            slider_image: JSON.parse(res.data.data.menshop.slider_image)
          })
          wx.setNavigationBarTitle({
            title: res.data.data.menshop.name,
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
  // 点击咨询
  toCall:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },
  // 导航
  toMap: function (e) {
    var that = this;
    var lx = JSON.parse(e.currentTarget.dataset.lat),
      ly = JSON.parse(e.currentTarget.dataset.lng);

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res)
        wx.openLocation({
          latitude: lx,
          longitude: ly,
          scale: 18
        })
      }
    })
  },
  // 点击抢购
  chosespec: function (e) {
    this.setData({
      goodsid: e.currentTarget.dataset.id
    })
    let myComponent = this.selectComponent('#spec');
    myComponent.getMsg();
  },
  todetail:function(e){
    wx.navigateTo({
      url: '../goods/detail?id='+e.currentTarget.dataset.id,
    })
  },
  // 点击门店环境
  piclist:function(){
    wx.navigateTo({
      url: 'piclist?imglist=' + JSON.stringify(this.data.slider_image),
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