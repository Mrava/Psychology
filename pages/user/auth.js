var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar
    },
    onGetUserInfo: function(t) {
        var errMsg = t.detail.errMsg
        if (errMsg == 'getUserInfo:ok'){
            wx.setStorageSync("user_info", t.detail.userInfo)
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