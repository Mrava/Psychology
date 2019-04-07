var app = getApp()
var allData = app.globalData
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
Component({
  data: {
    width: wx.getSystemInfoSync().windowWidth,
    info_class: {
      style: '',
      index: '',
    },
    expert_list: [{
      photo: 'http://g.hiphotos.baidu.com/image/h%3D300/sign=4cf62521bdde9c82b965ff8f5c8080d2/d1160924ab18972b0aa9c1d2e8cd7b899e510a13.jpg',
      icon: "http://d.hiphotos.baidu.com/image/h%3D300/sign=86a7230b4e166d222777139476220945/5882b2b7d0a20cf4e2f15a1f7b094b36adaf9989.jpg",
      name: "水柔 心理咨询师",
      classify: '失恋',
      address: '这里是地址哦这里是地址哦这里是地址哦',
      info: "国家注册心理咨询师，音乐治疗师 ，中国科学院心理研究所医学心理与心理治疗专业两年制研修生。管理学学士，曾在大型央企中石油任职十年财务经理职位。职业受训经历：2004-2006年，中国科学院心理研究所“医学心理与心理咨询治疗”专业研修班学习；曾参与中国科学院心理研究所与美国芝加哥大学联合举办的“认知与行为疗法”培训、李子勋后现代咨询技术及EAP课程培训、国家认证音乐治疗师资格认证及高天音乐治疗培训；2013年至今，接受长程整合性精神分析治疗课程及案例督导培训。长期接受个人成长及分析治疗，心理学专业知识扎实、临床经验丰富，咨询技术及治疗方式多样，气质温和知性。擅长：婚恋情感、人际关系及情感障碍、儿童青少年心理咨询、女性职场咨询、音乐及正念减压团体治疗等。寄语：生命从来就不是完美的，但生命可以因成长而更加圆满完整。国家注册心理咨询师，音乐治疗师 ，中国科学院心理研究所医学心理与心理治疗专业两年制研修生。管理学学士，曾在大型央企中石油任职十年财务经理职位。职业受训经历：2004-2006年，中国科学院心理研究所“医学心理与心理咨询治疗”专业研修班学习；曾参与中国科学院心理研究所与美国芝加哥大学联合举办的“认知与行为疗法”培训、李子勋后现代咨询技术及EAP课程培训、国家认证音乐治疗师资格认证及高天音乐治疗培训；2013年至今，接受长程整合性精神分析治疗课程及案例督导培训。长期接受个人成长及分析治疗，心理学专业知识扎实、临床经验丰富，咨询技术及治疗方式多样，气质温和知性。擅长：婚恋情感、人际关系及情感障碍、儿童青少年心理咨询、女性职场咨询、音乐及正念减压团体治疗等。寄语：生命从来就不是完美的，但生命可以因成长而更加圆满完整。",
    }, {
      photo: 'http://b.hiphotos.baidu.com/image/h%3D300/sign=96a23963a3345982da8ae3923cf5310b/9358d109b3de9c82d02754986281800a19d84362.jpg',
      icon: "http://b.hiphotos.baidu.com/image/h%3D300/sign=28e3fe31c85c10383b7ec8c28210931c/2cf5e0fe9925bc319dd3ffb350df8db1cb13700b.jpg",
      name: "李四",
      classify: '婚外情',
      address: '这里是地址哦这里是地址哦这里是地址哦',
      info: "这里是详情",
    }, {
      photo: 'http://d.hiphotos.baidu.com/image/h%3D300/sign=0558db015d43fbf2da2ca023807eca1e/9825bc315c6034a89ddb4688c5134954092376fa.jpg',
      icon: "https://d.hiphotos.baidu.com/image/h%3D300/sign=d31aee36da2a28345ca6300b6bb5c92e/e61190ef76c6a7ef7d58560df3faaf51f3de669b.jpg",
      name: "王二",
      classify: '其他',
      address: '这里是地址哦这里是地址哦这里是地址哦',
      info: "这里是详情",
    }, ],
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
      app.setTitleWidth(this, true)
    },
    toInfo: function(i) {
      allData.expert_data = this.data.expert_list[i.currentTarget.dataset.index]
      wx.navigateTo({
        url: 'info/expert_info'
      })
    },
    call: function(i) {
      console.log(i)
    },
    seeInfo(e) {
      var index = e.currentTarget.dataset.id
      var style = this.data.info_class.style != '' &&
        this.data.info_class.index == index ?
        '' : "height: 100%;background-color:#FFF;" +
        "word-break:break-all;white-space:pre-wrap;" +
        "line-height:35rpx;text-indent:50rpx"
      this.setData({
        info_class: {
          style: style,
          index: index
        }
      })
    }
  }
})