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
  preventDuplicateClicks
}