var app = getApp()
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    width: wx.getSystemInfoSync().windowWidth,
    imgUrls: [
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=346074524,1781961308&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3579190364,240842503&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1846852956,672325546&fm=26&gp=0.jpg'
    ],
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题.
    swiperHeight: 350,
    nav: [{
      img: "../images/1.png",
      title: "文章资讯"
    }, {
      img: "../images/2.png",
      title: "趣味测评"
    }, {
      img: "../images/3.png",
      title: "成为专家"
    }, {
      img: "../images/4.png",
      title: "关于我们"
    },],
    info_list: [{
      icon: "https://img.psy525.cn/upload/2019/03/15/3b13bd0087a1425aab7fa27ae287a8c7.jpg",
      title: "懂事的孩子：只忙着懂事了，却忘了自己",
      content: "小时候家里条件不好,除了基本的吃穿用的,我从来都不奢望更多的东西,父母夸我,说我一心学习,其他不讲究, 是个好孩子。我在一旁没有说话,冷冷的听着这些,我觉得自己就应该这么做,这样才是对的。但其实心里, 并没有真正开心。和妈妈去逛街, 看上喜欢的小玩意儿, 转头和妈妈说, 我想要。可是妈妈会有很多的理由拒绝, “衣服买多了会过时, 不要浪费钱”, “街边的小吃不干净, 吃了拉肚子”, “这家的玩具真贵, 改天我带你去买个更好的”...久而久之, 我忘了自己喜欢的是什么。从小到大在学校念书, 凡是老师布置的作业, 我全都一样不落的完成, 认为完成作业是天经地义的事情, 从来不敢懈怠。除此之外, 我喜欢钢琴, 家里负担不起; 我喜欢写文章, 却被要求写成应试作文; 我喜欢画画, 却从来没有提过想进一步去学...因为, 这都是与学习无关的事情。我似乎不应该去要求更多。所以直到大学毕业, 我仍然不知道, 自己是谁, 要做什么。",
      time: "2019年3月18日 15:34:00"
    }, {
        icon: "https://img.psy525.cn/upload/2019/03/15/8ea8a552132c4d079a5729bf2992fdaf.jpg",
      title: "《都挺好》：比贫穷更可怕的，是心穷！",
      content: "最近《都挺好》这部剧火了,老父亲苏大强因“作”而出名,我却从他身上看到了“心穷”二字。为了4万块存折,他像防贼一样防着儿女;疯狂买彩票,投资回报率高得吓人的理财产品,坐等不劳而获;当知道自己的钱全部被人骗走时,他又闹着要跳楼。",
      time: "2019年3月18日 15:34:58"
    }, {
      icon: "https://img.psy525.cn/upload/2019/03/15/1724fba993044bebb476ed37c8b0b726.jpg",
      title: "成年后，我得了一种“取悦别人”的病",
      content: "不论在日常生活中,还是在商业买卖中,很多时候我们遇到自己想要拒绝的事情,总是觉得直接说出口会让人难堪,让自己抹不开面子,于是总会找出很多借口。",
      time: "2019年3月18日 15:36:05"
    }, {
        icon: "https://img.psy525.cn/upload/2018/09/28/ff047643d062440ab2c29721db4e1645.jpg",
      title: "所谓的高情商，就是懂得换位思考。",
      content: "一头猪、一只绵羊和一头奶牛,被牧人关在同一个畜栏里。有一天,牧人将猪从畜栏里捉了出去,只听猪大声号叫,强烈地反抗。",
      time: "2019年3月18日 15:37:30"
    },],
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

    },

    onShow: function () {
      if (!app.globalData.userID) {
        utils.login()
      }

    },
  }
})