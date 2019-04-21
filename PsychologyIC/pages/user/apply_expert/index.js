import WxValidate from '../../../utils/WxValidate.js'
const app = getApp(), utils = require('../../../utils/util.js'), allData = getApp().globalData
var subArr = [], communityClass, Validate

/**
 * 计算scroll-view实际占界面的高度
 */
function setScrollViewHeight(that) {
  var ScreenHeight = wx.getSystemInfoSync().windowHeight, //获取屏幕高度
    query = wx.createSelectorQuery();//单位px；
  query.select('#top').boundingClientRect(function (rect) {
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
    StatusBar: allData.StatusBar,
    CustomBar: allData.CustomBar,
    imgList: [],
    dataIndex: [0, 0],
    region: [],
    dataArray: [],
  },

  onLoad: function (e) {
    setScrollViewHeight(this)
    initValidate()
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
   * 选择图片
   * @param {*} e 
   */
  ChooseImage(e) {
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

  /**
   * 查看图片
   * @param {*} e 
   */
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  /**
   * 删除图片
   * @param {*} e 
   */
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
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
  /**
   * 所属领域 picker value 改变时触发 change 事件
   * @param {*} e 
   */
  Change(e) {
    this.setData({
      dataIndex: e.detail.value
    })
    console.log(communityClass)
  },
  /**
   * picker 设置value
   * @param {*} e 
   */
  ColumnChange(e) {
    var value = e.detail.value,
      column = e.detail.column, index;
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

  /**
   * 地址选择
   * @param {*} e 
   */
  RegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 提交信息
   */
  formSubmit(e) {
    const data = e.detail.value,t = this.data
    //校验表单
    if (!Validate.checkForm(data)) {
      wx.showModal({
        content: Validate.errorList[0].msg,
        showCancel: false,
      })
      return false
    }
    utils.POST('applyExpert',{
      Address: t.region.length > 0 ? (t.region[0] + t.region[1] + t.region[3]):'',
      ClassifyId: communityClass[t.dataIndex[0]].sub[t.dataIndex[1]].Id,
      Icon: allData.iconUrl,
      Info:'',
      Name: data.name,
      PhoneNum:data.phoneNum,
      Photo:''
    },(res)=>{
      console.log(res)
    })
  },


})

//验证函数
function initValidate() {
  const rules = {
    name: {
      required: true,
      minlength: 2,
    },
    idCard: {
      required: true,
      idcard: true
    },
    workAge: {
      required: true,
    },
    phoneNum: {
      required: true,
      tel: true
    }
  }
  const messages = {
    name: {
      required: '请填写姓名',
      minlength: '请输入正确的姓名'
    },
    idCard: {
      required: '请输入身份证号码',
      idcard: '请输入正确的身份证号码',
    },
    workAge: {
      required: '请输入从业年龄',
      idcard: '请输入从业年龄',
    },
    phoneNum: {
      required: '请输入手机号',
      tel: '请输入正确的手机号'
    }
  }
  Validate = new WxValidate(rules, messages)
}