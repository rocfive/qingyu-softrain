// pages/goods/techlist.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    active:1,
    order:"sort asc",
    premium:"none",
    service_score:"none"
  },
  // 点击立即下单
  takeorder: function () {
    var that = this, ordermsg = that.data.ordermsg;
    if (!that.data.store_teach_id){
      wx.showToast({
        icon:'none',
        title: '请选择技师',
      })
      return false
    }
    ordermsg.store_teach_id = that.data.store_teach_id;
    ordermsg.store_teach_name = that.data.store_teach_name;
    ordermsg.cartNum= 1;
    console.log(ordermsg)
    app.network.request1({
      url: url + "cart/add",
      method: "POST",
      data: ordermsg,
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          ordermsg.cartId = res.data.data.cartId;
          wx.navigateTo({
            url: 'order?ordermsg=' + JSON.stringify(ordermsg),
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
  // 技师详情
  detail:function(e){
    wx.navigateTo({
      url: 'techdetail?id='+e.currentTarget.dataset.id,
    })
  },
  // 选择排序方式
  toactive:function(e){
    var that = this, id = e.currentTarget.dataset.id, order, premium, service_score;
    if (id =="1"){
      order = "sort asc";
      premium = "none";
      service_score = "none";
    } else if (id == "2"){
      if (that.data.premium == "asc"){
        order = "premium desc";
        premium = "desc";
        service_score = "none";
      } else if (that.data.premium == "desc"){
        order = "premium asc";
        premium = "asc";
        service_score = "none";
      }else{
        order = "premium asc";
        premium = "desc";
        service_score = "none";
      }      
    } else if (id == "3"){
      if (that.data.service_score == "asc"){
        order = "service_score desc";
        service_score = "desc";
        premium = "none";
      } else if (that.data.service_score == "desc"){
        order = "service_score asc";
        service_score = "asc";
        premium = "none";
      }else{
        order = "service_score asc";
        service_score = "asc";
        premium = "none";
      }      
    }
    console.log("premium:" + premium)
    console.log("service_score:" + service_score)
    console.log("order:" + order)
    this.setData({
      active: e.currentTarget.dataset.id,
      order: order,
      premium: premium,
      service_score: service_score
    })    
    that.getList();
  },
  getList:function(){
    var that=this;

    app.network.request({
      url: url + "teach_list",
      method: "GET",
      data: { 
        store_id: that.data.store_id, 
        order: that.data.order, 
        order_time: that.data.ordermsg.order_time, 
        limit:20, 
        page:that.data.page,
        duration: that.data.ordermsg.duration
      },
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
  chose:function(e){
    this.setData({
      store_teach_id:e.currentTarget.dataset.id,
      store_teach_name:e.currentTarget.dataset.name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order = JSON.parse(options.order);
    this.setData({
      ordermsg: order,
      store_id: order.store_id
    })
    console.log(order)
    this.getList();
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

  }
})