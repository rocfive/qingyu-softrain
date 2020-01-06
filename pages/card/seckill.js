// pages/card/seckill.js
const app = getApp()
var url = getApp().globalData.url, timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1
  },
  changeTab:function(e){
    this.setData({
      page: 1,
      nomore:false,
      timeid:e.currentTarget.dataset.id
    })
    this.getList();
  },
  detail:function(e){
    wx.navigateTo({
      url: '../goods/detail?isseckill=1&id=' + e.currentTarget.dataset.id + '&times=' + this.data.timeid,
    })
  },
  getMsg: function (lat, lng) {
    var that = this;

    app.network.request({
      url: url + "seckill/index",
      method: "GET",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress = res.data.data;
          that.setData({
            lovely: ress.lovely,
            seckillTime: ress.seckillTime,
            timeid: ress.seckillTime[ress.seckillTimeIndex].id
          })
          that.getList()
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  getList: function (){
    var that=this;

    app.network.request({
      url: url + "seckill/list",
      method: "GET",
      data: { time: that.data.timeid, page: that.data.page,limit:20},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          var ress=res.data.data;
          if(that.data.page==1){
            that.setData({
              list: ress
            })
          }else{
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
  // 点击抢购
  panicbuy:function(e){
    // this.setData({
    //   goodsid: e.currentTarget.dataset.id
    // })
    wx.navigateTo({
      url: '/pages/goods/takeorder?productId=' + e.currentTarget.dataset.id + '&secKillId=' + e.currentTarget.dataset.sid + '&money=' + e.currentTarget.dataset.money + '&product_type=' + e.currentTarget.dataset.types,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if (!this.data.nomore){
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