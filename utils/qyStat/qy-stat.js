Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../global.js"), o = e.checkTokenUrl, t = e.appName;

exports.getOpenId = function(e) {
    var t = wx.getStorageSync("token");
    wx.request({
        url: o,
        method: "GET",
        data: {
            token: t
        },
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(o) {
            1 === o.data.resultCode && "function" == typeof e && e(o.data.openid);
        }
    });
}, exports.add_page_overview = function(e, o) {
    wx.request({
        url: o,
        data: {
            appName: t,
            id: e
        },
        header: {
            "content-type": "application/x-www-form-urlencoded",
            version: "v2.0"
        },
        success: function(e) {
            console.log("后台文章阅读量", e);
        }
    });
}, exports.add_share_overview2 = function(e, o, n) {
    wx.request({
        url: n,
        data: {
            appName: t,
            openid: o,
            id: e
        },
        header: {
            "content-type": "application/x-www-form-urlencoded",
            version: "v2.0"
        },
        method: "get",
        success: function(e) {
            console.log("后台文章分享统计", e);
        }
    });
};