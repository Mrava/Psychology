const JMessage = require('jmessage-wxapplet-sdk-1.4.0.min.js'),
    setinfo = require('../setinfo.js'), jim = new JMessage(), allData = getApp().globalData
let isJim = false, that
function init() {
    jim.init({
        "appkey": setinfo.JgAppkey,
        "random_str": setinfo.RandomStr,
        "signature": setinfo.signature(),
        "timestamp": setinfo.TimeStamp
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

//获取会话列表
function getConversation() {
    jim.getConversation().onSuccess(function (data) {
        console.log(data)
        //data.code 返回码
        //data.message 描述
        //data.conversations[] 会话列表，属性如下示例
        //data.conversations[0].extras 附加字段
        //data.conversations[0].unread_msg_count 消息未读数
        //data.conversations[0].name  会话名称
        //data.conversations[0].appkey  appkey(单聊)
        //data.conversations[0].username  用户名(单聊)
        //data.conversations[0].nickname  用户昵称(单聊)
        //data.conversations[0].avatar  头像 media_id 
        //data.conversations[0].mtime 会话最后的消息时间戳
        //data.conversations[0].gid 群 id(群聊)
        //data.conversations[0].type  会话类型(3 代表单聊会话类型，4 代表群聊会话类型)
    }).onFail(function (data) {
        //data.code 返回码
        //data.message 描述
    });
}

//聊天消息实时监听
function onMsgReceive() {
    jim.onMsgReceive(function (data) {
        console.log(data)
        allData.msgNum = 100,
        that.getTabBar().setData({
            msgNum: 100
        })
        //判断消息页面的this时候被指定，如果被指定则执行刷新
        if (allData.gthat) {
            allData.gthat.refreshData()
        }
        allData.msgNum = 100
        allData.chatList = data.messages
    });
}

//离线消息同步监听
function onSyncConversation() {
    jim.onSyncConversation(function (data) {
        console.log("离线消息同步监听", data)
        // data[]
        // data[].msg_type 会话类型
        // data[].from_appey 单聊有效
        // data[].from_username 单聊有效
        // data[].from_gid 群聊有效
        // data[].unread_msg_count 消息未读数
        // 消息已读回执状态，针对自己发的消息
        // data[].receipt_msgs[]
        // data[].receipt_msgs[].msg_id
        // data[].receipt_msgs[].unread_count
        // data[].receipt_msgs[].mtime
        // 消息列表
        // data[].msgs[]
        // data[].msgs[].msg_id
        // data[].msgs[].content
        // data[].msgs[].msg_type
        // data[].msgs[].ctime_ms
        // data[].msgs[].need_receipt
        // data[].msgs[].custom_notification.enabled
        // data[].msgs[].custom_notification.title
        // data[].msgs[].custom_notification.alert
        // data[].msgs[].custom_notification.at_prefix
    });
}

function login(username, password) {
    jim.login({
        'username': 'angus',
        'password': 'wnqxyt520'
    }).onSuccess(function (data) {
        switch (data.code) {
            case 0:
                console.log('im登录成功', data)
                allData.isJim = true
                onMsgReceive()
                onSyncConversation()
                getConversation()
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

function sendSingleMsg(res) {
    // 发送消息
    jim.sendSingleMsg(res).onSuccess(function (data, msg) {
        console.log(data)
        //data.code 返回码
        //data.message 描述
        //data.msg_id 发送成功后的消息 id
        //data.ctime_ms 消息生成时间,毫秒
        //data.appkey 用户所属 appkey
        //data.target_username 用户名
        //msg.content 发送成功消息体,见下面消息体详情
    }).onFail(function (data) {
        console.log(data)
        //data.code 返回码
        //data.message 描述
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
}

/**
 * ErrorCode 定义
 * @param {Int} code 错误代码
 */
function ErrorCode(code) {
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