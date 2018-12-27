var api = require('api')
var app = getApp()
var globalData = app.globalData
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//获取手机号
function getPhoneNmu(encryptedData, iv, that) {
    wx.login({
        success: function(e) {
            var data = {
                user_code: e.code
            }
            wx.request({
                url: api.url('session_key'),
                data: data,
                method: 'GET',
                success: function(res) {
                    wx.request({
                        url: api.loginInfo,
                        data: {
                            sessionKey: res.data.data.session_key,
                            encryptedData: encryptedData,
                            iv: iv,
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        method: 'POST',
                        success: function(res) {
                            var errMsg = res.data
                            console.log(res.data)
                            if (errMsg != -1) {
                                that.setData({
                                    phoneNum: res.data.phoneNumber
                                })
                                globalData.phoneNum = res.data.phoneNumber
                            }
                        },
                    })
                },
            })
        },
    })
}

//注册
function signup(d) {
    var user = wx.getStorageSync("userInfo")
    var data = {
        id: d.id,
        user_name: !globalData.name ? user.nickName : globalData.name,
        telephone: "",
        address: "",
        gender: !globalData.gender ? user.gender : globalData.gender
    }
    wx.request({
        url: api.url("signup"),
        data: data,
        method: 'POST',
        success: function(res) {
            globalData.userID = res.data.id
            globalData.isGetUser = false
            globalData.iconUrl = !res.data.portrait ? user.avatarUrl : res.data.portrait
            console.log('用户注册',res)
        },
    })

}

//登录
function login() {
    var t = this
    if (!wx.getStorageSync("userData")) {
        wx.navigateTo({
            url: '/pages/user/auth',
        })
        return null;
    }
    var user = wx.getStorageSync("userInfo")
    wx.login({
        success: function(res) {
            var data = {
                user_code: res.code,
            }
            wx.request({
                url: api.Anum.login,
                data: data,
                method: 'POST',
                success: function(e) {
                    globalData.token = e.data.data.token
                    wx.setStorageSync("user_id", e.data.data.id)
                    var status = e.data.status
                    if (status == 9001) { //用户未注册
                        setTimeout(function(){
                            t.signup(e.data.data)
                        },1500)
                    } else if (status == 0) {
                        var data = e.data.data
                        globalData.userID = data.id
                        globalData.name = data.user_name
                        globalData.isGetUser = false
                        globalData.iconUrl = !data.portrait ? user.avatarUrl : data.portrait
                        console.log('用户已注册')
                    }
                },
            })
        },
    })
}

function uploadFile(urlkey, cb,temp,data) {
    var url = api.url(urlkey)
    console.log(url)
    wx.uploadFile({
        url: url,
        filePath: temp,
        name: 'file',
        formData: data,
        success: function(res) {
            wx.hideLoading();
            return typeof cb == "function" && cb(res.data)
        },
        fail: function(res) {
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

function getReq(urlkey, cb, token) {
    var url = api.url(urlkey)
    url = token == true ? url + '&token=' + globalData.token : url
    console.log(url)
    wx.request({
        url: url,
        method: 'GET',
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

function postReq(url, data, cb) {
    console.log(url)
    wx.request({
        url: url,
        data: data,
        method: 'POST',
        success: function(res) {
            wx.hideLoading();
            return typeof cb == "function" && cb(res.data)
        },
        fail: function() {
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
    formatTime: formatTime,
    signup: signup,
    login: login,
    getPhoneNmu: getPhoneNmu,
    GET: getReq,
    POST: postReq,
    UpLoadFile: uploadFile,
}