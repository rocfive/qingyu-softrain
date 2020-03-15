// pages/business/charge.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    nomore:false
  },
  getList:function(){
    var that = this;

    if (that.data.options.forms == "staff"){
      app.network.request3({
        url: url + "employee/verific_log",
        method: "GET",
        data: { page: that.data.page, limit: 20 },
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
    }else{
      app.network.request2({
        url: url + "menshop/verific_log",
        method: "GET",
        data: { page: that.data.page, limit: 20 },
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
    }    
  },
  detail: function (e) {
    wx.navigateTo({
      url: 'orderdetail?id=' + e.currentTarget.dataset.id + '&role=' + this.data.options.forms
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options:options
    })
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