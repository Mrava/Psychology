const app = getApp(),
  utils = require('../../../utils/util.js'),
  WebSocket = require('../../../utils/WebSocket.js'),
  allData = getApp().globalData

/**
 * 计算顶部实际占界面的宽度
 */
function setTitleWidth(that) {
  var query = wx.createSelectorQuery(),//单位px；
  ScreenWidth = wx.getMenuButtonBoundingClientRect().left
  query.select('#toback').boundingClientRect(function (rect) {
    that.setData({
      titleWidth: ScreenWidth - rect.right - 10
    })
  }).exec();
}
Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ViewHeight: wx.getSystemInfoSync().windowHeight,
    ViewWidth: wx.getSystemInfoSync().windowWidth
  },

  onLoad: function (options) {
    setTitleWidth(this)
    var t = this, idInformationInfo
    allData.idInformationInfoId = options.id
    utils.GET('getInformationInfo', function (res) {
      idInformationInfo = res.data
      console.log(res)
      res.status == 0 ? t.setData({ idInformationInfo })
        : wx.showToast({
          title: '错误:' + res.msg,
          icon: 'none',
          mask: true,
        }) & t.setData({ idInformationInfo: 'ErrorNetwork' })
    })
  },

})