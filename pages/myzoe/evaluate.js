// pages/myzoe/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   goods:{ id: 0, state: 1, ordernum: 45655645565, title: "瘦脸针【国脸针】100u告别大咬肌...", img: "../img/goodsimg.png", yuyuetime: "2019-10-28  09:30", spec: "润百颜小分子玻尿酸", storename: "科华路王府井店", money: "481", addtime: "2019-05-24  14:30:12", technician:"谢宁", phone:"15298118194" },
  },
  intcontent:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  // 打分
  rank:function(e){
    this.setData({
      score:e.currentTarget.dataset.id
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