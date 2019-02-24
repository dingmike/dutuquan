var e = require("../../utils/global.js"), n = e.version, o = e.appName;

Page({
    data: {},
    onLoad: function(e) {
        wx.request({
            url: "https://crazywednesday.top/show/show.php",
            method: "POST",
            data: {
                appName: o,
                version: n
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e.data), e.data.isShow ? wx.redirectTo({
                    url: "/pages/yuetu-index/yuetu-index"
                }) : wx.redirectTo({
                    url: "/pages/index/index"
                });
            },
            fail: function(e) {
                wx.redirectTo({
                    url: "/pages/index/index"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});