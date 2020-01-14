// pages/business/notice.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
    page:1,
    nomore:false
  },
  detail:function(e){
    wx.navigateTo({
      url: 'noticed?id=' + e.currentTarget.dataset.id,
    })
  },
  detail1:function(e){
    wx.navigateTo({
      url: '../headline/detail?id='+e.currentTarget.dataset.id,
    })
  },
  changeTab:function(e){
    this.setData({
      page: 1,
      nomore: false,
      active:e.currentTarget.dataset.id
    })
    this.getList();
  },
  getList: function () {
    var that = this;

    if (that.data.active == 1){
      // 门店公告
      app.network.request2({
        url: url + "menshop/notice_list",
        method: "GET",
        data: { page: that.data.page, limit: 20 },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              list: res.data.data
            })
            if (that.data.page != 1 && res.data.data.length < 1) {
              that.setData({
                nomore: true
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
    }else if(that.data.active==2){
      // 平台公告
      app.network.request({
        url: url + "notice_list",
        method: "GET",
        data: { store_id: 0, page: that.data.page, limit: 20 },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              list: res.data.data
            })
            if (that.data.page != 1 && res.data.data.length<1){
              that.setData({
                nomore:true
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if (!this.data.nomore){
      this.setData({
        page:this.data.page+1
      })
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})