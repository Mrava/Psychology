var app = getApp()
var allData = app.globalData
var utils = require('../../../utils/util.js')
Page({

      /**
       * 页面的初始数据
       */
      data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        width: wx.getSystemInfoSync().windowWidth,
        Title: '宁夏心理咨询'
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        allData.expert_data = {
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
              },]
            };
            this.setData({
              expert_data: allData.expert_data
            })
          },

          /**
           * 生命周期函数--监听页面初次渲染完成
           */
          onReady: function() {

          },

          /**
           * 生命周期函数--监听页面显示
           */
          onShow: function() {

          },

          /**
           * 生命周期函数--监听页面隐藏
           */
          onHide: function() {

          },

          /**
           * 生命周期函数--监听页面卸载
           */
          onUnload: function() {

          },

          /**
           * 页面相关事件处理函数--监听用户下拉动作
           */
          onPullDownRefresh: function() {

          },

          /**
           * 页面上拉触底事件的处理函数
           */
          onReachBottom: function() {

          },

          /**
           * 用户点击右上角分享
           */
          onShareAppMessage: function() {

          }
      })