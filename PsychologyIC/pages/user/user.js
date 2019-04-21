const app = getApp(),
  allData = app.globalData,
  utils = require('../../utils/util.js'),
  init = require('../../utils/init.js'),
  jim = require('../../utils/Jim.js')

Component({
  /**
   * 页面的初始数据
   */
  data: {
    user_info: wx.getStorageSync("userInfo"),
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 4,
          msgNum: allData.msgNum
        })
        jim.setThat(this)
      }
    }
  },
  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onReady: function (options) {
      if (!allData.isGetUser) wx.showLoading({ title: '加载中', mask: true })
      !wx.getStorageSync('wave') ?
        init.seveImage(this, 'wave.gif', 'wave') :
        this.setData({
          wave: wx.getStorageSync('wave')
        }) & this.getUserInfo()
    },

    getUserInfo: function () {
      var t = this
      if (!allData.isGetUser) {
        app.setTitleWidth(this);
        utils.GET('userInfo', function (res) {
          //console.log('获取用户数据:', res) //回调数据调试
          var iconUrl = !res.data.portrait ? allData.iconUrl : res.data.portrait
          allData.name = res.data.user_name
          allData.address = res.data.address
          allData.phoneNum = res.data.telephone
          allData.iconUrl = iconUrl
          allData.gender = res.data.gender
          allData.age = res.data.year

          // //防止点击过快出现数据为缓存后，无法自动再次加载的尴尬情况
          allData.isGetUser = !res.data.address && !res.data.user_name && !res.data.gender ? false : true
          t.setData({
            address: res.data.address,
            userName: res.data.user_name,
            gender: res.data.gender,
            iconUrl: iconUrl,
          })
        }, true)
      }
    },

    //跳转页面
    toPage(e) {
      var page = e.currentTarget.dataset.page
      allData.that = this
      wx.navigateTo({
        url: page
      })
    }

  }
})