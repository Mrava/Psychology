
//程序集变量
var code = getApp().globalData.code;//用户code
Page({

    data: {
        imgUrls: [
'http://g.hiphotos.baidu.com/image/h%3D300/sign=db097dbddcc8a786a12a4c0e5709c9c7/5bafa40f4bfbfbed5572eb3875f0f736afc31f4a.jpg','http://a.hiphotos.baidu.com/image/h%3D300/sign=de08a1f093510fb367197197e932c893/b999a9014c086e062550d0020f087bf40bd1cbfb.jpg','http://c.hiphotos.baidu.com/image/h%3D300/sign=d4c9df02d7b44aed464eb8e4831d876a/bf096b63f6246b605ee26e3ce6f81a4c500fa28e.jpg'
        ],
        swiperIndex: 0, //这里不写第一次启动展示的时候会有问题.
        swiperHeight:350,
    },

    bindchange(e) {
        this.setData({
            swiperIndex: e.detail.current
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log()
    },

    ss(e){
        console.log(e)
    },

    go(){
        console.log(code)
    }
    

})