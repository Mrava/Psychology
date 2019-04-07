var app = getApp()
Page({

    data: {
    },

    onLoad: function (res) {
        app.setTitle1Width(this,res.title)
    },
    onShareAppMessage: function () {

    }
})