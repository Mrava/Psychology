var app = getApp()
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
Component({
  data: {
    width: wx.getSystemInfoSync().windowWidth,
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题.
    swiperHeight: 350,
    nav: [{
      img: "../images/1.png",
      title: "文章资讯",
      Type:1,
      Url:'/pages/information/index'
    }, {
      img: "../images/2.png",
      title: "趣味测评"
    }, {
      img: "../images/3.png",
      title: "成为专家"
    }, {
      img: "../images/4.png",
      title: "关于我们"
    },]
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
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
      app.setTitleWidth(this,'首页')
    },

    Initialization(){
      var t = this, imgUrls, info_list
      //获取Banner
      utils.GET('getBanner', function (res) {
        imgUrls = res.data
        res.status == 0 ? t.setData({ imgUrls })
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
        })
      })
    },

    onShow: function () {
      if (!app.globalData.userID) {
        utils.login(this)
      }
    },

    toLinks(e) {
      console.log(e)
      var type = e.currentTarget.dataset.type,
          url = e.currentTarget.dataset.url
      type==1?wx.navigateTo({
        url: url
      }) : wx.navigateTo({
          url: '../webview/webview?url='+url
      })
    },
  }
})