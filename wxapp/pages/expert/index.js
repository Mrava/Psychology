var app = getApp()
var allData = app.globalData
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
Component({
  data: {
    width: wx.getSystemInfoSync().windowWidth,
    info_class: { style: '', index: '' },
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      app.setTitleWidth(this, true)
      Initialization(this)
    },

    /* 暂时废弃
    toInfo: function (i) {
      allData.expert_data = this.data.expert_list[i.currentTarget.dataset.index]
      wx.navigateTo({
        url: 'info/expert_info'
      })
    },
    */

    /**
     * 拨打电话
     * @param {*} e 
     */
    call: function (e) {
      var num = this.data.expert_list[e.currentTarget.dataset.index].PhoneNum
      if (num && num != '') {
        wx.makePhoneCall({
          phoneNumber: num
        })
      }else{
        wx.showToast({
          title: '该专家没有预留联系方式',
          icon: 'none',
          mask: true,
        })
      }

    },

    /**
     * 查看详细介绍
     * @param {*} e 
     */
    seeInfo(e) {
      var index = e.currentTarget.dataset.id
      var style = this.data.info_class.style != '' &&
        this.data.info_class.index == index ?
        '' : "height: 100%;background-color:#FFF;" +
        "word-break:break-all;white-space:pre-wrap;" +
        "line-height:35rpx;"
      this.setData({
        info_class: {
          style: style,
          index: index
        }
      })
    }
  }
})

function Initialization(that) {
  var expert_list, expert_class

  wx.showLoading({
    title: '加载中',
    mask: true,
  })

  //获取专家分类
  utils.GET('getExpertClass', (res) => {
    expert_class = res
    //console.log("expert_class:",expert_class)
    //获取专家列表
    utils.GET('getExpert', (res) => {
      expert_list = res.data
      res.status == 0 ? that.setData({ expert_list })
        : that.setData({ expert_list: 'ErrorNetwork' }) & wx.showToast({
          title: '错误:' + res.msg,
          icon: 'none',
          mask: true,
        })
      wx.hideLoading()
    })
  })

}