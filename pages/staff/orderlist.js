// pages/staff/orderlist.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    page: 1,
    nomore: false
  },
  changeacitve: function (e) {
    this.setData({
      page: 1,
      active: e.currentTarget.dataset.id
    })
    this.getList()
  },
  getList: function () {
    var that = this;

    app.network.request3({
      url: url + "employee/order/list",
      method: "GET",
      data: { type: 2, status: that.data.active, page: that.data.page, limit: 20, stime: that.data.st, etime: that.data.et},
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
  // 订单详情
  detail: function (e) {
    wx.navigateTo({
      url: '../business/orderdetail?forms=staff&id=' + e.currentTarget.dataset.id,
    })
  },
  // 开始时间
  changest: function (e) {
    this.setData({
      st: e.detail.value
    })
    this.judge();
  },
  // 结束时间
  changeet: function (e) {
    this.setData({
      et: e.detail.value
    })
    this.judge();
  },
  judge:function(){
    if (this.data.st && this.data.et){
      this.setData({
        page:1,
        nomore: false
      })
      this.getList();
    }
  },
  // 拨打电话
  toCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active: options.active
    })
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