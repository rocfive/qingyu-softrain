// pages/business/addstaff.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password:'123456'
  },
  // 单图上传
  upimg: function () {
    var that = this;

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

            that.setData({
              image: ress.data.url
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
  inputtxt:function(e){
    var value = e.detail.value, id=e.currentTarget.dataset.id;

    if (id =="name"){
      this.setData({
        name: value
      })
    } else if (id == "phone"){
      this.setData({
        phone: value
      })
    } else if (id == "username") {
      this.setData({
        username: value
      })
    } else if (id == "password") {
      this.setData({
        password: value
      })
    } else if (id == "introduction") {
      this.setData({
        introduction: value
      })
    }    
  },
  // 点击保存
  save:function(){
    var that=this;

    if (!that.data.image) {
      wx.showToast({
        icon: "none",
        title: '请上传员工头像',
      })
      return false
    }
    if (!that.data.name) {
      wx.showToast({
        icon: "none",
        title: '请填写员工姓名',
      })
      return false
    }
    if (!that.data.phone) {
      wx.showToast({
        icon: "none",
        title: '请填写联系电话',
      })
      return false
    }
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.data.phone))) {
      wx.showToast({
        icon: "none",
        title: '请填写正确的联系电话',
      })
      return false
    }
    if (!that.data.username){
      wx.showToast({
        icon:"none",
        title: '请填写登录账户',
      })
      return false
    }
    if (!that.data.password) {
      wx.showToast({
        icon: "none",
        title: '请填写默认登录密码',
      })
      return false
    }
    if (!that.data.introduction) {
      wx.showToast({
        icon: "none",
        title: '请填写员工简介',
      })
      return false
    }

    app.network.request2({
      url: url + "menshop/add_teach",
      method: "POST",
      data: {
        image: that.data.image,
        name: that.data.name,
        phone: that.data.phone,
        username: that.data.username,
        password: that.data.password,
        introduction: that.data.introduction
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: '添加成功',
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
    clearTimeout(timer)
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