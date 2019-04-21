const app = getApp(),
  utils = require('../../utils/util.js'),
  allData = getApp().globalData,
  api = require('../../utils/api.js')
var subArr = [], communityClass
Component({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray: [],
    dataIndex: [0, 0]
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2,
          msgNum: allData.msgNum
        })
        jim.setThat(this)
      }
    },
  },
  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      app.setTitle1Width(this, '发布')
      var t = this, dataArray = [], mainArray = [], subArray, data, sub
      utils.GET('getCommunity_class', (res) => {//获取专家所有分类
        communityClass = data = res.data
        for (let i = 0; i < data.length; i++) {
          subArray = []
          sub = !data[i].sub ? 0 : data[i].sub.length
          for (let a = 0; a < sub; a++) {
            subArray[a] = data[i].sub[a].Title
          }
          mainArray[i] = data[i].name
          subArr[i] = subArray
        }
        dataArray = [mainArray, subArr[0]]
        t.setData({ dataArray })
      })
    },

    /**
     * 所属领域 picker value 改变时触发 change 事件
     * @param {*} e
     */
    Change(e) {
      this.setData({
        dataIndex: e.detail.value
      })
    },

    /**
     * picker 设置value
     * @param {*} e 
     */
    ColumnChange(e) {
      var value = e.detail.value,
        column = e.detail.column;
      let data = {
        dataArray: this.data.dataArray,
        dataIndex: this.data.dataIndex
      };
      data.dataIndex[column] = value
      switch (column) {
        case 0:
          data.dataArray[1] = subArr[value]
          data.dataIndex[1] = 0;
          break;
      }
      this.setData(data);
    },

    sendCommunity(e) {
      const data = e.detail.value
      if (data.textarea == '') {
        wx.showModal({
          content: '请输入内容!',
          showCancel: false,
        })
        return false
      }
      if (data.textarea.length < 10) {
        wx.showModal({
          content: '您输入的文字小于10字,请补充!',
          showCancel: false,
        })
        return false
      }
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      utils.POST('sendCommunity', {
        'ClassifyId': communityClass[data.field[0]].sub[data.field[1]].Id,
        'Content': data.textarea,
        'UserId': allData.userID
      }, (res) => {
        res.status == 0 ? wx.showToast({
          title: '发布成功',
          icon: 'none'
        }) & setTimeout(() => {
          //获取页面栈，判断当前页面是否是聊天页面，如果是，则更新页面数据
          var page = getCurrentPages()
          if (page[page.length - 2].route == "pages/forum/forum") {
            page[page.length - 2].onLoad()
          }
          wx.navigateBack({
            delta: 1
          })
        }, 1500) : wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }, 'application/json')
    },

  },
})