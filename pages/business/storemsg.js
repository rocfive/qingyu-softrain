// pages/business/storemsg.js
const app = getApp()
var url = getApp().globalData.url, qqmapwx = require('../../utils/qqmap-wx-jssdk.min.js'), qqmapsdk, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 门店名称
  changename:function(e){
    var msg=this.data.msg;
    msg.name=e.detail.value;

    this.setData({
      msg: msg
    })
  },
  // 门店电话
  changephone:function(e){
    var msg = this.data.msg;
    msg.phone = e.detail.value;

    this.setData({
      msg: msg
    })
  },
  start_time:function(e){
    var msg = this.data.msg;
    msg.start_time = e.detail.value;

    this.setData({
      msg: msg
    })
  },
  end_time: function (e) {
    var msg = this.data.msg;
    msg.end_time = e.detail.value;

    this.setData({
      msg: msg
    })
  },
  // 省市区
  city:function(e){
    var msg = this.data.msg;
    msg.province = e.detail.value[0];
    msg.city = e.detail.value[1];
    msg.district = e.detail.value[2];

    this.setData({
      msg: msg
    })
    this.getLatAndLng();
  },
  // 详细地址
  address:function(e){
    var msg = this.data.msg;
    msg.address = e.detail.value;

    this.setData({
      msg: msg
    })
    this.getLatAndLng();
  },
  // 获取经纬度
  getLatAndLng: function () {
    var that = this, msg = that.data.msg;

    if (that.data.msg.province && that.data.msg.city && that.data.msg.district && that.data.msg.address) {
      geocoder(that.data.msg.province + that.data.msg.city + that.data.msg.district + that.data.msg.address);
    }
    function geocoder(address) {
      qqmapsdk.geocoder({
        //获取表单传入地址
        address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
        success: function (res) {//成功后的回调
          // console.log(res);
          var res = res.result;
          //根据地址解析在地图上标记解析地址位置

          msg.lat = res.location.lat;
          msg.lng = res.location.lng;

          that.setData({
            msg: msg
          })
        },
        fail: function (error) {
          console.error(error);
        },
        complete: function (res) {
        }
      })
    };
  },
  // 门店简介
  intro:function(e){
    var msg = this.data.msg;
    msg.introduction = e.detail.value;

    this.setData({
      msg: msg
    })
  },
  getbusiness: function () {
    var that = this;

    app.network.request2({
      url: url + "menshop/info",
      method: "GET",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            msg: res.data.data,
            slider_image: JSON.parse(res.data.data.slider_image)
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
  // 单图上传
  upimg:function(){
    var that=this,msg=that.data.msg;

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;

        wx.uploadFile({
          url: url + 'upload/image', //仅为示例，非真实的接口地址            
          filePath: tempFilePaths[0],          
          name: 'file',
          success(res) {
            console.log(res)
            var ress = JSON.parse(res.data);

            msg.image = ress.data.url;
            that.setData({
              msg: msg
            })          

            if (ress.code == "0") {
              wx.showModal({
                title: '提示',
                content: ress.data,
                showCancel: false
              })
              return;
            }
          },
          fail(res) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          }
        })
      }
    })
  },
  // 多图上传
  upimg1:function(){
    var that = this, slider_image = that.data.slider_image, msg = that.data.msg;

    wx.chooseImage({
      count: 9-slider_image.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: url + 'upload/image', //仅为示例，非真实的接口地址            
            filePath: tempFilePaths[i],
            name: 'file',
            success(res) {
              console.log(res)
              var ress = JSON.parse(res.data);

              slider_image.push(ress.data.url);
              msg.slider_image = JSON.stringify(slider_image);
              that.setData({
                msg: msg,
                slider_image: slider_image
              })

              if (ress.code == "0") {
                wx.showModal({
                  title: '提示',
                  content: ress.data,
                  showCancel: false
                })
                return;
              }
            },
            fail(res) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
            }
          })
        }        
      }
    })
  },
  // 删除图片
  delimg: function (e) {
    var that = this, slider_image = that.data.slider_image, index = e.currentTarget.dataset.id, msg = that.data.msg;

    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片？',
      success: function (res) {
        if (res.confirm) {
          slider_image.splice(index, 1);
          msg.slider_image = JSON.stringify(slider_image);
          that.setData({
            msg: msg,
            slider_image: slider_image
          })
        }
      }
    })
  },
  status:function(){
    var msg=this.data.msg;

    msg.status = (msg.status == 1?0:0);
    this.setData({
      msg: msg
    })

  },
  save:function(){
    var that=this;

    app.network.request2({
      url: url + "menshop/edit_info",
      method: "POST",
      data: that.data.msg,
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: '保存成功',
          })
          timer=setTimeout(function(){
            wx.navigateBack()
          },2000)
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
    this.getbusiness();
    qqmapsdk = new qqmapwx({
      key: 'DSHBZ-SCWW4-OHHUF-DRND6-C57GS-SXBUH'
    });
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
    clearTimeout(timer);
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