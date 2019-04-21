const app = getApp(), api = require('api.js')
function seveImage(that,url, name) {
    wx.downloadFile({
        url: api.loadingImgUrl + url,
        success: function (res) {
            if (res.statusCode === 200) {
                // 第二步: 使用小程序的文件系统，通过小程序的api获取到全局唯一的文件管理器
                const fs = wx.getFileSystemManager()
                //  fs为全局唯一的文件管理器。那么文件管理器的作用是什么，我们可以用来做什么呢？
                //   文件管理器的作用之一就是可以根据临时文件路径，通过saveFile把文件保存到本地缓存.
                fs.saveFile({
                    tempFilePath: res.tempFilePath, // 传入一个临时文件路径
                    success(res) {
                        console.log('图片缓存成功', res.savedFilePath) // res.savedFilePath 为一个本地缓存文件路径
                        wx.setStorageSync(name, res.savedFilePath)
                        that.onReady()
                    }
                })
            } else {
                console.log('响应失败', res.statusCode)
            }
        }
    })
}

module.exports = {
    seveImage
}