var api = require('api')
var app = getApp()
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
    wx.checkSession({
        fail: function(res) { //身份过期
            wx.navigateTo({
                url: 'auth',
            })
            return '';
        },
        success: function(res) {
            wx.request({
                url: api.loginInfo,
                data: {
                    sessionKey: wx.getStorageSync("session_key"),
                    encryptedData: encryptedData,
                    iv: iv,
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function(res) {
                    console.log(res)
                    wx.setStorageSync("phoneNum", res.data.phoneNumber)
                    that.setData({
                        phoneNum: res.data.phoneNumber
                    })
                },
            })
        }
    })
}

function getLoginInfo() {
    
}

//注册
function signup(userinfo) {
    this.getLoginInfo()
    // var data = {
    //     user_code: res.code,
    //     user_name: userinfo
    // }
    wx.request({
        url: api.Anum.signup,
        data: "data",
        method: 'POST',
        success: function(res) {
            console.log(res)
        },
    })

}

function updateInfo(){
    var arr=Array(
        {
            "sds":1,
            "ddd":2
        }
    )
    console.log(arr)
}

//登录
function login() {
    var t = this
    if (!wx.getStorageSync("userData")) {
        wx.navigateTo({
            url: 'auth',
        })
        return null;
    }
    wx.checkSession({
        fail: function (res) { //身份过期
            wx.login({
                success: function (res) {
                    var data = {
                        user_code: res.code,
                    }
                    wx.request({
                        url: api.Anum.login,
                        data: data,
                        method: 'POST',
                        success: function (e) {
                            console.log(e)
                            wx.setStorageSync("session_key", e.data.$session_key)
                            app.globalData.token = e.data.token
                        },
                    })
                    // wx.request({
                    //     url: 'https://api.weixin.qq.com/sns/jscode2session',
                    //     data: {
                    //         appid: appId,
                    //         secret: secret,
                    //         js_code: res.code,
                    //         grant_type: "authorization_code"
                    //     },
                    //     method: 'GET',
                    //     success: function (res) {
                    //         var userData = wx.getStorageSync("userData")
                    //         wx.setStorageSync("session_key", res.data.session_key)
                    //         wx.setStorageSync("openid", res.data.openid)
                    //         t.login()
                    //     },
                    // })
                },
            })
        }
    })
    
    //this.updateInfo()
}

module.exports = {
    formatTime: formatTime,
    signup: signup,
    login: login,
    getLoginInfo: getLoginInfo,
    getPhoneNmu: getPhoneNmu,
    updateInfo: updateInfo,
}