// pages/myzoe/canclereason.js
const app = getApp();
var url = getApp().globalData.url, timer;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    o_id: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    cancle: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //显示
    showCan: function () {
      this.setData({
        cancle: false
      })
      this.getreason();
    },
    //隐藏
    closeBtn: function () {
      this.setData({
        cancle: true
      })
    },
    //取消原因
    can_rea: function (e) {
      var that = this,
        id = e.currentTarget.dataset.id;
      this.setData({
        can_rea: id
      })
    },
    getreason:function(){
      var that=this;
      app.network.request1({
        url: url + "order/refund/reason",
        method: "GET",
        data: { },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              list:res.data.data
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
    //确认退款
    confrim_can: function () {
      var that = this;

      app.network.request1({
        url: url + "order/refund/verify",
        method: "POST",
        data: { uni: that.data.o_id, text: that.data.can_rea },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              cancle:true
            })
            wx.showToast({
              title: res.data.msg,
            })
            timer=setTimeout(function(){
              that.triggerEvent('callSomeFun')
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
  }
})
