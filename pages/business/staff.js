// pages/business/staff.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  add:function(){
    wx.navigateTo({
      url: 'addstaff',
    })
  },
  // 获取员工列表
  getList:function(){
    var that=this;

    app.network.request2({
      url: url + "menshop/teach_list",
      method: "POST",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            list: res.data.data
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
  // 删除员工
  delstaff:function(e){
    var that=this, id=e.currentTarget.dataset.id;

    wx.showModal({
      title: '提示',
      content: '确定要删除这个员工',
      success:function(res){
        if(res.confirm){
          app.network.request2({
            url: url + "menshop/del_teach",
            method: "POST",
            data: { id:id},
            success: function (res) {
              console.log(res)
              if (res.data.status == 200) {
                wx.showToast({
                  title: '删除成功',
                })
                timer=setTimeout(function(){
                  that.getList()
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
  // 员工禁止接单
  rest:function(e){
    var that = this, id = e.currentTarget.dataset.id;

    app.network.request2({
      url: url + "menshop/ban_order",
      method: "POST",
      data: { id: id, status:1 },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})