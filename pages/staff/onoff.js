// pages/staff/onoff.js
const app = getApp()
var url = getApp().globalData.url, timer;
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTimeArray1: null,
    dateTime1: null,
    startYear: null,
    endYear: null,
  },
  // 开关
  switchtime:function(e){
    this.setData({
      open: this.data.open==1?0:1
    })
  },
  // 获取页面信息
  getMsg: function () {
    var that = this;

    app.network.request3({
      url: url + "employee/leave",
      method: "POST",
      data: {},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            open: res.data.data.open,
            st: res.data.data.open == 1 ?res.data.data.st:"",
            et: res.data.data.open == 1 ?res.data.data.et:"",
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
  // 不足两位补0
  appendZero: function (obj) {
    if (obj < 10) return "0" + "" + obj;
    else return obj;
  },
  // 点击确定
  confirm:function(){
    var that=this;

    app.network.request3({
      url: url + "employee/leave_edit",
      method: "POST",
      data: { start_time: (that.data.open == 1 ? that.data.st : ""), end_time: (that.data.open == 1 ? that.data.et:"")},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: '设置成功',
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
  // 选择日期时间
  changeDateTime1(e) {
    var that=this, datas=that.data;
    that.setData({
      st: datas.dateTimeArray1[0][datas.dateTime1[0]] + '-' + datas.dateTimeArray1[1][datas.dateTime1[1]] + '-' + datas.dateTimeArray1[2][datas.dateTime1[2]] + ' ' + datas.dateTimeArray1[3][datas.dateTime1[3]] + ':' + datas.dateTimeArray1[4][datas.dateTime1[4]] + ':' + datas.dateTimeArray1[5][datas.dateTime1[5]]
    });
  },
  // 选择日期时间
  changeDateTime2(e) {
    var that = this, datas = that.data;
    that.setData({
      et: datas.dateTimeArray1[0][datas.dateTime1[0]] + '-' + datas.dateTimeArray1[1][datas.dateTime1[1]] + '-' + datas.dateTimeArray1[2][datas.dateTime1[2]] + ' ' + datas.dateTimeArray1[3][datas.dateTime1[3]] + ':' + datas.dateTimeArray1[4][datas.dateTime1[4]] + ':' + datas.dateTimeArray1[5][datas.dateTime1[5]]
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var oDate=new Date();
    this.setData({
      nowDate: oDate.getFullYear() + '-' + this.appendZero(oDate.getMonth() + 1) + '-' + this.appendZero(oDate.getDate())
    })
    this.getMsg();

    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    //var lastArray = obj1.dateTimeArray.pop();
    //var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
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