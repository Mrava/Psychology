const app = getApp(), jim = require('../../utils/Jim.js'),
allData = app.globalData,api = require('../../utils/api.js'),utils = require('../../utils/util.js')
/**
 * 计算顶部高度
 */
function getNavHeight(that) {
    var query = wx.createSelectorQuery();//单位px；
    query.select('#nav').boundingClientRect(function (rect) {
        that.setData({
            NavHeight: rect.height + app.globalData.CustomBar
        })
    }).exec();
}
Component({
    data: {
        TabCur: 0,
        scrollLeft: 0,
        news: {
            classNames: 'wux-animate--fadeInLeft',
            enter: true,
            exit: false,
            in: true,
        },
        special: {
            classNames: 'wux-animate--fadeInRight',
            enter: true,
            exit: false,
            in: false,
        },
    },
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 2,
                    msgNum: allData.msgNum
                })
                jim.setThat(this)
            }
        }
    },
    methods: {
        onLoad: function (options) {
            getNavHeight(this)
            app.setTitleWidth(this, true)
            !allData.CommunityClass ? Initialization(this) : null
        },
        tabSelect(e) {
            var id = e.currentTarget.dataset.id,
                news = 'news.in',
                special = 'special.in',
                show = id == '0' ? true : false,
                noshow = id == '1' ? true : false
            this.setData({
                TabCur: id,
                scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
                [news]: show,
                [special]: noshow
            })
        },
        toSpecial(e) {
            var title = e.currentTarget.dataset.title,
                id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: "special?title=" + title + "&id=" + id,
            })
        },
        call(e) {
            console.log(e)
        }
    }
})

function Initialization(that) {
    wx.showLoading({
        title: '加载中',
        mask: true,
    })
    utils.GET('getCommunity_class', (res) => {
        res.status == 0 ? that.setData({
            sp_list: res.data
        }) : that.setData({ sp_list: 'ErrorNetwork' }) &
            wx.showToast({
                title: '错误:' + res.msg,
                icon: 'none',
                mask: true,
            })
        utils.GET('getCommunity', (e) => {
            e.status == 0 ? that.setData({
                new_list: e.data
            }) : that.setData({ new_list: 'ErrorNetwork' }) &
                wx.showToast({
                    title: '错误:' + e.msg,
                    icon: 'none',
                    mask: true,
                })
        }, { sortby: 'time', order: 'desc' })
    })
}