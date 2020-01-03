// pages/staff/tx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_type: 1,
    balance:10.00
  },
  // 持卡人
  bank_name: function (e) {
    this.setData({
      bank_name: e.detail.value
    })
  },
  // 卡号
  o2o_fuwu_money_log_desc: function (e) {
    this.setData({
      o2o_fuwu_money_log_desc: e.detail.value
    })
  },
  // 开户银行名字
  bank_address: function (e) {
    this.setData({
      bank_address: e.detail.value
    })
  },
  changetype: function (e) {
    this.setData({
      pay_type: e.currentTarget.dataset.id
    })
  },
  // 查看记录
  record: function () {
    var that = this;

    wx.navigateTo({
      url: 'distritxrecord',
    })
  },
  // 填写金额
  intmoney: function (e) {
    this.setData({
      o2o_fuwu_organization_freeze_money: e.detail.value
    })
  },
  // 提现
  withdraw: function () {
    var t = this;

    if (!t.data.o2o_fuwu_organization_freeze_money) {
      wx.showToast({
        icon: "none",
        title: '请填写提现金额',
      })
      return false
    }
    if (t.data.o2o_fuwu_organization_freeze_money > parseFloat(t.data.o2o_fuwu_organization_avaliable_money)) {
      wx.showToast({
        icon: "none",
        title: '提现金额不足',
      })
      return false
    }
    if (t.data.pay_type == 2 && !t.data.bank_name) {
      wx.showToast({
        icon: "none",
        title: '请填写持卡人姓名',
      })
      return false
    }
    if (t.data.pay_type == 2 && !t.data.o2o_fuwu_money_log_desc) {
      wx.showToast({
        icon: "none",
        title: '请填写卡号',
      })
      return false
    }
    if (t.data.pay_type == 2 && !t.data.bank_address) {
      wx.showToast({
        icon: "none",
        title: '请填写开户行',
      })
      return false
    }
    if (t.data.pay_type == 3 && !t.data.bank_name) {
      wx.showToast({
        icon: "none",
        title: '请填写姓名',
      })
      return false
    }
    if (t.data.pay_type == 3 && !t.data.o2o_fuwu_money_log_desc) {
      wx.showToast({
        icon: "none",
        title: '支付宝账号',
      })
      return false
    }

    app.network.request1({
      url: url + "index/member/member_rechage",
      method: "POST",
      data: {
        token: wx.getStorageSync("token"),
        rechage_money: t.data.o2o_fuwu_organization_freeze_money,
        pdc_member_name: t.data.person.member_name,
        pdc_bank_name: t.data.bank_address,
        pdc_bank_no: t.data.o2o_fuwu_money_log_desc,
        pdc_bank_user: t.data.bank_name,
        type: t.data.options.forms == 'distribution' ? 1 : 2
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          wx.showModal({
            title: '提示',
            content: '提现申请提交成功，请等待审核',
            confirmText: '我知道了',
            showCancel: false,
            success: function (res) {
              timer = setTimeout(function () {
                wx.navigateBack()
              }, 2000)
            }
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
  // 获取个人信息
  getPerson: function () {
    var that = this;

    app.network.request1({
      url: url + "/index/member/member_message",
      method: "POST",
      data: { token: wx.getStorageSync("token") },
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            person: res.data.data,
            balance: res.data.data.available_rc_balance
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