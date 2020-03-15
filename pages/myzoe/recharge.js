// pages/myzoe/recharge.js
const app = getApp()
var url = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  chargemoney:function(e){
    this.setData({
      chargeid:e.currentTarget.dataset.id,
      price: e.currentTarget.dataset.num
    })
  },
  getRule:function(){
    var that=this;

    app.network.request1({
      url: url + "recharge/rule",
      method: "GET",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
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
  getnowmoney:function(){
    var that=this;

    app.network.request1({
      url: url + "getfield",
      method: "GET",
      data: { fields: "now_money"},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          // console.log("1111")
          that.setData({
            now_money: res.data.msg
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
  charge:function(){
    var that=this;

    if (!that.data.chargeid){
      wx.showToast({
        icon:"none",
        title: '请选择充值金额',
      })
      return false;
    }
    app.network.request1({
      url: url + "recharge/routine",
      method: "POST",
      data: { id: that.data.chargeid, price: that.data.price, type:0},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {   
          var ress=res.data.data;       
          wx.requestPayment({
            timeStamp: ress.timestamp,
            nonceStr: ress.nonceStr,
            package: ress.package,
            signType: ress.signType,
            paySign: ress.paySign,
            success: function (res) {
              wx.showToast({
                icon: "success",
                title: res.msg,
              })
              timer = setTimeout(function () {
                that.getnowmoney();
              }, 2000)
            },
            fail: function (res) {
              wx.showToast({
                icon:"none",
                title: "取消支付",
              })
            }          
          });
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
    this.getnowmoney();
    this.getRule();
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