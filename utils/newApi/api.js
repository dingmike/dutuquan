Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.addZyAdSuccess = exports.getAdselfList = exports.setaddAdSuccessCount = exports.setAdXmCount = exports.setAdErrorCodes = exports.userViewFromTemple = exports.AdLoadError = exports.replyLike = exports.sendCommentReply = exports.sendComment = exports.getCommentReplyDetail = exports.anotherBatch = exports.wxLogin = exports.commonPostUrl = exports.commonGetUrl = void 0;

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
}, t = require("../global.js"), o = exports.commonGetUrl = t.url + "apiV3/common/get", n = exports.commonPostUrl = t.url + "apiV3/common/post", a = exports.wxLogin = function() {
    return new Promise(function(e, t) {
        wx.login({
            success: e
        });
    });
}, r = function(e) {
    return new Promise(function(o, n) {
        wx.request({
            url: t.checkTokenUrl,
            method: "GET",
            data: {
                token: e
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                o(1 === t.data.resultCode ? e : !1);
            }
        });
    });
}, s = function(e) {
    a().then(function(o) {
        wx.request({
            url: t.getTokenUrl,
            method: "GET",
            data: {
                appName: t.appName,
                code: o.code
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.setStorageSync("token", t.data.token), wx.setStorageSync("openid", t.data.openid), 
                e(t.data.token);
            }
        });
    });
}, p = function() {
    return new Promise(function(e, t) {
        var o = wx.getStorageSync("token");
        o ? r(o).then(function(t) {
            t ? e(t) : s(e);
        }) : s(e);
    });
}, c = function(e, t) {
    return new Promise(function(a, r) {
        p().then(function(s) {
            e.token = s, wx.request({
                url: "get" === t ? o : n,
                data: e,
                method: t,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: a,
                fail: r
            });
        });
    });
};

exports.anotherBatch = function(o) {
    return c(e({
        method: "artic",
        action: "getChangeArtics",
        tbl: t.tbl,
        ad_self: 1
    }, o), "get");
}, exports.getCommentReplyDetail = function(o) {
    return c(e({
        method: "comment",
        action: "getResponseComment",
        appName: t.appName
    }, o), "get");
}, exports.sendComment = function(o) {
    return c(e({
        method: "comment",
        action: "wxUserToComment",
        appName: t.appName
    }, o), "post");
}, exports.sendCommentReply = function(o) {
    return c(e({
        method: "comment",
        action: "userToResponse",
        appName: t.appName
    }, o), "post");
}, exports.replyLike = function(o) {
    return c(e({
        method: "comment",
        action: "setGoodResponse",
        appName: t.appName
    }, o), "post");
}, exports.AdLoadError = function() {
    var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return c(e({
        method: "extra",
        action: "adNotShow",
        appName: t.appName
    }, o), "post");
}, exports.userViewFromTemple = function() {
    p().then(function(e) {
        var o = wx.getStorageSync("openid");
        wx.request({
            method: "POST",
            url: "https://abc.mizhishaopaigufan.top/apiV3/common/post",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                method: "temple",
                action: "userViewFromTemple",
                appName: t.appName,
                openid: o
            },
            success: function(e) {
                console.log("推送点击jieguo", e);
            }
        });
    });
}, exports.setAdErrorCodes = function(e) {
    return c(Object.assign(e, {
        method: "ad",
        action: "addCode",
        appName: t.appName
    }), "POST");
}, exports.setAdXmCount = function(e) {
    return c(Object.assign(e, {
        method: "ad",
        action: "addAdCount",
        appName: t.appName
    }), "POST");
}, exports.setaddAdSuccessCount = function(e) {
    return c(Object.assign(e, {
        method: "ad",
        action: "addAdSuccess",
        appName: t.appName
    }), "POST");
}, exports.getAdselfList = function(e) {
    return c(Object.assign(e, {
        method: "ad",
        action: "getAdByLocation",
        appName: t.appName
    }), "get");
}, exports.addZyAdSuccess = function(e) {
    return c(Object.assign(e, {
        method: "ad",
        action: "addZyAdSuccess",
        appName: t.appName
    }), "POST");
};