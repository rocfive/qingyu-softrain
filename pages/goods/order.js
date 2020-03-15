// pages/goods/order.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponId:"",
    cardId:"",
    couponoption:true,
    cardoption:true,
    price:[],
  },
  pay:function(){    
    var that = this;
    
    app.network.request1({
      url: url + "order/create",
      method: "POST",
      data: { 
        product_type: that.data.ordermsg.product_type, 
        store_id: that.data.ordermsg.store_id, 
        store_teach_id: that.data.ordermsg.store_teach_id,
        key: that.data.orderKey, 
        couponId: that.data.couponId,
        cardId: that.data.cardId,
        froms:"routine",
        order_time: that.data.ordermsg.order_time,
        real_name: that.data.ordermsg.real_name,
        phone: that.data.ordermsg.user_phone,
        duration: that.data.ordermsg.duration
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress=res.data.data.result;
          wx.reLaunch({
            url: 'pay?orderId=' + ress.orderId + '&key=' + ress.key+'&is_pay='+that.data.price.is_pay,
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
  computed: function () {
    var that = this;

    app.network.request1({
      url: url + "order/computed",
      method: "POST",
      data: { product_type: that.data.ordermsg.product_type, store_id: that.data.ordermsg.store_id, store_teach_id: that.data.ordermsg.store_teach_id, key: that.data.orderKey, couponId: that.data.couponId, cardId: that.data.cardId},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            price: res.data.data
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
  getMsg: function () {
    var that = this;

    app.network.request1({
      url: url + "order/confirm",
      method: "POST",
      data: that.data.ordermsg,
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress = res.data.data;

          that.setData({
            cartInfo: ress.cartInfo,
            teach: ress.teach,
            menshop: ress.menshop,
            coupon_choosable:ress.usableCoupon?true:false,  //优惠券是否可选
            card_choosable:ress.usableCard?true:false,   //项目卡是否可选
            // coupon_price: ress.usableCoupon?ress.usableCoupon.coupon_price:"",
            // couponId: ress.usableCoupon?ress.usableCoupon.id:"",
            // usableCard: ress.usableCard ? ress.usableCard:"",
            orderKey: ress.orderKey, 
          })   
          that.computed();
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 点击优惠券更多
  coupon:function(){
    wx.navigateTo({
      url: 'coupon?money=' + this.data.ordermsg.money + '&couponid=' + this.data.couponId,
    })
  },
  // 点击项目卡更多
  card:function(){
    wx.navigateTo({
      url: 'cardlist?pid=' + this.data.ordermsg.productId + '&order_time=' + this.data.ordermsg.order_time + '&unique=' + this.data.ordermsg.uniqueId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ordermsg: JSON.parse(options.ordermsg)
    })
    console.log(this.data.ordermsg)
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
    return {
      path: '/pages/index/index?scene=' + (wx.getStorageSync("shareid") ? wx.getStorageSync("shareid") : "")
    }
  }
})