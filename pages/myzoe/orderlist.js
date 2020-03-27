// pages/myzoe/orderlist.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    active:0,
    verification: true,
    hidepicker:true
  },
  // 切换订单状态
  changeacitve: function (e) {
    var that = this, id = e.currentTarget.dataset.id;
    that.setData({
      page:1,
      nomore: false,
      active: e.currentTarget.dataset.id
    })
    app.globalData.showOrdercur = e.currentTarget.dataset.id;
    that.getList();
  },
  detail:function(e){
    wx.navigateTo({
      url: 'orderdetail?id='+e.currentTarget.dataset.id,
    })
  },
  // 生成核销码
  charge: function (e) {
    var that = this;

    that.setData({
      verification: false,
      _verify_code: e.currentTarget.dataset.code,
      codeimg: e.currentTarget.dataset.codeimg
    })
  },
  // 隐藏核销框
  cancle_charge: function () {
    this.setData({
      verification: true
    })
  },
  // 评价
  evaluate:function(e){
    wx.navigateTo({
      url: 'evaluate?id=' + e.currentTarget.dataset.id,
    })
  },
  getList:function(){
    var that=this;
    
    if(!wx.getStorageSync('token')){
      that.setData({
        nologin:true
      })
      return false;
    }
    that.setData({
      nologin:false
    })
    app.network.request1({
      url: url + "order/list",
      method: "GET",
      data: { type: that.data.active, page: that.data.page, limit:20},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress = res.data.data;
          if (that.data.page == 1) {
            that.setData({
              list: ress
            })
          } else {
            if (ress.length < 1) {
              that.setData({
                nomore: true
              })
            }
            var list = that.data.list;
            list.push.apply(list, ress);
            that.setData({
              list: list
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
  // 取消订单
  cancle_order:function(e){
    var that = this;

    wx.showModal({
      title: '提示',
      content: '确定要取消订单',
      success:function(res){
        if(res.confirm){
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
                timer=setTimeout(function(){
                  that.setData({
                    page: 1,
                    nomore: false,
                  })
                  that.getList();
                },2000)
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
  refund:function(e){
    this.setData({
      uni: e.currentTarget.dataset.id
    })
    this.selectComponent("#canbox").showCan(); 
  },
  // 付款
  pay_order:function(e){
    let uni = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../goods/pay?orderId=' + uni + '&key=' + uni,
    })
  },
  // 点击登录
  tolog:function(){
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  // 拨打电话
  toCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },
  showpicker:function(e){
    var that = this, start_time = e.currentTarget.dataset.startime, end_time = e.currentTarget.dataset.endtime;
    
    that.setData({
      store_id: e.currentTarget.dataset.storeid,
      start_time: start_time.substring(0,5),
      end_time: end_time.substring(0, 5),
      uni: e.currentTarget.dataset.id,
      hidepicker:false
    })
    that.getSelectTime()
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
  changetime:function(){
    var that=this, order_time= that.data.choseyear + "年" + that.data.chosemonth + "月" + that.data.choseday + "日 " + that.data.chosehour + "时" + that.data.chosemin + "分";
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
              page: 1,
              nomore: false,
              hidepicker: true
            })
            that.getList();
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
  hidepicker:function(){
    this.setData({
      hidepicker: true
    })
  },
  getlistfresh:function(){
    this.setData({
      page: 1,
      nomore: false,
      hidepicker: true
    })
    this.getList();
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
    this.setData({
      active: app.globalData.showOrdercur
    })
    this.getList();
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
    clearTimeout(timer)
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
    if (!this.data.nomore) {
      this.setData({
        page: this.data.page + 1
      })
      this.getList()
    }
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