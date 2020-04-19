// pages/myzoe/orderdetail.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verification:true,
    hidepicker: true
  },
  // 生成核销码
  charge: function () {
    var that = this;

    that.setData({
      verification: false,
      off_num: that.data.msg.write_off_num
    })
  },
  // 隐藏核销框
  cancle_charge: function () {
    this.setData({
      verification: true
    })
  },
  orderDetail:function(){
    var that=this;

    app.network.request1({
      url: url + "order/detail",
      method: "GET",
      data: { uni: that.data.uni},
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

  // 付款
  pay: function (e) {
    let uni = e.currentTarget.dataset.id
    console.log(uni)
    wx.navigateTo({
      url: '../goods/pay?orderId=' + uni + '&key=' + uni,
    })
  },
  showpicker: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '订单时间仅可修改一次，请谨慎修改',
      confirmText: "确认修改",
      success: function (res) {
        if (res.confirm) {
          var start_time = e.currentTarget.dataset.startime, end_time = e.currentTarget.dataset.endtime;

          that.setData({
            store_id: e.currentTarget.dataset.storeid,
            start_time: start_time.substring(0, 5),
            end_time: end_time.substring(0, 5),
            uni: e.currentTarget.dataset.id,
            hidepicker: false
          })
          that.getSelectTime()
        }
      }
    })    
  },
  getSelectTime: function () {
    var that = this;

    app.network.request({
      url: url + "select_time",
      method: "GET",
      data: { menshop_id: that.data.store_id, },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress = res.data.data;
          that.setData({
            year: ress.date,
            month: ress.date[0].value,
            day: ress.date[0].value[0].day,
            times: ress.times,  //获取时分数组
            // hour:ress.times,
            minute: ress.times[0].minute,
            choseyear: ress.date[0].year,
            chosemonth: ress.date[0].value[0].month,
            choseday: ress.date[0].value[0].day[0],
            index_y: 0,
            index_m: 0,
            index_d: 0,
            index_h: 0,
            index_min: 0
          })
          that.setTime();
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  setTime: function () {
    var that = this.data, oDate = new Date(), hour = [];

    var thisYear = oDate.getFullYear(),
      thisMonth = oDate.getMonth() + 1,
      thisDay = oDate.getDate(),
      thisHour = oDate.getHours(),
      thisMin = oDate.getMinutes(),
      start_time = that.start_time.substring(0, 2),
      end_time = that.end_time.substring(0, 2);

    // console.log(thisHour)
    // console.log(this.data.hour)
    if (that.choseyear == thisYear && that.chosemonth == thisMonth && that.choseday == thisDay) {
      for (var i = 0; i < that.times.length; i++) {
        var obj = that.times[i];
        if (obj.hour > start_time && obj.hour < end_time && obj.hour > thisHour) {
          hour.push(obj)
        }
      }
      this.setData({
        hour: hour,
        chosehour: hour[0].hour,
        chosemin: hour[0].minute[0],
      })
    } else {
      for (var i = 0; i < that.times.length; i++) {
        var obj = that.times[i];
        if (obj.hour > start_time && obj.hour < end_time) {
          hour.push(obj)
        }
      }
      this.setData({
        hour: hour,
        chosehour: hour[0].hour,
        chosemin: hour[0].minute[0],
      })
    }
  },
  // 选择年
  bindChange1: function (e) {
    var index_y = e.detail.value,
      month = this.data.year[index_y].value,
      index_m = this.data.index_m < month.length ? this.data.index_m : 0,
      day = month[index_m].day,
      index_d = this.data.index_d < day.length ? this.data.index_d : 0,
      choseyear = this.data.year[index_y].year,
      chosemonth = month[index_m].month,
      choseday = day[index_d];
    this.setData({
      month: month,
      day: day,
      index_y: index_y,
      index_m: index_m,
      index_d: index_d,
      choseyear: choseyear,
      chosemonth: chosemonth,
      choseday: choseday
    })
    this.setTime();
  },
  // 选择月
  bindChange2: function (e) {
    var index_m = e.detail.value,
      day = this.data.month[index_m].day,
      chosemonth = this.data.month[index_m].month,
      index_d = this.data.index_d < day.length ? this.data.index_d : 0,
      choseday = day[index_d];
    this.setData({
      day: day,
      index_m: index_m,
      index_d: index_d,
      chosemonth: chosemonth,
      choseday: choseday
    })
    this.setTime();
  },
  // 选择日
  bindChange3: function (e) {
    this.setData({
      index_d: e.detail.value,
      choseday: this.data.day[e.detail.value]
    })
    this.setTime();
  },
  // 选择时
  bindChange4: function (e) {
    var index = e.detail.value,
      minute = this.data.hour[index].minute,
      index_min = this.data.index_min < this.data.hour[index].minute.length ? this.data.index_min : 0;
    this.setData({
      index_h: index,
      minute: minute,
      index_min: index_min,
      chosehour: this.data.hour[index].hour,
      chosemin: this.data.hour[index].minute[index_min],
    })
  },
  // 选择分
  bindChange5: function (e) {
    this.setData({
      index_min: e.detail.value,
      chosemin: this.data.minute[e.detail.value]
    })
  },
  // 确定修改时间
  changetime: function () {
    var that = this, order_time = that.data.choseyear + "年" + that.data.chosemonth + "月" + that.data.choseday + "日 " + that.data.chosehour + "时" + that.data.chosemin + "分";
    // console.log(order_time)

    app.network.request1({
      url: url + "order/upOrder",
      method: "POST",
      data: { uni: that.data.uni, order_time: order_time },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: res.data.msg,
          })
          timer = setTimeout(function () {
            that.setData({
              hidepicker: true
            })
            that.orderDetail();
          }, 2000)
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 取消修改时间
  hidepicker: function () {
    this.setData({
      hidepicker: true
    })
  },
  // 取消订单
  cancle: function (e) {
    var that = this;

    wx.showModal({
      title: '提示',
      content: '确定要取消订单',
      success: function (res) {
        if (res.confirm) {
          app.network.request1({
            url: url + "order/cancel",
            method: "POST",
            data: { id: e.currentTarget.dataset.id },
            success: function (res) {
              console.log(res)
              if (res.data.status == 200) {
                wx.showToast({
                  title: '已取消',
                })
                timer = setTimeout(function () {
                  that.orderDetail();
                }, 2000)
              } else {
                wx.showToast({
                  icon: "none",
                  title: res.data.msg,
                })
              }
            }
          })
        }
      }
    })
  },
  // 申请退款
  refund: function (e) {
    this.setData({
      uni: e.currentTarget.dataset.id
    })
    this.selectComponent("#canbox").showCan(); 
    // wx.showModal({
    //   title: '提示',
    //   content: '申请退款？',
    //   success: function (res) {
    //     if (res.confirm) {
    //       app.network.request1({
    //         url: url + "order/refund/verify",
    //         method: "POST",
    //         data: { uni: e.currentTarget.dataset.id },
    //         success: function (res) {
    //           console.log(res)
    //           if (res.data.status == 200) {
    //             wx.showToast({
    //               title: '已提交',
    //             })
    //             timer = setTimeout(function () {
    //               that.setData({
    //                 page: 1,
    //                 nomore: false,
    //               })
    //               that.getList();
    //             }, 2000)
    //           } else {
    //             wx.showToast({
    //               icon: "none",
    //               title: res.data.msg,
    //             })
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  // 评价
  evaluate: function (e) {
    wx.navigateTo({
      url: 'evaluate?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uni:options.id
    })
    this.orderDetail();
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