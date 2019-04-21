const app = getApp(), api = require('../../utils/api.js'),
  utils = require('../../utils/util.js'), jim = require('../../utils/Jim.js'), allData = app.globalData
var gdata
Component({
  data: {
    width: wx.getSystemInfoSync().windowWidth,
    swiperIndex: 0, //初始化swiper索引
    swiperHeight: 350,
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0,
          msgNum: allData.msgNum
        })
        jim.setThat(this)
      }

    }
  },

  methods: {
    bindchange(e) {
      this.setData({
        swiperIndex: e.detail.current
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      app.setTitleWidth(this, '首页')
    },


    /**
     * 初始化页面数据 tip:在utils.login()中执行
     */
    Initialization() {
      var t = this, imgUrls, info_list, nav
      //获取Banner
      utils.GET('getBanner', function (res) {
        imgUrls = res.data
        res.status == 0 ? t.setData({ imgUrls })
          : wx.showToast({
            title: '错误:' + res.msg,
            icon: 'none',
            mask: true,
          })
        //获取导航
        utils.GET('getNav', function (res) {
          nav = res.data
          res.status == 0 ? t.setData({ nav })
            : wx.showToast({
              title: '错误:' + res.msg,
              icon: 'none',
              mask: true,
            })
          //获取资讯列表
          utils.GET('getInformation', function (res) {
            info_list = res.data
            res.status == 0 ? t.setData({ info_list })
              : t.setData({ info_list: 'ErrorNetwork' }) & wx.showToast({
                title: '错误:' + res.msg,
                icon: 'none',
                mask: true,
              })
            wx.hideLoading()
          }, { sortby: 'time', order: 'desc' })
        })
      })
    },

    /**
     * 在每次显示的时候判断是否获取userID，如果没有则执行登录
     */
    onShow: function () {
      if (!app.globalData.userID) {
        utils.login(this)
      }
    },

    /**
     * 跳转指定页面
     * @param {*} e 
     */
    toLinks(e) {
      var type = e.currentTarget.dataset.type,
        url = e.currentTarget.dataset.url
      type == 1 ? wx.navigateTo({ url: url }) : wx.navigateTo({ url: '../webview/webview?url=' + url })
    },
  }
})