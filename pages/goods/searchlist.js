// pages/goods/searchlist.js
const app = getApp()
var url = getApp().globalData.url, timer;
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
    keyword:'',
    nolist:false
  },
  bindtypes:function(e){
    this.setData({
      index: e.detail.value
    },()=>{
      this.search();
    })    
  },
  // 点击取消
  cancle:function(){
    wx.navigateBack()
  },
  keyword:function(e){
    this.setData({
      keyword: e.detail.value,
    })
  },
  search:function(){
    var that=this;
    var postData={
      keyword: that.data.keyword,
      type:that.data.index
    }
    app.network.request({
      url: url + "serach",
      method: "POST",
      data: postData,
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

  // 商品详情
  todetail: function (e) {
    wx.navigateTo({
      url: '../goods/detail?id=' + e.currentTarget.dataset.id,
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
  // 拨打电话
  toCall: function (e) {
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
  // 技师详情
  detail: function (e) {
    wx.navigateTo({
      url: 'techdetail?id=' + e.currentTarget.dataset.id,
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
    return {
      path: '/pages/index/index?scene=' + (wx.getStorageSync("shareid") ? wx.getStorageSync("shareid") : "")
    }
  }
})