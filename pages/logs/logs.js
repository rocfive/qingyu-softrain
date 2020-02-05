//logs.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({
  data: {
    logs: []
  },
  // 微信一键登录
  getPhoneNumber:function(e){
    var that=this;

    console.log(e)    
    app.network.request({
      url: url + "wechat/getWechatUserPhone",
      method: "POST",
      data: {iv:e.detail.iv, encryptedData:e.detail.encryptedData,cache_key:that.data.cache_key},
      success: function (res) {
        if (res.data.status == 400) {
          console.log(res)
          // that.setData({
          //   phone:res.data.data.phoneNumber
          // })
          wx.navigateTo({
            url: 'getTel?types=wechat&logoimg='+that.data.logoimg+"&token="+that.data.token+"&phone="+res.data.data.phoneNumber,
          })
        }else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 手机号验证登录
  gettel:function(){
    wx.navigateTo({
      url: 'getTel?logoimg='+this.data.logoimg+"&token="+this.data.token,
    })
  },  
  closepop:function(){
    wx.navigateBack()
  },
  // 判断是否授权
  getSetting:function(){
    var that=this;

    wx.getSetting({
      success: (res) => {
        console.log(res)
        if(res.authSetting["scope.userInfo"]){
          that.setData({
            pop_User:true
          })
          that.login()
        }    
      }
    })
  },
  //允许授权
  onGotUserInfo: function (e) {
    this.setData({
      pop_User:true
    })
    this.login()
  },
  closepop:function(){
    wx.navigateBack()
  },
  login:function() {
    var that=this;

    wx.getUserInfo({
      success: (res) => {
        var userInfoData=res;
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {              
              userInfoData.code = res.code;
              userInfoData.spread_spid = wx.getStorageSync("spread_spid") ? wx.getStorageSync("spread_spid") : 0;  //分享二维码
              userInfoData.spread_code = 0;
              //发起网络请求
              app.network.request({
                url: url + 'wechat/mp_auth',
                method: "POST",
                data: userInfoData,
                success: function (res) {
                  console.log(res.data.data)
                  if (res.data.status == "200") {
                    var ress = res.data.data;
                    
                    if(!ress.userInfo.phone){
                      that.setData({
                        pop_User:true,
                        token:ress.token,
                        cache_key:ress.cache_key
                      })                      
                    }else{
                      wx.setStorageSync('token', ress.token);
                      wx.navigateBack()
                    }
                    
                  }
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      },
    })    
  },
  getlogo:function(){
    var that=this;

    app.network.request({
      url: url + "wechat/get_logo",
      method: "GET",
      data: { type: 1,},
      success: function (res) {
        if (res.data.status == 200) {
          that.setData({
            logoimg:res.data.data.logo_url
          })
        }else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },  
  onLoad: function () {
    this.setData({
      appname: wx.getStorageSync("appname")
    })

    this.getlogo();
    this.getSetting();
  }
})
