// pages/goods/pay.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getgopay:function(){
    var that=this;

    app.network.request1({
      url: url + "order/gopay",
      method: "POST",
      data: { uni: that.data.key},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress=res.data.data;

          that.setData({
            ordersn:ress.ordersn,
            pay_price: ress.pay_price,
            no_money: ress.no_money,
            yue_pay: ress.yue_pay,
            wechat_pay: ress.wechat_pay
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
  chosetype:function(e){
    this.setData({
      paytype:e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId,
      key: options.key
    })
    this.getgopay();
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