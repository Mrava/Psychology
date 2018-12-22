var a = getApp()
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar
    },
    onGetUserInfo: function(t) {
        var errMsg = t.detail.errMsg
        if (errMsg == 'getUserInfo:ok'){
            wx.setStorageSync("userInfo", t.detail.userInfo)
            wx.setStorageSync("userData", t.detail)
            wx.navigateBack({
                delta: 1,
            })
        }else{
            wx.showToast({
                title: '请授权！',
                icon: 'none',
                mask: true,
            })
        }
    }
});