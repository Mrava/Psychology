const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    selected: 0,
    color: "#47505b",
    selectedColor: "#0081ff",
    backgroundColor: "#FFF",
    borderStyle: "white",
    msgNum: app.globalData.msgNum, // 简化的定义方式
    list: [{
        iconPath: "/pages/images/tabBar/shouye.png",
        selectedIconPath: "/pages/images/tabBar/shouye_i.png",
        pagePath: "/pages/index/index",
        text: "首页"
      },
      {
        iconPath: "/pages/images/tabBar/zhuanjia.png",
        selectedIconPath: "/pages/images/tabBar/zhuanjia_i.png",
        pagePath: "/pages/expert/index",
        text: "专家"
      },
      {
        iconPath: "/pages/images/tabBar/wenda.png",
        selectedIconPath: "/pages/images/tabBar/wenda_i.png",
        pagePath: "/pages/forum/forum",
        text: "问答"
      },
      {
        iconPath: "/pages/images/tabBar/message.png",
        selectedIconPath: "/pages/images/tabBar/message_i.png",
        pagePath: "/pages/chat/chat",
        text: "消息"
      },
      {
        iconPath: "/pages/images/tabBar/wode.png",
        selectedIconPath: "/pages/images/tabBar/wode_i.png",
        pagePath: "/pages/user/user",
        text: "我的"
      }
    ],
  },
  methods: {
    switchTab(e) {
      //console.log(e);
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index,
        msgNum: app.globalData.msgNum,
      })
      console.log("---------", this.data.msgNum)
      //setTimeout(this._animation(e), 500)
    },
    _animation(e) {
      var anmiaton = e.currentTarget.dataset.class;
      var that = this;
      that.setData({
        animation: anmiaton
      })
      setTimeout(function () {
        that.setData({
          animation: ''
        })
      }, 1000)
    },
  }
})