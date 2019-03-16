var app = getApp()
var allData = app.globalData
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    width: wx.getSystemInfoSync().windowWidth,
    expert_list: [{
      icon: "http://d.hiphotos.baidu.com/image/h%3D300/sign=86a7230b4e166d222777139476220945/5882b2b7d0a20cf4e2f15a1f7b094b36adaf9989.jpg",
      name: "张三",
      star: 5,
      info: "这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址",
      tags: [{
        'name': 'TAG1',
        'color': 'red' //嫣红
      }, {
        'name': 'TAG1',
        'color': 'orange' //桔橙
      }, {
        'name': 'TAG1',
        'color': 'yellow' //明黄
      }, {
        'name': 'TAG1',
        'color': 'olive' //橄榄
      }, {
        'name': 'TAG1',
        'color': 'green' //森绿
      }, {
        'name': 'TAG1',
        'color': 'cyan' //天青
      }, {
        'name': 'TAG1',
        'color': 'blue' //海蓝
      }, ],
    }, {
      icon: "http://e.hiphotos.baidu.com/image/h%3D300/sign=1a74a98dd7b44aed464eb8e4831d876a/bf096b63f6246b60905f18b3e6f81a4c500fa2a0.jpg",
      name: "张三",
      star: 5,
      info: "这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址",
      tags: [{
        'name': 'TAG1',
        'color': 'red' //嫣红
      }, {
        'name': 'TAG1',
        'color': 'orange' //桔橙
      }, {
        'name': 'TAG1',
        'color': 'yellow' //明黄
      }, {
        'name': 'TAG1',
        'color': 'olive' //橄榄
      }, {
        'name': 'TAG1',
        'color': 'green' //森绿
      }, {
        'name': 'TAG1',
        'color': 'cyan' //天青
      }, {
        'name': 'TAG1',
        'color': 'blue' //海蓝
      }, ],
    }, {
      icon: "http://e.hiphotos.baidu.com/image/h%3D300/sign=fd2cd8c8516034a836e2be81fb1249d9/7c1ed21b0ef41bd5c967b93d5cda81cb38db3dc6.jpg",
      name: "张三",
      star: 5,
      info: "这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址",
      tags: [{
        'name': 'TAG1',
        'color': 'red' //嫣红
      }, {
        'name': 'TAG1',
        'color': 'orange' //桔橙
      }, {
        'name': 'TAG1',
        'color': 'yellow' //明黄
      }, {
        'name': 'TAG1',
        'color': 'olive' //橄榄
      }, {
        'name': 'TAG1',
        'color': 'green' //森绿
      }, {
        'name': 'TAG1',
        'color': 'cyan' //天青
      }, {
        'name': 'TAG1',
        'color': 'blue' //海蓝
      }, ],
    }, {
      icon: "http://b.hiphotos.baidu.com/image/h%3D300/sign=4b46aa0513178a82d13c79a0c602737f/6c224f4a20a44623c097f5ab9522720e0df3d79e.jpg",
      name: "张三",
      star: 5,
      info: "这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址",
      tags: [{
        'name': 'TAG1',
        'color': 'red' //嫣红
      }, {
        'name': 'TAG1',
        'color': 'orange' //桔橙
      }, {
        'name': 'TAG1',
        'color': 'yellow' //明黄
      }, {
        'name': 'TAG1',
        'color': 'olive' //橄榄
      }, {
        'name': 'TAG1',
        'color': 'green' //森绿
      }, {
        'name': 'TAG1',
        'color': 'cyan' //天青
      }, {
        'name': 'TAG1',
        'color': 'blue' //海蓝
      }, ],
    }, {
      icon: "http://c.hiphotos.baidu.com/image/h%3D300/sign=47541133dcc8a786a12a4c0e5708c9c7/5bafa40f4bfbfbedc92f87b675f0f736aec31f80.jpg",
      name: "张三",
      star: 5,
      info: "这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址",
      tags: [{
        'name': 'TAG1',
        'color': 'red' //嫣红
      }, {
        'name': 'TAG1',
        'color': 'orange' //桔橙
      }, {
        'name': 'TAG1',
        'color': 'yellow' //明黄
      }, {
        'name': 'TAG1',
        'color': 'olive' //橄榄
      }, {
        'name': 'TAG1',
        'color': 'green' //森绿
      }, {
        'name': 'TAG1',
        'color': 'cyan' //天青
      }, {
        'name': 'TAG1',
        'color': 'blue' //海蓝
      }, ],
    }, {
      icon: "http://c.hiphotos.baidu.com/image/h%3D300/sign=4e7e3a7a8d0a19d8d403820503f882c9/34fae6cd7b899e518d7259df4fa7d933c9950d78.jpg",
      name: "张三",
      star: 5,
      info: "这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址这里是详情地址",
      tags: [{
        'name': 'TAG1',
        'color': 'red' //嫣红
      }, {
        'name': 'TAG1',
        'color': 'orange' //桔橙
      }, {
        'name': 'TAG1',
        'color': 'yellow' //明黄
      }, {
        'name': 'TAG1',
        'color': 'olive' //橄榄
      }, {
        'name': 'TAG1',
        'color': 'green' //森绿
      }, {
        'name': 'TAG1',
        'color': 'cyan' //天青
      }, {
        'name': 'TAG1',
        'color': 'blue' //海蓝
      }, ],
    }],
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
    onLoad: function(options) {

    },
    toInfo:function(i){
      allData.expert_data = this.data.expert_list[i.currentTarget.dataset.index]
      wx.navigateTo({
        url: 'info/expert_info'
      })
    },
    call:function(i){
      console.log(i)
    }
  }
})