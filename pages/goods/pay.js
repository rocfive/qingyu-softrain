// pages/goods/pay.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paytype: "weixin"
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
            wechat_pay: ress.wechat_pay,
            wait_time: ress.wait_time
          })
          if(that.data.is_pay==1){
            // 如果支付金额为零，自动支付
            app.network.request1({
              url: url + "order/pay2",
              method: "POST",
              data: {uni: ress.ordersn, paytype: "yue"},
              success: function (res) {
                console.log(res)
                if (res.data.status == 200) {
                  wx.showToast({
                    title: res.data.msg,
                  })
                  wx.redirectTo({
                    url: '/pages/myzoe/orderdetail?id=' + ress.ordersn,
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
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  //选择支付方式
  chosetype:function(e){
    this.setData({
      paytype:e.currentTarget.dataset.id
    })
  },

  //确定支付
  takeorder:function(e){
    let uni = this.data.ordersn;
    let paytype = this.data.paytype;
    let froms = 'routine';
    if(!paytype){
      wx.showToast({
        icon: "none",
        title: "请选择支付方式",
      })
      return;
    }
    app.network.request1({
      url: url + "order/pay",
      method: "POST",
      data: { uni: uni, paytype: paytype,froms:froms },
      success: function (res) {
        console.log(res);
        switch (paytype) {
          case 'weixin':
            if (res.data.data.result === undefined){
              wx.showToast({
                icon: "none",
                title: "缺少支付参数",
              })
              return;
            }
            var jsConfig = res.data.data.result.jsConfig;
            wx.requestPayment({
              timeStamp: jsConfig.timestamp,
              nonceStr: jsConfig.nonceStr,
              package: jsConfig.package,
              signType: jsConfig.signType,
              paySign: jsConfig.paySign,
              success: function (res) {
                wx.hideLoading();
                wx.showToast({
                  icon: "success",
                  title: res.msg,
                })
                timer = setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/myzoe/orderdetail?id=' + uni,
                  })
                }, 2000)
              },
              fail: function (e) {
                wx.hideLoading();
                wx.showToast({
                  icon: "none",
                  title: "取消支付",
                })
                timer = setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/myzoe/orderdetail?id=' + uni,
                  })
                }, 2000)
              },
              complete: function (e) {
                wx.hideLoading();
                if (e.errMsg == 'requestPayment:cancel') {
                  wx.showToast({
                    icon: "none",
                    title: "取消支付",
                  })
                  timer = setTimeout(function () {                    
                    wx.redirectTo({
                      url: '/pages/myzoe/orderdetail?id=' + uni,
                    })
                  }, 2000)
                }
              },
            });
            break;
          case 'yue':
            if(res.data.status==200){
              wx.showToast({
                icon: "success",
                title: res.data.msg,
              })
              timer = setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/myzoe/orderdetail?id=' + uni,
                })
              }, 2000)
            }else{
              wx.showToast({
                icon: "none",
                title: res.data.msg,
              })
            }
            break;
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId,
      key: options.key,
      is_pay:options.is_pay?options.is_pay:0
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
    return {
      path: '/pages/index/index?scene=' + (wx.getStorageSync("shareid") ? wx.getStorageSync("shareid") : "")
    }
  }
})