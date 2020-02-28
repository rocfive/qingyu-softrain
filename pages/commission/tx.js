// pages/commission/tx.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txtype:""
  },
  // 选择提现方式
  bindPickerChange:function(e){
    var that = this, typeindex=e.detail.value;

    that.setData({
      typeindex: typeindex,
      txtype: that.data.with_way[typeindex].type,
      typename:that.data.with_way[typeindex].name
    })
  },
  geTextractWay:function(){
    var that=this;

    app.network.request1({
      url: url + "extract/with_way",
      method: "GET",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            commissionCount: res.data.data.commissionCount,
            minPrice: res.data.data.minPrice,
            with_way: res.data.data.with_way
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
  tx:function(e){
    var that=this, oData=e.detail.value;

    console.log(oData)
    if (!oData.money) {
      wx.showToast({
        icon: "none",
        title: '请填写提现金额',
      })
      return false
    }
    if (parseFloat(oData.money) > parseFloat(that.data.commissionCount)){
      wx.showToast({
        icon: "none",
        title: '提现金额不足',
      })
      return false
    }
    if (parseFloat(oData.money) < parseFloat(that.data.minPrice)) {
      wx.showToast({
        icon: "none",
        title: '最小提现金额为' + that.data.minPrice,
      })
      return false
    }
    if (!oData.extract_type){
      wx.showToast({
        icon: "none",
        title: '请选择提现方式',
      })
      return false
    }    
    if (oData.extract_type == "bank" && !oData.cardnum) {
      wx.showToast({
        icon: "none",
        title: '请填写银行卡号',
      })
      return false
    }
    if (oData.extract_type == "bank" && !oData.name) {
      wx.showToast({
        icon: "none",
        title: '请填写持卡人姓名',
      })
      return false
    }
    if (oData.extract_type == "bank" && !oData.bankname) {
      wx.showToast({
        icon: "none",
        title: '请填写开户行',
      })
      return false
    }
    if (oData.extract_type == "alipay" && !oData.alipay_code){
      wx.showToast({
        icon: "none",
        title: '请填写支付宝账号',
      })
      return false
    }
    if (oData.extract_type == "alipay" && !oData.name) {
      wx.showToast({
        icon: "none",
        title: '请填写姓名',
      })
      return false
    }

    app.network.request1({
      url: url + "extract/cash",
      method: "POST",
      data: oData,
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: '提交成功',
          })
          timer=setTimeout(function(){
            wx.navigateBack()
          },2000)
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
    this.geTextractWay();
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