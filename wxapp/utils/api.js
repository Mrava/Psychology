var root = "https://nxxlzx.tpengyun.com/v1/";
var wss = "wss://nxxlzxim.tpengyun.com/echo";
function url(links) {
  var link, token = getApp().globalData.token,
    user = wx.getStorageSync("userInfo"),
    userID = !getApp().globalData.userID ? wx.getStorageSync("user_id") : getApp().globalData.userID
  switch (links) {
    case 'signup':
      {
        link = root + "users/signup"
        break
      }
    case 'upload':
      link = root+'/upload/upload?token=' + token
      break
    case 'session_key':
      link = root + "users/session_key?token=" + token
      break
    case 'userInfo':
      link = root + 'users/' + userID + '?token=' + token
      break
    case 'updateUserInfo':
      link = root + '/users/' + userID + '?token=' + token
      break
  }
  return link
}
module.exports = {
  loginInfo: root + "phone/getPhoneNumber.php",
  rootUrl: root,
  wss: wss,
  Anum: { //账号
    login: root + "users/login",
  },
  url: url,
}