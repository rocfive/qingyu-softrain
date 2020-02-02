// pages/myzoe/invite.js
const app = getApp()
var url = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_current: 0,
    imglist: ''//["../img/invite.png", "../img/invite.png"]
  },
  change:function(e){
    this.setData({
      index_current:e.detail.current
    })
  },
  //获取分销海报列表
  get_spread:function(e){
    let that=this;
    app.network.request1({
      url: url + "spread/banner",
      method: "GET",
      data: { type: 1 },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            imglist: res.data.data
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
  //保存图片到手机相册
  saveImage:function(e){
    var url = this.data.imglist[this.data.index_current].poster;
    wx.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          let img = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res){
              wx.showToast({
                icon: "success",
                title: "保存成功",
              })
            },
            fail(res){
              wx.showToast({
                icon: "none",
                title: "保存失败",
              })
            }
          })
        }
      }
    })
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
    this.get_spread();
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

  }
})