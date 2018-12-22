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
        utils.getPhoneNmu(e.detail.encryptedData, e.detail.iv,this)
    },

    onShow: function() {
        this.setData({
            iconUrl: allData.iconUrl,
            userName: allData.name,
            phoneNum: allData.phoneNum
        })
    },

})