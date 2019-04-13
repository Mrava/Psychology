var root = "https://nxxlzx.tpengyun.com/v1/", wss = "wss://nxxlzxim.tpengyun.com/echo";
function url(links) {
  var link, token = '?token='+ getApp().globalData.token,
    user = wx.getStorageSync("userInfo"),
    id = !getApp().globalData.userID ? wx.getStorageSync("user_id") : getApp().globalData.userID
  switch (links) {
    case 'upload':
      link = root + '/upload/upload' 
      break
    case 'session_key':
      link = root + "users/session_key"
      break
    case 'userInfo':
      link = root + 'users/' + id
      break
    case 'updateUserInfo':
      link = root + 'users/' + id
      break

    /* 资讯 */
    case 'getInformationClass'://获取文章分类列表
      link = root + 'info_class/'
      break
    case 'getInformation'://获取资讯列表
      link = root + 'info/'
      break
    case 'getInformationInfo'://获取资讯详情
      link = root + 'info/' + getApp().globalData.idInformationInfoId
      break

    /* Banner */
    case 'getBanner'://获取所有的banner条
      link = root + 'banner/'
      break

    /* nav */
    case 'getNav'://获取所有的banner条
      link = root + 'menu/'
      break

    /* 专家 */
    case 'getExpert'://获取所有的专家
      link = root + 'expert/'
      break
    case 'getExpertClass'://获取所有的专家分类
      link = root + 'expert_class/'
      break

    /* 问答 */
    case 'getCommunity_class':
      link = root + 'community_class/'
      break
    case 'getCommunity':
      link = root + 'community/'
      break
    // case 'getCommunityInfo':
    // case 'updateCommunityInfo':
    // case 'deleteCommunityInfo':

  }
  return link + token
}
module.exports = {
  loginInfo: root + "phone/getPhoneNumber.php",
  rootUrl: root,
  loadingImgUrl:'https://nxxlzx.tpengyun.com/static/src/images/loading/',
  wss: wss,
  Anum: { //账号
    login: root + "users/login",
    signup: root + "users/signup"
  },
  url: url,
}