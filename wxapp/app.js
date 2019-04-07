const WebSocket = require('/utils/WebSocket.js')
App({
  onLaunch: function() {
    WebSocket.InitializationSocket();
    var data = this.globalData;
    wx.getSystemInfo({
      success: function(a) {
        data.capsuleWidth = wx.getMenuButtonBoundingClientRect().width
        data.capsuleHeight = wx.getMenuButtonBoundingClientRect().bottom - wx.getMenuButtonBoundingClientRect().top
        data.windowsWidth = wx.getSystemInfoSync().screenWidth - data.capsuleWidth
        data.StatusBar = a.statusBarHeight, "android" == a.platform ? data.CustomBar = a.statusBarHeight + 50 : data.CustomBar = a.statusBarHeight + 45;
      }
    });
  },
  setTitleWidth: function (that, title, isSearc) {
    var capsule = wx.getMenuButtonBoundingClientRect(),
    ScreenWidth = (capsule.right - capsule.left) * 2,
    data = this.globalData
    if (title) {
      that.setData({
        indexTitle: title,
        titleWidth: ScreenWidth,
      })
    }
    if (!isSearc){
      that.setData({
        searchHeight: data.capsuleHeight,
        searchWidth: data.windowsWidth-10,
      })
    }
    that.setData({
      StatusBar: data.StatusBar,
      CustomBar: data.CustomBar,
    })
  },
  globalData: {
    isGetUser: false,
  },
  
})