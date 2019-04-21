const app = getApp(), utils = require('../../../utils/util.js'),
  Jim = require('../../../utils/Jim.js'), mjim = Jim.getJim, allData = app.globalData
var chatContentList = [], MessageInputValue = '', msg = '', mthat;

/**
 * 初始化数据
 */
function initData(that) {
  setScrollViewHeight(that)
  if (!allData.messageList||!allData.messageList[allData.chatId]) {
    chatContentList = null
  }else{
    chatContentList = allData.messageList[allData.chatId]
  }
  
  that.setData({
    StatusBar: allData.StatusBar,
    CustomBar: allData.CustomBar,
    chatContentList,
    toMsg: chatContentList ? 'msg-' + (chatContentList.msgs.length - 1) :'msg-0',
    selfAvatar: allData.iconUrl,
    otherAvatar: chatContentList ? chatContentList.avatar : '',
  });
}

/**
 * 计算聊天scroll-view实际占界面的高度
 */
function setScrollViewHeight(that) {
  var TopHeight = allData.CustomBar, //获取顶部高度
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

  onLoad: function (e) {
    initData(this);
  },

  setToMsg(){
    if (allData.messageList && allData.messageList[allData.chatId]) {
      this.setData({
        toMsg: 'msg-' + (allData.messageList[allData.chatId].msgs.length - 1)
      })
    }
  },
  onShow: function () {
    this.setToMsg()
  },

  onReady(){
    this.setToMsg()
  },

  setChatContentList(content) {
    var length = chatContentList?chatContentList.msgs.length:0
    if (!chatContentList){
      chatContentList = { name: allData.chatName,msgs: [] }
    }
    chatContentList.msgs[length] = { content: { msg_body: { text: content }, create_time: utils.formatTime(1)} }
    this.setData({
      chatContentList, toMsg: 'msg-' + (chatContentList.msgs.length - 1), MessageInputValue: ''
    })
    Jim.sendSingleMsg({
      target_username: chatContentList.name,
      content: msg
    })
  },

  //将输入框输入的内容保存到msg
  inputSendMessage(e) {
    var value = e.detail.value;
    msg = value
  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    this.setChatContentList(e.detail.value)
  },
});
