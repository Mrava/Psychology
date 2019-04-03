const app = getApp();
const util = require('../../../utils/util.js')
const WebSocket = require('../../../utils/WebSocket.js')
var chatContentList = [], MessageInputValue = '', msg = '';

/**
 * 初始化数据
 */
function initData(that) {
  setScrollViewHeight(that)
  chatContentList = [
    {
      role: 'self',
      chatContent: '在吗?',
      time: '16:03:13'
    }, {
      role: '',
      chatContent: '怎么了',
      time: '16:03:45'
    }, {
      role: 'self',
      chatContent: '你知道中国人比起外国人来在表达上很含蓄吗?',
      time: '16:04:10'
    }, {
      role: '',
      chatContent: '怎么说?',
      time: '16:04:56'
    }, {
      role: 'self',
      chatContent: '举个例子，外国人和喜欢的人聊天，会直接说i love you，而中国人就不一样了',
      time: '16:05:23'
    }, {
      role: '',
      chatContent: '怎么个不一样？',
      time: '16:06:06'
    }, {
      role: 'self',
      chatContent: "中国人和喜欢的人说话，会先问一句 '在吗?'",
      time: '16:07:15'
    }
  ]

  that.setData({
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    chatContentList,
    selfAvatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4207483386,3661573472&fm=11&gp=0.jpg',
    otherAvatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1975714303,1337345037&fm=26&gp=0.jpg',
  });
}

/**
 * 计算聊天scroll-view实际占界面的高度
 */
function setScrollViewHeight(that) {
  var TopHeight = app.globalData.CustomBar, //获取顶部高度
    ScreenHeight = wx.getSystemInfoSync().windowHeight, //获取屏幕高度
    query = wx.createSelectorQuery();//获取底部输入框所占屏幕高度  单位px；
  query.select('#inputView').boundingClientRect(function (rect) {

    that.setData({
      ScrollViewHeight: ScreenHeight - TopHeight - rect.height
    })
  }).exec();
}
Page({
  data: {
  },

  onLoad: function () {
    var that = this
    initData(that);
    wx.onSocketMessage(function (e) {
      console.log(e)
      that.setChatContentList(false, e.data)
    })
  },

  onReady: function () {
    this.setData({
      toMsg: 'msg-' + (chatContentList.length - 1),
    })
  },

  setChatContentList(self, content) {
    var role = self ? 'self' : ''
    self ? this.setData({
      MessageInputValue: '',
    }) : null;
    chatContentList.push({
      role: role,
      chatContent: content,
      time: util.formatTime(1)
    })
    this.setData({
      chatContentList, toMsg: 'msg-' + (chatContentList.length - 1),
    })
  },

  //将输入框输入的内容保存到msg
  inputSendMessage(e) {
    var value = e.detail.value,
      cursor = e.detail.cursor;
    msg = value
  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    WebSocket.sendMessage(msg)
    this.setChatContentList(true, e.detail.value)
  },
});