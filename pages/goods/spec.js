// pages/goods/spec.js
const app = getApp()
var url = getApp().globalData.url, timer;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsid: {
      type: String,
      value: '',      
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    hidespec:true,
    checkval:'',
    unique: ''
  },    
  /**
   * 组件的方法列表
   */
  methods: {
    takeorder: function () {
      var that=this;

      if (!wx.getStorageSync('token')) {
        wx.navigateTo({
          url: '/pages/logs/logs',
        })
        return false;
      }
      if (that.data.productAttr.length != 0 && (!that.data.checkbox || (that.data.checkbox.length < that.data.productAttr.length))){
        wx.showToast({
          icon:"none",
          title: '请选择规格！',
        })
        return false;
      }
      wx.navigateTo({
        url: '/pages/goods/takeorder?uniqueId=' + that.data.unique + '&productId=' + that.data.goodsid + '&checkval=' + that.data.checkval + '&money=' + that.data.money +'&product_type='+that.data.msg.type,
      })
    },
    closespec:function(){
      this.setData({
        hidespec: true
      })
    },
    getMsg: function () {
      var that = this;

      that.showspec();
      app.network.request({
        url: url + "product/detail",
        method: "GET",
        data: { id: that.data.goodsid },
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              productAttr: res.data.data.productAttr,
              productValue: res.data.data.productValue,
              msg: res.data.data.storeInfo,
              money: res.data.data.storeInfo.price
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
    
    showspec: function () {
      this.setData({
        hidespec: false
      })     
    },
    // 选择
    chosevlue:function(e){
      var that = this, 
          productAttr = that.data.productAttr, 
          productValue = that.data.productValue,
          itemname = e.currentTarget.dataset.itemname, 
          val = e.currentTarget.dataset.val,
          index = e.currentTarget.dataset.ind,
          checkbox=[];
      
      for (var i = 0; i < productAttr.length; i++){
        if (itemname == productAttr[i].attr_name){
          for (var j = 0; j < productAttr[i].attr_value.length; j++){
            productAttr[i].attr_value[j].check = false;
            productAttr[i].attr_value[index].check = true;
          }          
        }
      }
      that.setData({
        productAttr: productAttr
      })
      attrArr();
      function attrArr(){
        for (var i = 0; i < productAttr.length; i++) {
          for (var j = 0; j < productAttr[i].attr_value.length; j++) {
            if (productAttr[i].attr_value[j].check) {
              checkbox.push(productAttr[i].attr_value[j].attr)
            }
          }
        }
        that.setData({
          checkbox: checkbox,
          checkval: checkbox.join(',')
        })
        for (var i = 0; i < productValue.length; i++){
          if (productValue[i].name == checkbox.join(',')){
            that.setData({
              money: productValue[i].value.price,
              unique: productValue[i].value.unique
            })
          }
        }
      }
    },
  }
})
