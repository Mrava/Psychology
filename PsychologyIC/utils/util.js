const api = require('api'), app = getApp(), globalData = app.globalData, HEADER = "application/x-www-form-urlencoded", jim = require('Jim.js')
var userCode, token, mthat;

/**
 * 返回当前时间
 * @param {Int} type 1：返回当前时间;2：返回当前年月日;other：返回当前年月日及时间
 */
function formatTime(type) {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  var time = [hour, minute, second].map(formatNumber).join(':'),
    ydate = [year, month, day].map(formatNumber).join('/')
  switch (type) {
    case 1:
      return time
      break;
    case 2:
      return ydate
      break;
    default:
      return ydate + ' ' + time
      break;
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//注册
function signup(d) {
  var user = wx.getStorageSync("userInfo")
  postReq('upload', { fileurl: user.avatarUrl }, (s) => {
    wx.showLoading({
      title: '注册中',
      mask: true,
    })
    var fileUrl = user.avatarUrl;
    if (s.status == 0) {
      fileUrl = s.data.fileUrl
    }
    var data = {
      user_name: !globalData.name ? user.nickName : globalData.name,
      telephone: '',
      address: '',
      gender: user.gender,
      portrait: fileUrl
    }
    // return null;
    wx.request({
      url: api.Anum.signup + "?token=" + d.token,
      data: data,
      method: 'POST',
      header: {
        "content-type": HEADER
      },
      success: function (res) {
        switch (res.data.status) {
          case -1:
            wx.showToast({
              title: '错误:' + res.msg,
              icon: 'none',
              mask: true,
            })
            break;
          case 0:
            login(mthat)//再次执行登录
            break;
          default:
            break;
        }
        wx.hideLoading()
        console.log('用户注册:', res)
      },
    })
  })
}

//登录
function login(that) {
  mthat = that
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  var t = this
  if (!wx.getStorageSync("userData")) {
    wx.navigateTo({
      url: '/pages/user/auth',
    })
    return null;
  }
  var user = wx.getStorageSync("userInfo")
  wx.login({
    success: function (res) {
      var data = {
        user_code: res.code,
      }
      //console.log(api.Anum.login)
      wx.request({
        url: api.Anum.login,
        data: data,
        method: 'POST',
        header: {
          "content-type": HEADER
        },
        success: function (e) {
          globalData.token = e.data.data.token
          wx.setStorageSync("user_id", e.data.data.id)
          var status = e.data.status, data = e.data.data
          if (e.data.status == 0) { //登录成功
            globalData.userID = data.id
            globalData.name = data.user_name
            globalData.isGetUser = false
            globalData.iconUrl = !data.portrait ? user.avatarUrl : data.portrait
            console.log('用户已登录:', e)
            jim.init(this)
            that.Initialization()//初始化页面数据
          } else {
            signup(data)
            console.log('用户未注册,正在自动注册...', e)
          }
        },
      })
    },
  })
}

/**
 * UPDATE_FILE 上传修改的资料
 * @param {String} urlkey URL标识符
 * @param {function} cb 回调函数
 * @param {String} temp 选择的图片路径
 */
function uploadFile(urlkey, cb, temp, formData) {
  var url = api.url(urlkey)
  //console.log(url)
  wx.uploadFile({
    url: url,
    filePath: temp,
    name: 'file',
    formData: formData,
    success: function (res) {
      var obj = JSON.parse(res.data);
      obj.status != 0 ? wx.hideLoading() : null
      return typeof cb == "function" && cb(obj)
    },
    fail: function (res) {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    },
  })
}

/**
 * GET
 * @param {String} urlkey URL标识符
 * @param {function} cb 回调函数
 * @param {String} token 令牌
 */
function getReq(urlkey, cb, data) {
  var url = api.url(urlkey)
  //console.log('请求链接:', url)
  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: {
      "content-type": HEADER
    },
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}
/**
 * POST
 * @param {String} urlkey URL标识符
 * @param {String[]} data 提交的数据
 * @param {function} cb 回调函数
 * @param {String} Header 自定义请求头
 */
function postReq(urlkey, data, cb,Header) {
  var url = api.url(urlkey)
  // console.log('请求链接:', url)
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    header: {
      "content-type": !Header ? HEADER : Header
    },
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })

}

/**
 * PUT
 * @param {String} urlkey URL标识符
 * @param {String[]} data 提交的数据
 * @param {function} cb 回调函数
 */
function putReq(urlkey, data, cb) {
  var url = api.url(urlkey)
  wx.request({
    url: url,
    data: data,
    method: 'PUT',
    header: {
      "content-type": HEADER
    },
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })

}

module.exports = {
  formatTime,
  signup,
  login,
  GET: getReq,
  POST: postReq,
  PUT: putReq,
  UpLoadFile: uploadFile
}