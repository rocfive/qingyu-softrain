// pages/goods/list.js
const app = getApp()
var url = getApp().globalData.url, timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 商品详情
  todetail: function (e) {
    console.log("id:" + e.currentTarget.dataset.id)
    wx.navigateTo({
      url: 'detail?id='+e.currentTarget.dataset.id,
    })
  },
  // 获取分类
  getColumn:function(){
    var that=this;

    app.network.request({
      url: url + "category",
      method: "GET",
      data: { id: that.data.options.id },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            menu: res.data.data.children,
            list:res.data.data.goods,
            banner:res.data.data.pic
          })       
          wx.setNavigationBarTitle({
            title: res.data.data.cate_name,
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
  // 点击子分类
  clickmenu:function(e){
    var that=this;

    wx.setNavigationBarTitle({
      title: e.currentTarget.dataset.name,
    })
    app.network.request({
      url: url + "get_prolist",
      method: "GET",
      data: { id: e.currentTarget.dataset.id },
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
  getHotlist:function(){
    var that=this;

    app.network.request({
      url: url + "product/hot",
      method: "GET",
      data: {  },
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
  // 商品详情
  todetail: function (e) {
    wx.navigateTo({
      url: '../goods/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  // 点击抢购
  chosespec: function (e) {
    this.setData({
      goodsid: e.currentTarget.dataset.id
    })
    let myComponent = this.selectComponent('#spec');
    myComponent.getMsg();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    that.setData({
      options: options
    })
    if(options.id){
      that.getColumn();
    } else if (options.ishot==1){
      wx.setNavigationBarTitle({
        title: '热门项目',
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

  }
})