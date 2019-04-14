const app = getApp(),utils = require('../../../utils/util.js')

/**
 * 计算scroll-view实际占界面的高度
 */
function setScrollViewHeight(that) {
  var ScreenHeight = wx.getSystemInfoSync().windowHeight, //获取屏幕高度
    query = wx.createSelectorQuery();//单位px；
  query.select('#top').boundingClientRect(function (rect) {
    console.log('----')
    that.setData({
      ScrollViewHeight: ScreenHeight - rect.height
    })
  }).exec();
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    imgList: [],
    multiIndex: [0, 0, 0],
    region: [],
    multiArray: [
        ['恋爱', '婚姻'],
        ['暗恋', '早恋', '初恋', '失恋', '单恋']
      ],
  },

  onLoad:function (e){
    setScrollViewHeight(this)
    var t = this
    utils.GET('getCommunity_class',(res)=>{
      console.log(res.data, res.data[0].name)
      // multiArray: [
      //   ['恋爱', '婚姻'],
      //   ['暗恋', '早恋', '初恋', '失恋', '单恋']
      // ],
      // var arr = t.data.multiArray[0]
      // for (let index = 0; index < res.data.length; index++) {
      //   arr.push(res.data[index].name)
      //   t.setData({
      //     multiArray: arr
      //   })
      // }
      t.setData({
        multiArray: res.data
      })
      var arr = t.data.multiArray[1]
      // for (let index = 0; index < res.data[0].sub.length; index++) {
      //   arr[1].push(res.data[0].sub[index])
      //   t.setData({
      //     multiArray: arr
      //   })
      // }
    })
  },

  ChooseImage() {
    wx.chooseImage({
      count: 2, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  MultiChange(e) {
    console.log("value", e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  MultiColumnChange(e) {
    console.log("value1", e.detail.value)
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },

})