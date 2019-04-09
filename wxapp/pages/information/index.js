import { $stopWuxRefresher } from '../../dist/index'
const app = getApp(),
  utils = require('../../utils/util.js'),
  WebSocket = require('../../utils/WebSocket.js'),
  allData = getApp().globalData,
  api = require('../../utils/api.js'),
  LIMIT = "10"
/**
 * 计算scroll-view实际占界面的高度
 */
function setHeight(that) {
  var query = wx.createSelectorQuery();// 单位px；
  query.select('#topBar').boundingClientRect(function (rect) {
    console.log(rect)
    that.setData({
      contenHeight: rect.height + allData.CustomBar + rect.top,
      swiperItemHeight: allData.windowHeight
    })
  }).exec();
}

/**
 * 将分类和对应的资讯列表合并成一个数组
 * @param {Json} odata 获取的原有分类数据
 * @param {Int} ndata 获取到的对应分类的资讯列表
 * @param {Int} name 添加的字段名
 */
function dJSON(odata, ndata, name) {
  var JsonString
  JsonString = JSON.stringify(odata)
  JsonString = JsonString.substr(0, JsonString.length - 1);
  JsonString = "[" + JsonString + ",\"" + name + "\":" + ndata + ",\"moreStatus\":\"\"}]"
  JsonString = JSON.parse(JsonString)
  return JsonString[0]
}
Page({

  data: {
    TabCur: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setTitle1Width(this, '资讯列表')
    setHeight(this)//计算并设置ScrollView组件实际可用高度
    wx.showLoading({
      title: '加载中',
      mask: true,
    })

    //判断是否已经加载过分类列表，如果加载过，则不再加载节省响应时间
    !allData.informationList ? this.getInformationClass()
      : this.setData({
        informationClass: allData.informationList
      }) & this.Initialization(0)
  },
  /**
   * 获取分类列表
   */
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

  /**
   * 初始化列表分类所对应的资讯列表
   * @param {Int} index 索引，用于查找要求请求资讯列表所属的分类Id
   * @param {Boolean} isStopRefresher 判断是否是下拉刷新触发的，如果是则关闭刷新动画
   */
  Initialization(index, isStopRefresher) {
    var t = this, data = allData.informationList[index], mdata
    //获取资讯列表
    utils.GET('getInformation', function (res) {
      mdata = 'informationClass[' + index + ']'
      //判断是否是下拉刷新触发的，如果是则关闭刷新动画
      if (isStopRefresher) {
        $stopWuxRefresher("#refresher-" + index)
      }
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
    }, { query: 'ClassifyId:' + data.Id, sortby: 'time', order: 'desc' })
  },

  /**
   * 顶部分类Tab被单击事件
   * @param {*} e 
   */
  tabSelect(e) {
    var id = e.currentTarget.dataset.id, data = this.data.informationClass[id].length, t = this
    if (data != 4) this.Initialization(id)
    t.setData({
      TabCur: id,
    })
  },

  /**
   * 下拉开始的回调函数
   */
  onPulling() {
  },

  /**
   * 正在刷新:下拉完成的回调函数
   */
  onRefresh(e) {
    /**
     * 下拉刷新时触发初始化获取资讯
     * tip:采用延时操作纯属为了UI好看
     */
    setTimeout(() => {
      this.Initialization(e.currentTarget.dataset.index, true)
    }, 1000)
  },

  scrolltolower(e) {
    var t = this, index = e.currentTarget.dataset.index, data = t.data.informationClass[index],
      mdata = 'informationClass[' + index + '].info_list', moreStatus = 'informationClass[' + index + '].moreStatus',
      Status = t.data.informationClass[index].moreStatus
    /**
     * 如果Status==over 则证明已经加载完了所有，就没必要再执行请求
     * 如果Status==loading 则证明正在向服务器请求，就不再执行，避免重复请求
     */
    if (Status == 'over' || Status == 'loading') return
    t.setData({
      [moreStatus]: 'loading'
    })
    /**
     * 加载更多资讯
     * tip:采用延时操作纯属为了UI好看
     */
    setTimeout(() => {
      utils.GET('getInformation', function (res) {
        res.status == 0 ?
          (Array.isArray(res.data) ?
            t.setData({
              [mdata]: data.info_list.concat(res.data),
              [moreStatus]: ''
            }) : t.setData({
              [moreStatus]: 'over'
            })
          )
          : t.setData({
            [moreStatus]: 'erro'
          })
      }, { query: 'ClassifyId:' + data.Id, sortby: 'time', order: 'desc', limit: LIMIT, offset: data.info_list.length })
    }, 5000)
  },
})