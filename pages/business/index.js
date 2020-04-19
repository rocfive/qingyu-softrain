// pages/business/index.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  // 点击提现
  tx:function(){
    wx.navigateTo({
      url: 'withdraw',
    })
  },
  toback:function(){
    wx.switchTab({
      url: '../myzoe/index',
    })
  },
  // 退出登录
  esc:function(){
    wx.showModal({
      title: '提示',
      content: '确定要退出登录',
      success:function(res){
        if(res.confirm){
          wx.showLoading();
          wx.removeStorageSync("mstoken"); 
          wx.switchTab({
            url: '../myzoe/index',
          })
          wx.hideLoading();
        }
      }
    })    
  },
  getbusiness:function(){
    var that=this;

    app.network.request2({
      url: url + "menshop/info",
      method: "GET",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            msg:res.data.data
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
  // 扫码核销 
  codescan:function(){
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        var result = res.result;

        app.network.request2({
          url: url + "menshop/order/get_order_by_verific",
          method: "POST",
          data: { verify_code: result },
          success: function (res) {
            console.log(res)
            if (res.data.status == 200) {
              wx.navigateTo({
                url: 'orderdetail?forms=scan&role=business&id=' + res.data.msg + '&verify_code=' + result,
              })
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg,
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getbusiness();
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