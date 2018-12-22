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
                            if (errMsg != -1) {
                                that.setData({
                                    phoneNum: res.data.phoneNumber
                                })
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
        user_name: user.nickName,
        telephone: "null",
        address: "null",
        gender: '1'
    }
    //console.log(d)
    wx.request({
        url: api.url("signup"),
        data: data,
        method: 'POST',
        success: function(res) {
            globalData.id = res.id
            globalData.name = user.nickName
            globalData.iconUrl = !data.portrait ? user.avatarUrl : data.portrait
            console.log('用户已注册成功')
            //console.log(res)
        },
    })

}

function updateInfo() {
    var arr = Array({
        "sds": 1,
        "ddd": 2
    })
    console.log(arr)
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
                    //console.log(e)
                    if (status == 9001) { //用户未注册
                        t.signup(e.data.data)
                        console.log('用户未注册')
                    } else if (status == 0) {
                        var data = e.data.data
                        globalData.id = data.id
                        globalData.name = data.user_name
                        globalData.iconUrl = !data.portrait ? user.avatarUrl : data.portrait
                        console.log('用户已注册')
                    }
                },
            })
        },
    })

    //this.updateInfo()
}

module.exports = {
    formatTime: formatTime,
    signup: signup,
    login: login,
    getPhoneNmu: getPhoneNmu,
    updateInfo: updateInfo,
}