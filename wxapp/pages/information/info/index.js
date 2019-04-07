const app = getApp(),
  utils = require('../../../utils/util.js'),
  WebSocket = require('../../../utils/WebSocket.js'),
  allData = getApp().globalData
Page({

  data: {
    ViewHeight: allData.windowHeight - allData.CustomBar,
  },

  onLoad: function(options) {
    app.setTitle1Width(this,'资讯详情')
    var t = this,
      idInformationInfo
    allData.idInformationInfoId = options.id+10
    utils.GET('getInformationInfo', function(res) {
      idInformationInfo = res.data
      res.status == 0 ? t.setData({
          idInformationInfo
        }) :
        wx.showToast({
          title: '错误:' + res.msg,
          icon: 'none',
          mask: true,
        }) & t.setData({
          idInformationInfo: 'ErrorNetwork',
          indexTitle:'请求错误'
        })
    })
  },

})