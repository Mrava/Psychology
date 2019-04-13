const WebSocket = require('/utils/WebSocket.js')
App({
  onLaunch: function () {
    WebSocket.InitializationSocket();
    var data = this.globalData;
    wx.getSystemInfo({
      success: function (a) {
        data.windowHeight = wx.getSystemInfoSync().windowHeight
        data.capsuleWidth = wx.getMenuButtonBoundingClientRect().width
        data.capsuleHeight = wx.getMenuButtonBoundingClientRect().bottom - wx.getMenuButtonBoundingClientRect().top
        data.windowsWidth = wx.getSystemInfoSync().screenWidth - data.capsuleWidth
        data.StatusBar = a.statusBarHeight, "android" == a.platform ? data.CustomBar = a.statusBarHeight + 50 : data.CustomBar = a.statusBarHeight + 45;
      }
    });
  },

  /**
   * 设置顶部标题属性
   * @param {Object} that //必填参数
   * @param {String} title //可选参数，设置标题文字
   * @param {Boolean} isSearc //可选参数，是否设置状态栏搜索框尺寸
   */
  setTitleWidth: function (that, title, isSearc) {
    var capsule = wx.getMenuButtonBoundingClientRect(),//获取胶囊属性
      ScreenWidth = (capsule.right - capsule.left) * 2,//计算得到顶部除胶囊外可用宽度
      data = this.globalData
    if (title) {
      that.setData({
        indexTitle: title,//设置标题文字
        titleWidth: ScreenWidth,//设置标题宽度
      })
    }
    if (!isSearc) {
      that.setData({
        searchHeight: data.capsuleHeight,//设置搜索框高度
        searchWidth: data.windowsWidth - 10,//设置搜索框宽度
      })
    }
    that.setData({
      StatusBar: data.StatusBar,//设置状态栏高度
      CustomBar: data.CustomBar,//设置顶部标题高度
    })
  },

  /**
   * 设置顶部标题1属性
   * @param {Object} that //必填参数
   * @param {String} title //必填参数，设置标题文字
   */
  setTitle1Width: function (that, title,query) {
    var query = wx.createSelectorQuery(), t = this, //单位px；
      ScreenWidth = wx.getMenuButtonBoundingClientRect().left
    query.select('#toback').boundingClientRect(function (rect) {
      //console.log(rect)
      var data = t.globalData
      if (title) {
        that.setData({
          indexTitle: title,//设置标题文字
        })
      }
      that.setData({
        StatusBar: data.StatusBar,//设置状态栏高度
        CustomBar: data.CustomBar,//设置顶部标题高度
        titleWidth: ScreenWidth - rect.right - 10,//设置标题宽度
        titleMarginLeft: data.capsuleWidth - rect.right
      })
    }).exec();
  },
  globalData: {
    isGetUser: false,
  }
})