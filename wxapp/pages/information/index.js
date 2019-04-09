import { $stopWuxRefresher } from '../../dist/index'
const app = getApp(),
  utils = require('../../utils/util.js'),
  WebSocket = require('../../utils/WebSocket.js'),
  allData = getApp().globalData,
  api = require('../../utils/api.js')
var gdata;
/**
 * 计算scroll-view实际占界面的高度
 */
function setScrollViewHeight(that) {
  var query = wx.createSelectorQuery();// 单位px；
  query.select('#swiperHeight').boundingClientRect(function (rect) {
    // console.log(rect)
    that.setData({
      ScrollViewHeight: rect.height
    })
  }).exec();
}
Page({

  data: {
    TabCur: 0,
    scrollLeft: 0,
    scroll_y: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setTitle1Width(this, '资讯列表')
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    !allData.informationList ? this.getInformationClass()
      : this.setData({
        informationClass: allData.informationList
      }) & this.Initialization(0)
  },
  getInformationClass() {
    var t = this
    utils.GET('getInformationClass', function (res) {
      res.status == 0 ? t.setData({
        informationClass: res.data
      }) & (allData.informationList = res.data) & t.Initialization(0) :
        wx.showToast({
          title: '错误:' + res.msg,
          icon: 'none',
          mask: true
        })
    })
  },

  Initialization(index) {
    var t = this, data = allData.informationList[index], mdata,
      gdata = {
        query: 'ClassifyId:' + data.Id
      }
    //获取资讯列表
    utils.GET('getInformation', function (res) {
      mdata = 'informationClass[' + index + ']'
      setScrollViewHeight(t)
      res.status == 0 ? t.setData({
        [mdata]: dJSON(data,
          JSON.stringify(res.data),
          "info_list")
      }) : t.setData({
        [mdata]: dJSON(data, "\"ErrorNetwork\"",
          "info_list")
      }) & wx.showToast({
        title: '错误:' + res.msg,
        icon: 'none',
        mask: true,
      })
      wx.hideLoading()
    }, gdata)
  },

  tabSelect(e) {
    this.tabChange(e.currentTarget.dataset.id)
  },

  bindChange(e) {
    if (this.data.TabCur != e.detail.current) {
      this.tabChange(e.detail.current)
    }
  },

  tabChange(id) {
    var data = this.data.informationClass[id].info_list
    this.setData({
      TabCur: id,
      scrollLeft: (id - 1) * 60
    })
    if (!data && data != "ErrorNetwork") {
      this.Initialization(id)
    }
  },

  /**
   * 下拉开始的回调函数
   */
  onPulling() {
    console.log('onPulling')
    this.setData({
      scroll_y: false
    })
  },

  /**
   * 正在刷新:下拉完成的回调函数
   */
  onRefresh() {
    console.log('onRefresh')
    // setTimeout(() => {
    //   $stopWuxRefresher()
    // }, 2000)
  },

})

function dJSON(odata, ndata, name) {
  var JsonString
  JsonString = JSON.stringify(odata)
  JsonString = JsonString.substr(0, JsonString.length - 1);
  JsonString = "[" + JsonString + ",\"" + name + "\":" + ndata + "}]"
  JsonString = JSON.parse(JsonString)
  return JsonString[0]
}