// pages/commission/team.js
const app = getApp()
var url = getApp().globalData.url, timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    page:1,
    nomore:false,
    list:[]
  },
  changeTab:function(e){
    this.setData({
      active:e.currentTarget.dataset.id,
      page: 1,
      nomore: false,
    })
    this.getTeam();
  },
  getTeam:function(){
    var that=this;

    app.network.request1({
      url: url + "spread/people",
      method: "POST",
      data: { grade: that.data.active, page: that.data.page, limit:20},
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          if(that.data.page==1){
            that.setData({
              list:res.data.data.list
            })          
          }else{
            var list=that.data.list;
            if(res.data.data.length<1){
              that.setData({
                nomore:true
              })
            }
            list.push.apply(list, res.data.data.list);
            that.setData({
              list:list
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTeam();
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
      var that=this;
      
      if(!that.data.nomore){
        that.getTeam();
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})