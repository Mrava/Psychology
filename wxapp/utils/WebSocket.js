var api = require('api');
var HEADER = "application/x-www-form-urlencoded";
var socketOpen = false;
var socketMsgQueue = [];

function InitializationSocket() {
    wx.connectSocket({
        url: api.wss,
        header: {
            'content-type': HEADER
        },
        method: '',
        protocols: [],
        success: function (res) {
            console.log("连接成功:",res);
            onSocketOpen()//开始监听WebSocket连接打开事件
        },
        fail: function (res) {
            console.log("连接失败:", res);
            console.log(res)
        },
        complete: function (res) { },
    })
}

//监听 WebSocket 连接打开事件
function onSocketOpen() {
    wx.onSocketOpen(function (res) {
        socketOpen = true
        for (let i = 0; i < socketMsgQueue.length; i++) {
            wx.sendSocketMessage({
                data: socketMsgQueue[i]
            })
        }
        socketMsgQueue = []
    })
}

//监听 WebSocket 错误事件
function onSocketError() {
    wx.onSocketError(function(e){
      console.log(e)
    })
}

//监听 WebSocket 连接关闭事件
function onSocketClose(){
  wx.onSocketClose(function(e){
    console.log(e)
  })
}

//返回onSocketOpen的状态
function getSockOpen() {
    return socketOpen;
}

//将未发送的信息存储，用于重新onSocketOpen成功后，继续执行发送
function setSockMsgQueue(msg) {
    socketMsgQueue.push(msg)
}

//发送信息
function sendMessage(msg) {
    console.log(msg)
    if (socketOpen) {
        wx.sendSocketMessage({
            data: msg
        })
    } else {
        socketMsgQueue.push(msg);
    }
}

module.exports = {
    InitializationSocket: InitializationSocket,
    getSockOpen: getSockOpen,
    setSockMsgQueue: setSockMsgQueue,
    sendMessage:sendMessage,
}