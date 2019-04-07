const app = getApp();
var id;
Component({
  data: {
    ModalShow: false,
    messageList: [{
      avatar: 'http://img3.imgtn.bdimg.com/it/u=3985330067,2681618210&fm=26&gp=0.jpg',
      name: '『暂缓』得过且过。 『微笑』邀',
      content: '这块镜子不知道出了什么问题，不管我怎么看，我都觉得我帅天上了，而且地上绝对没我这么帅的',
      time: '11:23',
    }, {
      avatar: 'http://img1.imgtn.bdimg.com/it/u=1218485516,264644399&fm=26&gp=0.jpg',
      name: 'Empty city °空城',
      content: '爱我的人太多了，你注定上不了排行榜，所以你不要马上爱上我，但是也不能不爱哦',
      time: '11:23',
    }, {
      avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=395604254,3524508916&fm=26&gp=0.jpg',
      name: '咆哮着唱call me baby',
      content: '我是不是太帅了，所以你看我就觉得眼熟，不要误会，或许因为我太帅而让你看得太久了',
      time: '11:23',
    }, {
      avatar: 'http://img0.imgtn.bdimg.com/it/u=4117698333,1699709581&fm=26&gp=0.jpg',
      name: '长发及腰借你上吊',
      content: '我一直在打喷嚏，是不是你一直在想我？',
      time: '11:23',
    }, {
      avatar: 'http://img2.imgtn.bdimg.com/it/u=3846895839,2711067435&fm=26&gp=0.jpg',
      name: '飘渺的姿态.',
      content: '向我这么完美的人，就算没有朋友也没关系，只要有你一个就够了，你说是不是。',
      time: '11:23',
    }, {
      avatar: 'http://img3.imgtn.bdimg.com/it/u=734358009,2546467416&fm=26&gp=0.jpg',
      name: '、悲剧',
      content: '你喜不喜欢听到别人赞美你？不管喜欢还是不喜欢，反正我就是喜欢，现在给你一个机会，来赞美我一个',
      time: '11:23',
    }, {
      avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2467153489,966901276&fm=26&gp=0.jpg',
      name: '扯蛋的爱情，咱要不起',
      content: '我发现你有一个别人没发现的优点。”“什么优点嘛？”“你夸夸我，我就告诉你”“你好帅哦',
      time: '11:23',
    }, {
      avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3251029328,2490819195&fm=26&gp=0.jpg',
      name: '飞舞般舞蹈、',
      content: '我身边的女人的眼神是不是有种你要被吃的感觉，没事她们都是在嫉妒你，你也不要有压力',
      time: '11:23',
    }, {
      avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1532923325,2301773794&fm=26&gp=0.jpg',
      name: '孤酒怪友',
      content: '如果我们两个走在一起，他们一定不会怀疑爱情的，毕竟你这么平凡普通的一个人和我这么一个优秀的人在一起，所以外貌在感情里是不重要的。',
      time: '11:23',
    },
    ]
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
    }
  },

  //处理事件
  methods: {
    onLoad: function (options) {
      app.setTitleWidth(this,'消息')
    },

    tabSelect(e) {
      console.log(e);
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },

    toChatUI(e) {
      //console.log('被单击')
      wx.navigateTo({
        url:'chatUI/index'
      })
    },

    showMenu(e){
      this.setData({
        ModalShow: true
      })
    },

    hideModal() {
      this.setData({
        ModalShow: false
      })
    },

    delete(e) {
      this.setData({
        ModalShow: false
      })
    },

    stick(e){
      this.setData({
        ModalShow: false
      })
    },

  }

})