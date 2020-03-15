// pages/goods/takeorder.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideclass:false,    
  },
  // 选择门店
  chosestore:function(){
    wx.navigateTo({
      url: '../store/chose?store_id=' + this.data.store_id,
    })
  },
  // 选择营业时间
  chosetime: function (e) {
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        open_time: e.detail.value
      })
    } else if (e.currentTarget.dataset.id == 2) {
      this.setData({
        close_time: e.detail.value
      })
    }
  },
  // 填写预留姓名
  intoname:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  // 填写预留手机号
  intophone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  // 删除输入框内容
  delinput:function(e){
    var id=e.currentTarget.dataset.id;

    console.log(id)
    if(id=="name"){
      this.setData({
        name:""
      })
    } else if (id =="phone"){
      this.setData({
        phone:""
      })
    }
  },
  // 点击下一步
  next:function(){
    var that=this;
    var order={
      productId: that.data.productId,
      product_type: that.data.product_type,
      store_id: that.data.store_id,
      store_name: that.data.store_name,      
      uniqueId: that.data.uniqueId,
      checkval: that.data.checkval,
      money: that.data.money,
      real_name:that.data.name,
      user_phone: that.data.phone,
      secKillId: that.data.secKillId,
      cardId: that.data.cardId,
      duration: that.data.duration,
      order_time: that.data.choseyear + "年" + that.data.chosemonth + "月" + that.data.choseday + "日 " + that.data.chosehour + "时" + that.data.chosemin+"分"
    }
    if (that.data.product_type=="1"){
      // 如果商品类型是项目卡
      if (!order.real_name) {
        wx.showToast({
          icon: "none",
          title: '请填写预留姓名',
        })
        return false;
      }
      if (!order.user_phone) {
        wx.showToast({
          icon: "none",
          title: '请填写预留手机号',
        })
        return false;
      }
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(order.user_phone))) {
        wx.showToast({
          icon: "none",
          title: '手机号格式错误',
        })
        return false;
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
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.msg,
            })
          }
        }
      })
    }else{
      // 普通商品
      if (!order.store_id) {
        wx.showToast({
          icon: "none",
          title: '请选择服务门店',
        })
        return false;
      }
      if (!order.real_name) {
        wx.showToast({
          icon: "none",
          title: '请填写预留姓名',
        })
        return false;
      }
      if (!order.user_phone) {
        wx.showToast({
          icon: "none",
          title: '请填写预留手机号',
        })
        return false;
      }
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(order.user_phone))) {
        wx.showToast({
          icon: "none",
          title: '手机号格式错误',
        })
        return false;
      }
      wx.navigateTo({
        url: 'techlist?order=' + JSON.stringify(order),
      })
    }    
  },
  getSelectTime:function(){
    var that=this;

    if(!that.data.store_id){
      wx.showToast({
        icon:"none",
        title: '请先选择服务门店',
      })
    }
    app.network.request({
      url: url + "select_time",
      method: "GET",
      data: { menshop_id:that.data.store_id, },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress = res.data.data;
          that.setData({            
            year: ress.date,
            month: ress.date[0].value,
            day: ress.date[0].value[0].day,
            times:ress.times,  //获取时分数组
            // hour:ress.times,
            minute:ress.times[0].minute,
            choseyear: ress.date[0].year,
            chosemonth: ress.date[0].value[0].month,
            choseday: ress.date[0].value[0].day[0],            
            index_y: 0,
            index_m: 0,
            index_d: 0,
            index_h:0,
            index_min:0
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
  // 选择年
  bindChange1:function(e){
    var index_y = e.detail.value,
        month = this.data.year[index_y].value,   
        index_m = this.data.index_m < month.length ? this.data.index_m:0,
        day = month[index_m].day,
        index_d = this.data.index_d < day.length ? this.data.index_d:0,
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
  bindChange2:function(e){
    var index_m = e.detail.value,
      day = this.data.month[index_m].day,
      chosemonth = this.data.month[index_m].month,
      index_d = this.data.index_d < day.length ? this.data.index_d:0,
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
  bindChange3:function(e){
    this.setData({ 
      index_d: e.detail.value,
      choseday: this.data.day[e.detail.value]
    })
    this.setTime();
  },
  // 选择时
  bindChange4:function(e){
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
  bindChange5:function(e){
    this.setData({
      index_min: e.detail.value,
      chosemin: this.data.minute[e.detail.value]
    })
  },
  setTime:function(){
    var that = this.data, oDate = new Date(), hour=[];

    var thisYear=oDate.getFullYear(),
        thisMonth=oDate.getMonth()+1,
        thisDay=oDate.getDate(),
        thisHour=oDate.getHours(),
        thisMin=oDate.getMinutes(),
        start_time = that.start_time.substring(0,2),
        end_time = that.end_time.substring(0,2);

    // console.log(thisHour)
    // console.log(this.data.hour)
    if (that.choseyear == thisYear && that.chosemonth == thisMonth && that.choseday == thisDay){
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
    }else{
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
  getstorelist: function (storeid) {
    var that = this;

    app.network.request({
      url: url + "shop_list",
      method: "GET",
      data: { lat: wx.getStorageSync('latitude'), lng: wx.getStorageSync('longitude'), },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress=res.data.data;
          for(var i=0; i<ress.length; i++){
            if(ress[i].id==storeid){
              that.setData({
                store_id: storeid,
                store_name: ress[i].name,
                start_time: ress[i].start_time,
                end_time: ress[i].end_time
              })
              that.getSelectTime()
            }
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uniqueId: options.uniqueId,
      productId: options.productId,
      product_type: options.product_type,
      checkval: options.checkval,
      money: options.money,
      secKillId: options.secKillId,
      duration: options.duration
    })    
    console.log(options)
    if (options.storeid){
      this.getstorelist(options.storeid)
    }
    if (wx.getStorageSync("phone")){
      this.setData({
        phone: wx.getStorageSync("phone")
      })
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