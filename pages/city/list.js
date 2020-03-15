// pages/city/list.js
const app = getApp()
var url = getApp().globalData.url, qqmapwx = require('../../utils/qqmap-wx-jssdk.min.js'), qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  // 搜索关键字
  keyword:function(e){
    var that=this;

    that.setData({
      keyword:e.detail.value
    })
    app.network.request({
      url: url + "select_city",
      method: "GET",
      data: { keyword: e.detail.value},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            searchlist:res.data.data
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
  // 删除关键字
  delkeyword:function(){
    console.log(111)
    this.setData({
      keyword:""
    })
  },
  // 滚动
  changeView: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      scrollView: index
    })
  },
  // 选择城市
  chosecity: function (e) {
    var that = this;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    
    geocoder(e.currentTarget.dataset.name);    

    function geocoder(address) {
      qqmapsdk.geocoder({
        //获取表单传入地址
        address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
        success: function (res) {//成功后的回调
          var res = res.result;
          //根据地址解析在地图上标记解析地址位置
          wx.setStorageSync('latitude', res.location.lat);
          wx.setStorageSync('longitude', res.location.lng);
          wx.setStorageSync('cityname', address);
          prevPage.setData({
            cityname: e.currentTarget.dataset.name
          });
          prevPage.getMsg(res.location.lat, res.location.lng);
          wx.navigateBack();
        },
        fail: function (error) {
          console.error(error);
        },
        complete: function (res) {
        }
      })
    };
  },
  // 选择当前城市
  choseLocal:function(e){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.getCity();
    wx.navigateBack();
  },
  getCity:function(){
    var that=this;

    app.network.request({
      url: url + "citys",
      method: "GET",
      data: {  },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            citylist: res.data.data.citylist,
            hotlist: res.data.data.hotlist
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
    qqmapsdk = new qqmapwx({
      key: 'DSHBZ-SCWW4-OHHUF-DRND6-C57GS-SXBUH'
    });
    this.setData({
      local: wx.getStorageSync('localcity'),
      local1: wx.getStorageSync("cityname")
    })
    console.log(wx.getStorageSync("cityname"))
    this.getCity();
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