const app = getApp();
const ui = require('../../../utils/Interface.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  onLoad:function(){
    //console.log(ui.getTopHeight())
    console.log(ui.getContainerHeight('contentCard'))
  },
})