var app = getApp()
var allData = app.globalData
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    width: wx.getSystemInfoSync().windowWidth,
    expert_list: [
      {
        photo: 'http://img.psy525.cn/upload/AvatarMax/2016/05/12/1081096/328906/16881650005066.jpg!350',
        icon: "http://d.hiphotos.baidu.com/image/h%3D300/sign=86a7230b4e166d222777139476220945/5882b2b7d0a20cf4e2f15a1f7b094b36adaf9989.jpg",
        name: "水柔 心理咨询师",
        classify: '失恋',
        address: '这里是地址哦这里是地址哦这里是地址哦',
        info: "国家注册心理咨询师，音乐治疗师 ，中国科学院心理研究所医学心理与心理治疗专业两年制研修生。管理学学士，曾在大型央企中石油任职十年财务经理职位。职业受训经历：2004-2006年，中国科学院心理研究所“医学心理与心理咨询治疗”专业研修班学习；曾参与中国科学院心理研究所与美国芝加哥大学联合举办的“认知与行为疗法”培训、李子勋后现代咨询技术及EAP课程培训、国家认证音乐治疗师资格认证及高天音乐治疗培训；2013年至今，接受长程整合性精神分析治疗课程及案例督导培训。长期接受个人成长及分析治疗，心理学专业知识扎实、临床经验丰富，咨询技术及治疗方式多样，气质温和知性。擅长：婚恋情感、人际关系及情感障碍、儿童青少年心理咨询、女性职场咨询、音乐及正念减压团体治疗等。寄语：生命从来就不是完美的，但生命可以因成长而更加圆满完整。",
      }, {
        photo: 'http://img.psy525.cn/upload/2017/08/19/5215e84e8bf54f51b2cc41e9d8c5a33a.JPG!600',
        icon: "http://b.hiphotos.baidu.com/image/h%3D300/sign=28e3fe31c85c10383b7ec8c28210931c/2cf5e0fe9925bc319dd3ffb350df8db1cb13700b.jpg",
        name: "李四",
        classify: '婚外情',
        address: '这里是地址哦这里是地址哦这里是地址哦',
        info: "这里是详情",
      }, {
        photo: 'http://img.psy525.cn/upload/album/2016/01/07/780264/-20182711251053_w.jpg',
        icon: "http://d.hiphotos.baidu.com/image/h%3D300/sign=d31aee36da2a28345ca6300b6bb5c92e/e61190ef76c6a7ef7d58560df3faaf51f3de669b.jpg",
        name: "王二",
        classify: '其他',
        address: '这里是地址哦这里是地址哦这里是地址哦',
        info: "这里是详情",
      },
    ],
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

    },
    toInfo: function (i) {
      allData.expert_data = this.data.expert_list[i.currentTarget.dataset.index]
      wx.navigateTo({
        url: 'info/expert_info'
      })
    },
    call: function (i) {
      console.log(i)
    }
  }
})