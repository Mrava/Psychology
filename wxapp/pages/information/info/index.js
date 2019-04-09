const app = getApp(),
  utils = require('../../../utils/util.js'),
  WebSocket = require('../../../utils/WebSocket.js'),
  allData = getApp().globalData,
  api = require('../../../utils/api.js')
var imageUrl, path, title, doubleClick = 0
Page({

  data: {
    loadingImg: api.loadingImgUrl + 'loading-1.gif',
    ViewHeight: wx.getSystemInfoSync().screenHeight
  },

  onLoad: function (options) {
    var t = this,
      idInformationInfo
    app.setTitle1Width(this)
    allData.idInformationInfoId = options.id
    utils.GET('getInformationInfo', function (res) {
      idInformationInfo = res.data
      res.status == 0 ? t.setData({
        idInformationInfo,
        imgurl: options.img,
        indexTitle: '资讯详情'
      }) & (title = idInformationInfo.title,  //保存转发页面标题为资讯标题
        imageUrl = options.img,  //保存转发页面图片url
        path = '/pages/information/info/index?id=' + options.id + '&img=' + imageUrl) //保存转发页面地址及参数
         : t.setData({
        idInformationInfo: 'ErrorNetwork',
        indexTitle: '请求错误'
      }) & wx.showToast({
        title: '错误:' + res.msg,
        icon: 'none',
        mask: true,
      })
    })
  },

  //触发分享转发事件
  onShareAppMessage(res) {
    return {title,path,imageUrl}
  },

  //顶部标题被双击返回顶部
  doubleClick(e) {
    doubleClick ++
    if (doubleClick == 2) {
      doubleClick = 0
      this.setData({ scrollTop: 0 })
    }else{
      setTimeout(() => {
        doubleClick = 0
      }, 450);
    }
  }
})