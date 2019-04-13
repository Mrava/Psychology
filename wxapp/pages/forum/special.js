var app = getApp()
var allData = app.globalData
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
Page({

    data: {
    },

    onLoad: function (res) {
        app.setTitle1Width(this, res.title)
        Initialization(this, res.id)
    },

    onShareAppMessage: function () {

    }

})

function Initialization(that, id) {
    wx.showLoading({
        title: '加载中',
        mask: true,
    })
    utils.GET('getCommunity', (e) => {
        console.log(e)
        e.status == 0 ? that.setData({
            new_list: e.data
        }) : that.setData({ new_list: 'ErrorNetwork' }) &
            wx.showToast({
                title: '错误:' + e.msg,
                icon: 'none',
                mask: true,
            })
    }, { sortby: 'time', order: 'desc', query: 'classifyId:' + id })
}