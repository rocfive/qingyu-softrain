// pages/staff/index.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: [
      { article_title: "这里是内容或您想写的内容!!!" }
    ]
  },
  toback(){
    wx.switchTab({
      url: '../myzoe/index',
    })
  },
  // 公告列表
  toheadlinelist:function(){
    wx.navigateTo({
      url: '../business/notice?forms=staff',
    })
  },
  // 公告详情
  toheadlinedetail:function(e){
    wx.navigateTo({
      url: '../business/noticed?forms=staff&id='+e.currentTarget.dataset.id,
    })
  },
  // 提现
  tx:function(){
    wx.navigateTo({
      url: 'tx',
    })
  },
  getMsg: function () {
    var that = this;

    app.network.request3({
      url: url + "employee/info",
      method: "GET",
      data: {},
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
  getnotice:function(){
    var that=this;

    app.network.request3({
      url: url + "employee/hot_notice_list",
      method: "GET",
      data: { page: 0, limit:5},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            noticeList: res.data.data
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
  codescan: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        var result = res.result;

        app.network.request3({
          url: url + "employee/order/get_order_by_verific",
          method: "POST",
          data: { verify_code: result },
          success: function (res) {
            console.log(res)
            if (res.data.status == 200) {
              wx.navigateTo({
                url: '../business/orderdetail?forms=scan&role=staff&id=' + res.data.msg + '&verify_code=' + result,
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
    this.getMsg();
    this.getnotice();
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