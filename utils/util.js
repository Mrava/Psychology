var api = require('api')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function login(userinfo){
    wx.login({
        success: function(res) {
            console.log(res)
            var data={
                user_code:res.code,
                user_name: userinfo
            }
            wx.request({
                url: api.Anum.signup,
                data: data,
                method: 'POST',
                success: function (res) {
                    console.log(111)
                },
            })
        },
    })
    
}

module.exports = {
    formatTime: formatTime,
    login: login
}
