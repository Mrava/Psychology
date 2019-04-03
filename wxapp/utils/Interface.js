const app = getApp();
let ContainerHeight;
function getTopHeight() {
    return app.globalData.CustomBar;
}

function getContainerHeight(id) {
    var query = wx.createSelectorQuery();
    query.select('#' + id).boundingClientRect()
    query.exec(function (res) {//返回组件属性
        ContainerHeight = res
        console.log(res)
    })
    console.log(ContainerHeight)
}



module.exports = {
    getContainerHeight,
    getTopHeight,
}