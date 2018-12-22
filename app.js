
App({
    onLaunch: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.globalData.StatusBar = a.statusBarHeight, "android" == a.platform ? t.globalData.CustomBar = a.statusBarHeight + 50 : t.globalData.CustomBar = a.statusBarHeight + 45;
            }
        });
    },
    globalData: {
        token:''
    }
})