var app = getApp()
var allData = app.globalData
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        user_info: wx.getStorageSync("userInfo"),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    getPhoneNumber(e) {
        this.getPhoneNmu(e.detail.encryptedData, e.detail.iv)
    },

    onShow: function() {
        var t = this
        // console.log(allData.isGetUser)
        if (!allData.isGetUser) {
            wx.showLoading({
                title: '加载中',
            })
            utils.GET('userInfo', function (res) {
                var iconUrl = !res.data.portrait ? api.rootUrl + 'res/user_icon.png' : res.data.portrait
                allData.name = res.data.user_name
                allData.address = res.data.address
                allData.phoneNum = res.data.telephone
                allData.iconUrl = iconUrl
                allData.userID = res.data.id
                allData.gender = res.data.gender
                allData.isGetUser = !res.data.address && !res.data.user_name && !res.data.gender? false:true
                console.log(res.data.address)
                t.setData({
                    address: res.data.address,
                    userName: res.data.user_name,
                    gender: res.data.gender,
                    iconUrl: iconUrl,
                })
            }, true)
        }
    },

    editInfo: function() {
        wx.navigateTo({
            url: 'editInfo',
        })
    },

    //获取手机号
    getPhoneNmu(encryptedData, iv) {
        var that = this
        wx.login({
            success: function (e) {
                var data = {
                    user_code: e.code
                }
                wx.request({
                    url: api.url('session_key'),
                    data: data,
                    method: 'GET',
                    success: function (res) {
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
                            success: function (res) {
                                var errMsg = res.data
                                console.log(res.data)
                                if (errMsg != -1) {
                                    that.setData({
                                        phoneNum: res.data.phoneNumber
                                    })
                                    allData.phoneNum = res.data.phoneNumber
                                }
                            },
                        })
                    },
                })
            },
        })
    }

})