var root = "https://nxxlzx.tpengyun.com/v1/";

function url(links) {
  var link, token = getApp().globalData.token,
    user_id = getApp().globalData.userID,
    user = wx.getStorageSync("userInfo")
  switch (links) {
    case 'signup':
      {
        link = root + "users/signup?token=" + token
        break
      }
    case 'session_key':
      link = root + "users/session_key?token=" + token
      break
    case 'userInfo':
      link = root + 'users/' + (!user_id ? wx.getStorageSync("user_id") : user_id)
      break
    case 'upload_user_icon':
      link = root + 'users/' + (!user_id ? wx.getStorageSync("user_id") : user_id) + '?token=' + token
      break
  }
  return link
}
module.exports = {
  loginInfo: root + "phone/getPhoneNumber.php",
  rootUrl: root,
  Anum: { //账号
    login: root + "users/login",
  },
  url: url,
}