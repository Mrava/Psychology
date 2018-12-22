var root = "https://nxxlzx.tpengyun.com/";
function url(links){
    var link, token = getApp().globalData.token
    switch(links){
        case 'signup':{
            link = root + "users/signup?token=" + token
            break
        }
        case 'session_key':
            link = root + "users/session_key?token=" + token
    }
    return link
}
module.exports = {
    loginInfo: root+"phone/getPhoneNumber.php",
    Anum: { //账号
        login: root + "users/login",
    },
    url: url,
    
}