const md5 = require('utils/md5.min.js'),
    JgAppkey = '2e4504420cbf98563ef546a1',
    JgSecret = '02c0c4e49cd0ecbf4753876a', 
    RandomStr = 'E422A978DE37196588531CD0C42010B5',
    TimeStamp = (new Date()).getTime(),
    RootUrl='https://nxxlzx.tpengyun.com/';
function signature() {
    return md5("appkey=" + JgAppkey
        + "&timestamp=" + TimeStamp
        + "&random_str=" + RandomStr + "&key=" + JgSecret)
}

module.exports = {
    JgAppkey,
    JgSecret,
    RandomStr,
    TimeStamp,
    signature,
    RootUrl
}