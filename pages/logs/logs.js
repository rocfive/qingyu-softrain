//logs.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({
  data: {
    logs: []
  },
  // 微信一键登录
  wxchat:function(){
    wx.navigateTo({
      url: 'wechatTel',
    })
  },
  // 手机号验证登录
  // gettel:function(){
  //   wx.navigateTo({
  //     url: 'getTel',
  //   })
  // },
  
  //允许授权
  onGotUserInfo: function (e) {
    var that=this;
    
    console.log(e.detail) 
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var userInfoData=e.detail;
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
                
                wx.setStorageSync("token", ress.token);
                wx.navigateBack()
                // if (ress.userInfo.phone){
                //   wx.setStorageSync("token", ress.token)
                //   wx.navigateBack()
                // }else{
                //   that.setData({
                //     pop_User:true
                //   })
                // }
              }

              // var token = res.data.data.token;

              // app.network.request({
              //   url: url + 'index/member/user_message',
              //   method: "POST",
              //   data: { token: token, head_img: that.data.avatarUrl, nickname: that.data.nickName, inviter_id: wx.getStorageSync("canshu") },
              //   success: function (res) {
              //     console.log(res)
              //     if (res.data.code == "1") {

              //     }
              //   }
              // })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  closepop:function(){
    wx.navigateBack()
  },
  onLoad: function () {
    this.setData({
      appname: wx.getStorageSync("appname")
    })
  }
})
