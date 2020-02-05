// pages/logs/getTel.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdjs:false
  },
  submit:function(e){
    var that=this, fData=e.detail.value;
    fData.step=1;

    if(!fData.phone){
      wx.showToast({
        icon:"none",
        title: '请填写手机号',
      })
      return false
    }
    if(!fData.captcha){
      wx.showToast({
        icon:"none",
        title: '请填写验证码',
      })
      return false
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url + "binding",
      data: fData,
      method: "POST",
      header: {
        'content-Type': 'application/json',
        'Authori-zation': 'Bearer '+that.data.options.token
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.status == 200) {
          wx.setStorageSync('token', that.data.options.token);
          wx.navigateBack({
            delta:2
          })
        }else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      },
      fail: function () {
        wx.hideLoading();
      },
      complete: function () {
  
      }
    })
  },
  // 输入手机号
  bindphone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  // 获取验证码
  bindcode:function(){
    var that=this;

    if (!that.data.phone){
      wx.showToast({
        icon:"none",
        title: '请填写手机号！',
      })
      return false
    }
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.data.phone))){
      wx.showToast({
        icon:"none",
        title: '手机号格式错误，请填写正确的手机号！',
      })
      return false
    }
    app.network.request({
      url: url + "register/verify",
      method: "POST",
      data: {phone:that.data.phone, type:'binding'},
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '发送成功',
          })
          that.setData({
            showdjs:true
          })
          var djs=60;
           
          timer=setInterval(function(){
            if(djs<1){
              clearInterval(timer)
              that.setData({
                showdjs:false
              })
              return false;
            }
            djs--;
            that.setData({
              djs:djs
            })
          },1000)          
        }else {
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
      options:options,
      phone:options.phone?options.phone:"",
      disabled:options.phone?true:false
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
    clearInterval(timer)
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