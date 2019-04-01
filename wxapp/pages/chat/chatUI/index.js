const app = getApp();
const util = require('../../../utils/util.js')
const WebSocket = require('../../../utils/WebSocket.js')
var msg = '';
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    chatContentList: [{
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
    },],
    selfAvatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4207483386,3661573472&fm=11&gp=0.jpg',
    otherAvatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1975714303,1337345037&fm=26&gp=0.jpg',
  },
  onLoad: function () {
    var that = this
    wx.onSocketMessage(function (e) {
      console.log(e)
      that.setChatContentList(false, e.data)
    })
  },

  sendMessage(e) {
    WebSocket.sendMessage(msg)
    this.setChatContentList(true, msg)
  },

  setChatContentList(self, content) {
    var chatContentList = this.data.chatContentList,
      role = self ? 'self' : '',
      data = {
        role: role,
        chatContent: content,
        time: util.formatTime(1)
      }
    self ? this.setData({
      MessageInputValue: '',
    }) : null;
    chatContentList.push(data)
    this.setData({
      chatContentList: chatContentList
    })
    // wx.pageScrollTo({
    //   scrollTop: wx.getSystemInfoSync().windowHeight,
    // })
  },

  //将输入框输入的内容保存到msg
  inputSendMessage(e) {
    var value = e.detail.value,
      cursor = e.detail.cursor;
    msg = value
  },
});