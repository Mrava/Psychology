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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    RegionChange: function(e) {
        console.log(e)
        this.setData({
            region: e.detail.value
        })
    },

    onShow: function(res) {
        var t = this,
            gender = allData.gender == 1 ? false : true

        t.setData({
            iconUrl: allData.iconUrl,
            userName: allData.name,
            age: "",
            gender: gender,
            phoneNum: allData.phoneNum,
            address: allData.address,
        })
    },
    switch2Change(e) {
        // console.log('switch2 发生 change 事件，携带值为', e.detail.value)
        this.setData({
            gender: e.detail.value
        })
    },
    choice_img(e) {
        var t = this
        wx.chooseImage({
            count: 1,
            success: function(res) {
                var iconUrl = res.tempFilePaths
                t.setData({
                    iconUrl: res.tempFilePaths[0]
                })
            }
        })
    },
    updataUserInfo(e){
        var t = this
        var data = {
            user_name:'---',
            year:'23',
            telephone:'15595108859',
            address:"------"
        }
        utils.UpLoadFile('upload_user_icon', function (res) {
            console.log(res)
        },t.data.iconUrl,data)
    },
})