var app = getApp()
var allData = app.globalData
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
var isChoice, name, age, phone;
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
  onLoad: function (options) {
    isChoice = false
  },

  RegionChange: function (e) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },

  onShow: function (res) {
    var t = this,
      gender = (allData.gender == 1 ? true : false)
    t.setData({
      iconUrl: allData.iconUrl,
      userName: allData.name,
      age: allData.age,
      gender: gender,
      phoneNum: allData.phoneNum,
      region: allData.address,
    })
  },

  switch2Change(e) {
    this.setData({
      gender: e.detail.value
    })
  },

  choice_img(e) {
    var t = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var iconUrl = res.tempFilePaths
        isChoice = true
        t.setData({
          iconUrl: res.tempFilePaths[0]
        })
      }
    })
  },

  changeInput(e) {
    var key = e.target.dataset.name, value = e.detail.value
    switch (key) {
      case 'name':
        name = value
        break;
      case 'age':
        age = value
        break;
      case 'phone':
        phone = value
        break;
    }
  },

  updataUserInfo() {
    var t = this
    wx.showLoading({
      title: '提交中...',
      mask: true,
    })
    !isChoice ? t.updateData() : utils.UpLoadFile('upload', function (res) {
      res.status == 0 ?
        t.updateData(res.data.fileUrl) :
        wx.showToast({
          title: '上传头像失败，请稍候重试！',
          icon: 'none',
          mask: true
        })
    }, t.data.iconUrl)
  },

  updateData(e) {
    var t = this.data
    var data = {
      icon: isChoice ? e : t.iconUrl,
      user_name: name ? name : t.userName,
      age: age ? age : t.age,
      sex: t.gender ? 1 : 2,
      address: t.region,
      phoneNum: phone ? phone : t.phoneNum
    }
    utils.PUT('updateUserInfo', data, function (res) {
      console.log(res)
      res.status==0?
        allData.isGetUser = false & wx.showToast({
          title: '保存成功',
          icon: 'none',
          mask: true
        })
        : wx.showToast({
          title: '保存失败',
          icon: 'none',
          mask: true
        })
      
    })
  }
})