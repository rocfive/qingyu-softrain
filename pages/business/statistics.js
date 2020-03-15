// pages/business/statistics.js
const app = getApp()
var url = getApp().globalData.url, timer;
var wxCharts = require('../../utils/wxcharts.js'), monthchar;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timetype:1,
  },
  changeTab:function(e){
    this.setData({
      timetype: e.currentTarget.dataset.id,
      stime: "", 
      etime: "" 
    })
    this.getList();
  },
  // 近七日
  DreawChart1: function () {
    var that = this;

    new wxCharts({
      canvasId: 'lineCanvas01',
      type: 'line',
      categories: that.data.weekday.date,
      series: [{
        name: " ",
        color: '#f2aa56',
        data: that.data.weekday.total,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      yAxis: {
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: 350,
      height: 235,
    });    
  },
  DreawChart2:function(){
    var that = this;

    monthchar=new wxCharts({
      canvasId: 'lineCanvas02',
      type: 'line',
      enableScroll :true,
      categories: that.data.yeardata.month,
      series: [{
        name: " ",
        color: '#6d5efa',
        data: that.data.yeardata.total,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      yAxis: {
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: 350,
      height: 235,
    });
  },
  touchstart: function (e) {
    monthchar.scrollStart(e);//开始滚动
  },
  touchmove: function (e) {
    monthchar.scroll(e);
  },
  touchend: function (e) {
    monthchar.scrollEnd(e);
  },
  getList: function () {
    var that = this;

    app.network.request2({
      url: url + "menshop/order_statics",
      method: "POST",
      data: { timetype: that.data.timetype, stime: that.data.stime, etime: that.data.etime },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          if (that.data.timetype==1){
            that.setData({
              today_count: res.data.data.today_count,
              today_money: res.data.data.today_money
            })
          }else if(that.data.timetype==2){
            that.setData({
              weekday:res.data.data              
            })
            that.DreawChart1();
          } else if (that.data.timetype == 3) {
            that.setData({
              yeardata: res.data.data
            })
            that.DreawChart2();
          }else{
            that.setData({
              today_count: res.data.data.today_count,
              today_money: res.data.data.today_money
            })
          }
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      }
    })
  },
  // 选择开始时间
  changestime:function(e){
    this.setData({
      stime:e.detail.value
    })
    this.diydate()
  },
  // 选择结束时间
  changeetime:function(e){
    this.setData({
      etime: e.detail.value
    })
    this.diydate()
  },
  // 查询自定义区间数据
  diydate:function(e){
    var that=this;
    if (that.data.stime && that.data.etime){
      that.setData({
        timetype:""
      })
      that.getList();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getList();
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