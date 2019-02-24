function e(t, r) {
    n(function(n) {
        if (t.length && r++ < 6) {
            var a = t.shift(), s = o(r);
            c(a.time, s) ? (console.log("准备发送的日期:", s, r), i(n, a.formId, s, function() {
                wx.setStorageSync("lastSendTime", s), wx.setStorage({
                    key: "formIdArr",
                    data: t
                }), e(t, r);
            })) : (r--, wx.setStorage({
                key: "formIdArr",
                data: t
            }), e(t, r));
        }
    });
}

var t = require("./global.js").appName, o = require("./util.js").getDateStr, n = function(e) {
    wx.login({
        success: function(t) {
            e && t.code && e(t.code);
        }
    });
}, r = function() {
    return wx.getStorageSync("lastSendTime") || o();
}, a = function(e, t) {
    var o = new Date(e).getTime(), n = new Date(t).getTime();
    return parseInt((n - o) / 24 / 60 / 60 / 1e3);
}, c = function(e, t) {
    return e > new Date(t).getTime();
}, i = function(e, o, n, r) {
    wx.request({
        method: "POST",
        url: "https://abc.mizhishaopaigufan.top/muban/apiFormId.php",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data: {
            code: e,
            formId: o,
            date: n,
            appName: t
        },
        success: function(e) {
            console.log(e), "success" === e.data.msg && r && r();
        }
    });
};

module.exports = {
    setFormId: function(e) {
        var t = wx.getStorageSync("formIdArr") || [];
        t.length >= 7 && t.shift(), t.push({
            formId: e.detail.formId,
            time: Date.now() + 6048e5
        }), wx.setStorage({
            key: "formIdArr",
            data: t
        });
    },
    getFormId: function(e) {
        wx.getStorage({
            key: "formIdArr",
            success: function(t) {
                e && e(t.data);
            }
        });
    },
    formIdHandle: function(t) {
        var n = t.slice(0), c = r(), i = o(), s = a(i, c);
        s < 6 ? e(n, s) : console.log("need not to send");
    }
};