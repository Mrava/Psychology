var api = require('utils/api.js')
App({
    onLaunch(res){
        var t = this
        wx.login({
            success: function (res) {
                var code = res.code
                var data = {
                    code : res.code,
                    user_name:"马勇龙",
                    portrait:"www"
                }
                wx.request({
                    url: api.Anum.signup,
                    data: data,
                    header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                        },
                    method: 'POST',
                    success: function(res) {
                        console.log(res)
                    },
                })
            },
        })
    },
    getApi(){
        return api;
    },
    globalData: {
        code: 'code'
    }
})