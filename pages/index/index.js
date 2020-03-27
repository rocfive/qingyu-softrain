//index.js
//获取应用实例
const app = getApp()
var url = getApp().globalData.url, timer, qqmapwx = require('../../utils/qqmap-wx-jssdk.min.js'), qqmapsdk;

Page({
  data: {

  },
  // 选择城市
  chosecity:function(){
    wx.navigateTo({
      url: '../city/list',
    })
  },
  // 点击banner
  card:function(){
    wx.navigateTo({
      url: '../card/index',
    })
  },
  // 今日头条列表
  toheadlinelist:function(){
    wx.navigateTo({
      url: '../headline/list',
    })
  },
  // 今日头条详情
  toheadlinedetail:function(e){
    wx.navigateTo({
      url: '../headline/detail?id='+e.currentTarget.dataset.id,
    })
  },
  // 商品详情
  todetail:function(e){
    wx.navigateTo({
      url: '../goods/detail?id='+e.currentTarget.dataset.id,
    })
  },
  // 搜索
  tosearch:function(e){
    wx.navigateTo({
      url: '../goods/searchlist',
    })
  },
  // 拨打电话
  toCall:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },
  getCity: function () {
    var that = this;

    locat();
    function locat() {
      wx.getLocation({
        type: 'gcj02',
        altitude: true,
        success: function (res) {
          wx.setStorageSync('latitude', res.latitude);
          wx.setStorageSync('longitude', res.longitude);
          analysis(res.latitude + "," + res.longitude);
          that.getMsg(res.latitude, res.longitude);
        },
        fail: function (res) {
          setting();
        },
        complete: function (res) {
        },
      })
    };
    function setting() {
      console.log("获取经纬度失败")
      wx.getSetting({
        success: function (res) {
          var statu = res.authSetting;
          if (!statu['scope.userLocation']) {
            wx.showModal({
              title: '是否授权当前位置',
              content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
              success: function (tip) {
                if (tip.confirm) {
                  wx.openSetting({
                    success: function (data) {
                      if (data.authSetting["scope.userLocation"] === true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        locat();
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'success',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '调用授权窗口失败',
            icon: 'success',
            duration: 1000
          })
        }
      })
    };
    function analysis(e_location) {
      // 逆地址解析
      qqmapsdk.reverseGeocoder({
        location: e_location,
        //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
        success: function (res) {
          console.log(res);
          that.setData({
            cityname: res.result.ad_info.city.replace('市', '')
          })
          wx.setStorageSync('cityname', that.data.cityname);
          wx.setStorageSync('localcity', that.data.cityname);
        },
        fail: function (error) {
          console.error(error);
        },
        complete: function (res) {
          // console.log(res);
        }
      })
    }
  }, 
  getMsg: function (lat, lng){
    var that=this;

    app.network.request({
      url: url + "index",
      method: "GET",
      data: { lat: lat, lng: lng,},
      success: function (res) {
        // console.log(res)
        if (res.data.status == 200) {
          var ress=res.data.data;
          that.setData({
            banner:ress.banner,
            cube:ress.cube,
            hotlist:ress.hotlist,
            mendian:ress.mendian,
            notice:ress.notice,
            site_name:ress.site_name
          })
          wx.setNavigationBarTitle({
            title: that.data.site_name,
          })
          wx.setStorageSync("appname", that.data.site_name)
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 点击抢购
  chosespec:function(e){
    this.setData({
      goodsid:e.currentTarget.dataset.id
    })    
    let myComponent = this.selectComponent('#spec');
    myComponent.getMsg();
  },
  storedetail:function(e){
    wx.navigateTo({
      url: '../store/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  // 导航
  toMap: function (e) {
    var that = this;
    var lx = JSON.parse(e.currentTarget.dataset.lat),
      ly = JSON.parse(e.currentTarget.dataset.lng);

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res)
        wx.openLocation({
          latitude: lx,
          longitude: ly,
          scale: 18
        })
      }
    })
  },
  onLoad: function (options) {    
    var that=this;

    console.log(options.scene)
    if(options.scene && !wx.getStorageSync('spread_spid')){
      wx.setStorageSync('spread_spid', options.scene)
    }
    qqmapsdk = new qqmapwx({
      key: 'DSHBZ-SCWW4-OHHUF-DRND6-C57GS-SXBUH'
    });
    that.getCity();
  },
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index?scene=' + (wx.getStorageSync("shareid") ? wx.getStorageSync("shareid") : "")
    }
  }
})
