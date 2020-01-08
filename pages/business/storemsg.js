// pages/business/storemsg.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    var that = this, slider_image = that.data.slider_image;

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
              that.setData({
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
    var that = this, slider_image = that.data.slider_image, index = e.currentTarget.dataset.id;

    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片？',
      success: function (res) {
        if (res.confirm) {
          slider_image.splice(index, 1);
          that.setData({
            slider_image: slider_image
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