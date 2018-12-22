var app = getApp()
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
Page({

	data: {
		StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
		width:wx.getSystemInfoSync().windowWidth,
		imgUrls: [
			'http://g.hiphotos.baidu.com/image/h%3D300/sign=db097dbddcc8a786a12a4c0e5709c9c7/5bafa40f4bfbfbed5572eb3875f0f736afc31f4a.jpg',
			'http://a.hiphotos.baidu.com/image/h%3D300/sign=de08a1f093510fb367197197e932c893/b999a9014c086e062550d0020f087bf40bd1cbfb.jpg',
			'http://c.hiphotos.baidu.com/image/h%3D300/sign=d4c9df02d7b44aed464eb8e4831d876a/bf096b63f6246b605ee26e3ce6f81a4c500fa28e.jpg'
		],
		swiperIndex: 0, //这里不写第一次启动展示的时候会有问题.
		swiperHeight: 350,
		nav: [{
			img: "../images/wx.png",
			title: "测试"
		}, {
			img: "../images/wx.png",
			title: "测试"
		}, {
			img: "../images/wx.png",
			title: "测试"
		}, {
			img: "../images/wx.png",
			title: "测试"
		}, ],
		info_list: [{
			icon:"../images/wx.png",
			title:"标题",
			content:"这里是内容",
			time:"2018年12月19日18:38:20"
		}, {
			icon:"../images/wx.png",
			title:"标题",
			content:"这里是内容",
			time:"2018年12月19日18:38:20"
		}, {
			icon:"../images/wx.png",
			title:"标题",
			content:"这里是内容",
			time:"2018年12月19日18:38:20"
		}, {
			icon:"../images/wx.png",
			title:"标题",
			content:"这里是内容",
			time:"2018年12月19日18:38:20"
		}, ],
		people_list:[{
			pic:"http://e.hiphotos.baidu.com/image/h%3D300/sign=b7b87a749f45d688bc02b4a494c37dab/4b90f603738da9774d57356cbd51f8198618e379.jpg",
			name:"LoveEmpathy",
			star:"★★★★☆",
			tags:"",
			present:"这里是简介！！！！！",
			address:"宁夏银川兴庆区解放西街建发现代城"
		},{
			pic:"http://e.hiphotos.baidu.com/image/h%3D300/sign=b7b87a749f45d688bc02b4a494c37dab/4b90f603738da9774d57356cbd51f8198618e379.jpg",
			name:"LoveEmpathy",
			star:"★★★★☆",
			tags:"",
			present:"这里是简介！！！！！",
			address:"宁夏银川兴庆区解放西街建发现代城"
		},{
			pic:"http://e.hiphotos.baidu.com/image/h%3D300/sign=b7b87a749f45d688bc02b4a494c37dab/4b90f603738da9774d57356cbd51f8198618e379.jpg",
			name:"LoveEmpathy",
			star:"★★★★☆",
			tags:"",
			present:"这里是简介！！！！！",
			address:"宁夏银川兴庆区解放西街建发现代城"
		},{
			pic:"http://e.hiphotos.baidu.com/image/h%3D300/sign=b7b87a749f45d688bc02b4a494c37dab/4b90f603738da9774d57356cbd51f8198618e379.jpg",
			name:"LoveEmpathy",
			star:"★★★★☆",
			tags:"",
			present:"这里是简介！！！！！",
			address:"宁夏银川兴庆区解放西街建发现代城"
		},],
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
        utils.login()
	},

    onShow: function () {
    },

	ss(e) {
		console.log(e)
	},

	go() {
		console.log(code)
	}


})
