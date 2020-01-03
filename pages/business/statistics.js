// pages/business/statistics.js
var wxCharts = require('../../utils/wxcharts.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: { ordernumber: 0, earnings: 0 },
    weekday: { date: ["12.11", "12.12", "12.13", "12.14", "12.15", "12.16", "12.17"], total: [0, 0, 0, 0, 0, 0, 0] },
    yeardata: { month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], total: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
  },
  DreawChart: function () {
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
    new wxCharts({
      canvasId: 'lineCanvas02',
      type: 'line',
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
  // 选择年份
  changeyear: function (e) {
    var yearxl = this.data.yearxl;
    this.setData({
      year: yearxl[e.detail.value]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.DreawChart();
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