var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        user_info: wx.getStorageSync("userInfo"),
        phoneNum: wx.getStorageSync("phoneNum"),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    getPhoneNumber(e) {
        utils.getPhoneNmu(e.detail.encryptedData, e.detail.iv,this)
    },

    onShow: function() {
        utils.login()
        this.setData({
            user_info: wx.getStorageSync("userInfo")
        })
    },

})