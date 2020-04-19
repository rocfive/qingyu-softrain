var requestHandler = {
  url: '',
  data: {},
  method: '',
  success: function (res) {
  },
  fail: function () {
  },
  complete: function () {
  }
}

function request(requestHandler) {
  var data = requestHandler.data;
  var url = requestHandler.url;
  var method = requestHandler.method;
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: data,
    method: method,
    success: function (res) {
      wx.hideLoading();
      requestHandler.success(res)
    },
    fail: function () {
      wx.hideLoading();
      requestHandler.fail();
    },
    complete: function () {

    }
  })
}
// 会员登录
function request1(requestHandler) {
  var data = requestHandler.data;
  var url = requestHandler.url;
  var method = requestHandler.method;

  if (!wx.getStorageSync('token')) {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
    return false;
  }
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      'content-Type': 'application/json',
      'Authori-zation': 'Bearer '+wx.getStorageSync("token")
    },
    success: function (res) {
      wx.hideLoading();
      requestHandler.success(res)
      if (res.data.status =="410000"){
        wx.navigateTo({
          url: '/pages/logs/logs',
        })
      }
    },
    fail: function () {
      wx.hideLoading();
      requestHandler.fail();
    },
    complete: function () {

    }
  })
}
// 商家登录
function request2(requestHandler) {
  var data = requestHandler.data;
  var url = requestHandler.url;
  var method = requestHandler.method;

  if (!wx.getStorageSync('mstoken')) {
    console.log("1111")
    wx.redirectTo({
      url: '/pages/business/login?froms=shop',
    })
    return false;
  }
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      'content-Type': 'application/json',
      'Authori-zation-ms': 'Menshop ' + wx.getStorageSync("mstoken")
    },
    success: function (res) {
      wx.hideLoading();
      requestHandler.success(res)
      if (res.data.status == "410000") {
        wx.removeStorageSync("mstoken")
        wx.redirectTo({
          url: '/pages/business/login?froms=shop',
        })
      }
    },
    fail: function () {
      wx.hideLoading();
      requestHandler.fail();
    },
    complete: function () {

    }
  })
}
function request3(requestHandler) {
  var data = requestHandler.data;
  var url = requestHandler.url;
  var method = requestHandler.method;

  if (!wx.getStorageSync('metoken')) {
    wx.redirectTo({
      url: '/pages/business/login?froms=employee',
    })
    return false;
  }
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      'content-Type': 'application/json',
      'Authori-zation-me': 'Employee ' + wx.getStorageSync("metoken")
    },
    success: function (res) {
      wx.hideLoading();
      requestHandler.success(res)
      if (res.data.status == "410000") {
        wx.removeStorageSync("metoken")
        wx.redirectTo({
          url: '/pages/business/login?froms=employee',
        })
      }
    },
    fail: function () {
      wx.hideLoading();
      requestHandler.fail();
    },
    complete: function () {

    }
  })
}
//点击防重
let isClick = [];
let preventDuplicateClicks = function (index) {
  if (!index || isNaN(index)) index = 0;
  if (!isClick[index]) {
    isClick[index] = true
    console.log(isClick)
    setTimeout(function () {
      isClick[index] = false
    }, 2000);
    return false;
  } else {
    return true;
  }
}

module.exports = {
  request: request,
  request1: request1,
  request2: request2,
  request3: request3,
  preventDuplicateClicks
}