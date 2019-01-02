var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Title:'',
    },

    onLoad: function (res) {
        this.setData({
            Title:res.title
        })
    },
    onShareAppMessage: function () {

    }
})