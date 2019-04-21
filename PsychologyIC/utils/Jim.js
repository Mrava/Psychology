const JMessage = require('jmessage-wxapplet-sdk-1.4.0.min.js'),
    setinfo = require('../setinfo.js'), jim = new JMessage(), api = require('api.js'), allData = getApp().globalData
let isJim = false, that

//初始化
function init() {
    jim.init({
        appkey: setinfo.JgAppkey,
        random_str: setinfo.RandomStr,
        signature: setinfo.signature(),
        timestamp: setinfo.TimeStamp,
        flag: 1
    }).onSuccess(function (data) {
        allData.isJim = true
        switch (data.code) {
            case 0:
                login()
                break;
            default: wx.showToast({
                title: showErrorCode(data.code),
                icon: 'none',
                mask: true
            })
                break;
        }
        console.log('im连接成功', data)
    }).onFail(function (data) {
        allData.isJim = false
        console.log('im连接未成功', data)
    })
}

function timestampToTime(cjsj) {
    var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : +date.getSeconds())
    return h + m + s
}

//获取会话列表
function getConversation(that) {
    jim.getConversation().onSuccess(function (e) {
        console.log("获取会话列表", e)
        var data = e.conversations, Off_lineMsg = allData.Off_lineMsg, a = 0
        allData.messageList = []
        for (let i = data.length - 1; i >= 0; i--) {
            var url = api.rootUrl + 'users/' + data[i].username.substring(1, data[i].username.length) + '?token=' + allData.token
            GetIcon(url).then((res) => {
                allData.messageList[a] = {
                    name: data[i].username,
                    nickName: data[i].nickName,
                    avatar: res.data.data.portrait,
                    msgs: Off_lineMsg[data[i].username].msgs,
                    unread_msg_count: Off_lineMsg[data[i].username].unread_msg_count
                }
                a++
                if (that) { that.setData({ messageList: allData.messageList }) }
            })
        }
    }).onFail(function (data) {
        console.log("获取会话列表", data)
        // wx.hideLoading()
    });
}

//同步获取头像
function GetIcon(url) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            header: { "content-type": 'application/x-www-form-urlencoded' },
            success: (res) => { resolve(res)},
            fail: () => {reject('null')}
        })
    })
}

//聊天消息实时监听
function onMsgReceive() {
    jim.onMsgReceive(function (data) {
        console.log("聊天消息实时监听", data)
        wx.playBackgroundAudio({
          dataUrl: setinfo.RootUrl +'static/src/NewMessage.wav'
        })
        wx.vibrateLong()
        if (that.getTabBar().data.selected != 3) {
            allData.msgNum++
        }
        that.getTabBar().setData({
            msgNum: allData.msgNum
        })
        var mdata = data.messages, msgs = [], unread_msg_count = 0
        mdata[0].content.create_time = timestampToTime(mdata[0].content.create_time)//时间戳格式化
        // console.log(allData.Off_lineMsg)
        //判读所来消息是否有历史记录，如果没有，则初始化Off_lineMsg
        if (!allData.Off_lineMsg) {
            allData.Off_lineMsg = []
        }
        if (!allData.Off_lineMsg[mdata[0].from_username]) {
            msgs[0] = mdata[0]
            allData.Off_lineMsg[mdata[0].from_username] = { msgs, unread_msg_count }
            //刷新会话列表
            getConversation()
        } else {
            var length = allData.Off_lineMsg[mdata[0].from_username].msgs.length
            //将新来的消息加入列表
            allData.Off_lineMsg[mdata[0].from_username].msgs[length] = mdata[0]
            allData.Off_lineMsg[mdata[0].from_username].unread_msg_count = unread_msg_count
        }
        //判断消息页面的this时候被指定，如果被指定则执行刷新
        if (allData.gthat) {
            allData.gthat.refreshData()
        }
        // console.log(allData.Off_lineMsg)
        //获取页面栈，判断当前页面是否是聊天页面，如果是，则更新页面数据
        var page = getCurrentPages()
        if (page[page.length - 1].route == "pages/chat/chatUI/index") {
            page[page.length - 1].onLoad()
        }
    });
}

//离线消息同步监听
function onSyncConversation() {
    jim.onSyncConversation(function (data) {
        console.log("离线消息同步监听", data)
        var mdata = []
        for (let i = 0; i < data.length; i++) {
            for (let a = 0; a < data[i].msgs.length; a++) {
                data[i].msgs[a].content.create_time = timestampToTime(data[i].msgs[a].content.create_time)
                mdata[data[i].from_username] = {
                    unread_msg_count: data[i].unread_msg_count,//未读消息条数
                    msgs: data[i].msgs,//历史消息条数
                }
            }

        }
        //将获取到的离线消息保存起来
        allData.Off_lineMsg = mdata
        getConversation()
    });
}

//登录
function login() {
    jim.login({
        username: 'u' + allData.userID,
        password: '123456'
    }).onSuccess(function (data) {
        switch (data.code) {
            case 0:
                console.log('im登录成功', data)
                allData.isJim = true
                onMsgReceive()
                onSyncConversation()
                break;
            default: wx.showToast({
                title: showErrorCode(data.code),
                icon: 'none',
                mask: true
            })
                break;
        }
    }).onFail(function (data) {
        allData.isJim = false
        wx.showToast({
            title: showErrorCode(data.code),
            icon: 'none',
            mask: true
        })
    });
}

//发送文本信息
function sendSingleMsg(res) {
    // 发送消息
    jim.sendSingleMsg(res).onSuccess(function (data, msg) {
        // console.log(data, msg)
        var msgs = [], unread_msg_count = 0
        msg.content.create_time = timestampToTime(msg.content.create_time)//时间戳格式化
        //判读所来消息是否有历史记录，如果没有，则初始化Off_lineMsg
        if (!allData.Off_lineMsg) {
            allData.Off_lineMsg = []
        }
        if (!allData.Off_lineMsg[res.target_username]) {
            msgs[0] = msg
            allData.Off_lineMsg[res.target_username] = { msgs, unread_msg_count }
        }
        if (!allData.messageList) {
            getConversation()
        }
        //判断消息页面的this时候被指定，如果被指定则执行刷新
        if (allData.gthat) {
            allData.gthat.refreshData()
        }
    }).onFail(function (data) {
        wx.showToast({
            title: showErrorCode(data.code),
            icon: 'none',
            mask: true
        })
    });
}


function setThat(e) {
    that = e
}


//var getIsJim=() =>isJim,getJim = () => jim

module.exports = {
    init,
    getIsJim: isJim,
    getJim: jim,
    sendSingleMsg,
    setThat,
    getConversation,
}

/**
 * ErrorCode 定义
 * @param {Int} code 错误代码
 */
function showErrorCode(code) {
    switch (code) {
        case 0:
            return '请求成功'
            break;
        case 880001:
            return '未知错误码'
            break;
        case 880002:
            return '参数不合法'
            break;
        case 880003:
            return '非法内容格式'
            break;
        case 880004:
            return '非法内容格式'
            break;
        case 880005:
            return '文件不存在'
            break;
        case 880006:
            return '注册之前先退出'
            break;
        case 880007:
            return '被限制注册'
            break;
        case 880008:
            return 'msg_id 非法'
            break;
        case 880101:
            return 'appkey 不存在'
            break;
        case 880102:
            return '签名错误'
            break;
        case 880103:
            return '用户不存在'
            break;
        case 880104:
            return '密码错误'
            break;
        case 880106:
            return '签名过期'
            break;
        case 880107:
            return '已经是登录状态'
            break;
        case 880109:
            return '重复登录操作'
            break;
        case 880110:
            return '多通道错误，更新sdk版本'
            break;
        case 880111:
            return '用户被禁用'
            break;
        case 880203:
            return '目标用户不存在'
            break;
        case 880204:
            return '目标群组不存在'
            break;
        case 880205:
            return '用户不在群组'
            break;
        case 880206:
            return '消息大小超过限制'
            break;
        case 880207:
            return '用户被对方拉黑'
            break;
        case 880208:
            return '消息包含敏感词汇'
            break;
        case 880209:
            return '发送速度超过限制'
            break;
        case 880210:
            return '文件大小超过限制'
            break;
        case 880212:
            return '禁言中'
            break;
        case 880402:
            return '没有创建群组的权限'
            break;
        case 880403:
            return '群数量到达上限'
            break;
        case 880404:
            return '群名字超过长度限制，创建失败'
            break;
        case 880405:
            return '群描述长度超过限制'
            break;
        case 880602:
            return '目标为空'
            break;
        case 880604:
            return '没权限添加群成员'
            break;
        case 880606:
            return '成员列表中有用户没有被添加到群组的权限'
            break;
        case 880607:
            return '重复添加'
            break;
        case 880608:
            return '数量超过限制'
            break;
        case 880609:
            return '成员列表中存在成员的群组数量超过限制'
            break;
        case 880610:
            return '用户已经在群里面'
            break;
        case 880611:
            return '群类型不支持该操作'
            break;
        case 880612:
            return '已经处理'
            break;
        case 880614:
            return '无权限操作'
            break;
        case 880704:
            return '用户没有删除群成员的权限'
            break;
        case 880705:
            return '成员列表中存在成员用户没权限删除'
            break;
        case 880903:
            return '成员列表中有成员不能被添加，添加失败'
            break;
        case 880904:
            return '重复添加'
            break;
        case 881101:
            return '该成员已处于免打扰状态'
            break;
        case 881102:
            return '该成员不处于免打扰状态'
            break;
        case 881105:
            return '该群组已处于免打扰状态'
            break;
        case 881106:
            return '该群组不处于免打扰状态'
            break;
        case 881107:
            return '已经设置免打扰'
            break;
        case 881108:
            return '没有设置免打扰'
            break;
        case 881203:
            return '已经设置了屏蔽'
            break;
        case 881204:
            return '群未设置屏蔽'
            break;
        case 881302:
            return '已经是好友'
            break;
        case 881303:
            return '非好友关系'
            break;
        case 881304:
            return '非法备注'
            break;
        case 881305:
            return '添加好友失败：邀请事件无效'
            break;
        case 881401:
            return '超出撤回时间'
            break;
        case 881402:
            return '请求撤回方不是消息发送方'
            break;
        case 881403:
            return '消息不存在'
            break;
        case 881404:
            return '已经撤回'
            break;
        case 881501:
            return '用户不在聊天室'
            break;
        case 881502:
            return '用户被禁止发消息'
            break;
        case 881503:
            return '聊天室不存在'
            break;
        case 881504:
            return '消息长度超出限制'
            break;
        case 881507:
            return '用户已经在聊天室'
            break;
        case 881508:
            return '超过聊天室人数限制'
            break;
        case 881509:
            return '消息格式错误'
            break;
        case 881602:
            return '目标用户未登录'
            break;
        case 881604:
            return '消息长度超出限制'
            break;
        case 881701:
            return '用户不是群管理员'
            break;
        case 882001:
            return '系统内部错误'
            break;
        case 882002:
            return 'user exit，no such user，password error，uid invalid，gid invalid'
            break;
        case 882003:
            return '参数不合法'
            break;
        case 882004:
            return '无效授权'
            break;
        case 882005:
            return '系统繁忙，稍后重试'
            break;
        default:
            break;
    }
}