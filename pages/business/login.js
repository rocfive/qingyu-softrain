// pages/business/login.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isremember:true,
    froms:'',
  },
  account:function(e){
    this.setData({
      account:e.detail.value,
      accountsta: (/^1(3|4|5|6|7|8|9)\d{9}$/.test(e.detail.value))?1:0
    })
  },
  password:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  // 账号获取焦点
  focus_account:function(){
    this.setData({
      focus_account:true
    })
  },
  // 账号失去焦点
  blur_account:function(){
    this.setData({
      focus_account: false
    })
  },
  // 密码获取焦点
  focus_pass: function () {
    this.setData({
      focus_pass: true
    })
  },
  // 密码失去焦点
  blur_pass: function () {
    this.setData({
      focus_pass: false
    })
  },
  // 记住账号
  // remember:function(e){
  //   this.setData({
  //     isremember: this.data.isremember?false:true
  //   })
  // },
  // 登录
  tolgin:function(){
    var that=this;

    // 商家登录
    if (that.data.options.froms == "shop") {
      app.network.request({
        url: url + "mslogin",
        method: "POST",
        data: { account: that.data.account, password: that.data.password },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            wx.setStorageSync("mstoken", res.data.data.mstoken);
            wx.redirectTo({
              url: 'index',
            })            
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.msg,
            })
          }
        }
      })
    } else if (that.data.options.froms == "employee"){
      // 员工登录
      app.network.request({
        url: url + "melogin",
        method: "POST",
        data: { account: that.data.account, password: that.data.password },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            wx.setStorageSync("metoken", res.data.data.metoken);
            wx.redirectTo({
              url: '../staff/index',
            })
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
    this.setData({
      options: options
    })
    if (options.froms == "shop"){
      wx.setNavigationBarTitle({
        title: '商家登录',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '员工登录',
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