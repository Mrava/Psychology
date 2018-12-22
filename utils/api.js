var root = "https://nxxlzx.tpengyun.com/";
function url(links){
    var link
    switch(links){
        case 'signup':{
            link = root + "users/signup?token=" + getApp().globalData.token
            break
        }
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