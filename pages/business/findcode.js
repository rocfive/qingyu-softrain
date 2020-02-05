// pages/business/findcode.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    code:'',
    password:'',
    repassword:'',
    ajxtrue: false,
    showdjs:false
  },

  //实时获取商家手机号
  usernameInput:function(e){  
    var phone = e.detail.value;
    let that = this
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      this.setData({
        ajxtrue: false
      })
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      this.setData({
        ajxtrue: true,
        username:e.detail.value
      })
    }
  },
  //实时获取短信验证码
  codeInput:function(e){
    this.setData({
      code: e.detail.value
    })
  },
  //实时获取密码
  passwordInput:function(e){
    this.setData({
      password: e.detail.value
    })
  },
  //实时获取重复密码
  repasswordInput:function(e){
    this.setData({
      repassword: e.detail.value
    })
  },

  //获取验证码
  getcode:function(e){
    let phone=this.data.username;
    let ajxtrue = this.data.ajxtrue;
    let that=this;
    //手机号正确
    if (ajxtrue){
      if (this.options.froms == 'shop'){
        app.network.request({
          url: url + "menshop/forget/verify",
          method: "POST",
          data: { phone: phone },
          success: function (res) {
            console.log(res)
            if (res.data.status == 200) {
              wx.showToast({
                icon: "success",
                title: res.data.msg,
                duration: 2000
              })
              that.countdown()
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg,
              })
            }
          }
        })
      } else {
        app.network.request({
          url: url + "employee/forget/verify",
          method: "POST",
          data: { phone: phone },
          success: function (res) {
            console.log(res)
            if (res.data.status == 200) {
              wx.showToast({
                icon: "success",
                title: res.data.msg,
                duration: 2000
              })
              that.countdown()
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg,
              })
            }
          }
        })
      }
    }else{
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //重置商家端密码
  resetPassword:function(e){
    let phone = this.data.username;
    let code = this.data.code;
    let password = this.data.password;
    let repassword = this.data.repassword;
    let ajxtrue = this.data.ajxtrue
    if (ajxtrue){
      if (!code) {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if(!password || !repassword){
        wx.showToast({
          title: '请输入密码和重复密码',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if(password != repassword){
        wx.showToast({
          title: '两次密码不相同',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (this.options.froms == 'shop') {
        app.network.request({
          url: url + "menshop/reset",
          method: "POST",
          data: { account: phone, captcha: code, password: password },
          success: function (res) {
            console.log(res)
            if (res.data.status == 200) {
              wx.showToast({
                icon: "success",
                title: res.data.msg,
                duration: 2000
              });
              timer = setTimeout(function () {
                wx.redirectTo({
                  url: "/pages/business/login?froms=shop",
                })
              }, 2000)
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg,
              })
            }
          }
        })
      } else {
        app.network.request({
          url: url + "employee/reset",
          method: "POST",
          data: { account: phone, captcha: code, password: password },
          success: function (res) {
            console.log(res)
            if (res.data.status == 200) {
              wx.showToast({
                icon: "success",
                title: res.data.msg,
                duration: 2000
              });
              timer = setTimeout(function () {
                wx.redirectTo({
                  url: "/pages/business/login?froms=employee",
                })
              }, 2000)
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg,
              })
            }
          }
        })
      }
    }else{
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 倒计时
  countdown:function(params) {
    var that=this, djs=60;
    that.setData({
      showdjs:true,
      djs:djs+'s'
    })
    timer=setInterval(function(){
      djs--;            
      if(djs==0){
        clearInterval(timer)
        that.setData({
          showdjs:false
        })
        return false;
      }
      that.setData({
        djs:djs+'s'
      })     
    },1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
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