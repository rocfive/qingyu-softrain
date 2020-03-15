// pages/goods/detail.js
const app = getApp()
var url = getApp().globalData.url, interval;
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    countDownHour: '00',
    countDownMinute: '00',
    countDownSecond: '00',
    secKillId:0, //秒杀id默认为零
    productAttr:[],
  },
  // 立即预约
  chosespec:function(){
    let myComponent = this.selectComponent('#spec');
    myComponent.getMsg();
  },
  getMsg:function(){
    var that=this;

    app.network.request({
      url: url + "product/detail",
      method: "GET",
      data: { id: that.data.id },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            productAttr: res.data.data.productAttr,
            msg: res.data.data.storeInfo,
            productValue: res.data.data.productValue
          }) 
          var content = res.data.data.storeInfo.description;
          WxParse.wxParse('content', 'html', content, that, 5);  
 
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 商品图切换
  changebanner:function(e){
    this.setData({
      current:e.detail.current
    })
  },
  getSeckillMsg: function (time) {
    var that = this;

    app.network.request({
      url: url + "seckill/detail",
      method: "GET",
      data: { id: that.data.id, time: that.data.options.times },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress=res.data.data;
          that.setData({
            msg: ress.storeInfo,
            secKillId:ress.storeInfo.id,
            contro:ress.contro
          })
          var content = res.data.data.storeInfo.description;
          WxParse.wxParse('content', 'html', content, that, 5);
          that.countdown(ress.storeInfo.stop_time,that)
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 倒计时
  countdown: function (timeStamp, that){
    console.log(timeStamp)

    var totalSecond = timeStamp - Date.parse(new Date()) / 1000;
    interval = setInterval(function () {
      // 秒数  
      var second = totalSecond;

      // 小时位  
      var hr = Math.floor(second / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位  
      var min = Math.floor((second - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位  
      var sec = second - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      that.setData({
        countDownHour: hrStr,  //时
        countDownMinute: minStr, //分
        countDownSecond: secStr, //秒
      });
      totalSecond--;
      if (totalSecond <= 0) {
        clearInterval(interval);
        wx.showToast({
          title: '活动已结束',
          icon: 'none',
          duration: 1000,
          mask: true,
        })
        that.setData({
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(that), 1000);
  },
  // 购买项目卡
  takeorder: function () {
    var that=this;

    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
      return false;
    }
    if (that.data.productAttr.length != 0 && (!that.data.checkbox || (that.data.checkbox.length < that.data.productAttr.length))){
      wx.showToast({
        icon:"none",
        title: '请选择规格！',
      })
      return false;
    }    
    var order={
      productId: that.data.id,
      product_type: that.data.msg.type,
      store_id: "",
      store_name: "",      
      uniqueId:"",
      checkval: "",
      money: that.data.msg.price,
      real_name:"",
      user_phone: "",
      secKillId: that.data.secKillId,
      cardId: that.data.options.cardId?that.data.options.cardId:"",
      duration: that.data.msg.duration,
      order_time: ""
    }
    app.network.request1({
      url: url + "cart/add",
      method: "POST",
      data: order,
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          order.cartId = res.data.data.cartId;
          wx.navigateTo({
            url: 'order?ordermsg=' + JSON.stringify(order),
          })
          // wx.reLaunch({
          //   url: 'order?ordermsg=' + JSON.stringify(ordermsg),
          // })
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
    this.setData({
      options: options,
      id:options.id
    })
    wx.setNavigationBarTitle({
      title: wx.getStorageSync("appname"),
    })
    if (options.isseckill==1){
      this.getSeckillMsg();
    }else{
      this.getMsg();
    }    
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
    clearInterval(interval)
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