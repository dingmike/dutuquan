var e = require("./global.js"), t = e.appName, o = e.getTokenUrl, n = e.checkTokenUrl, c = function(e) {
    wx.login({
        success: function(n) {
            n.code && wx.request({
                url: o,
                method: "GET",
                data: {
                    appName: t,
                    code: n.code
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    if (1 === t.data.resultCode) {
                        var o = t.data.token;
                        try {
                            wx.setStorageSync("token", o);
                        } catch (e) {}
                        "function" == typeof e && e(o);
                    }
                }
            });
        }
    });
};

module.exports = {
    validation: function(e) {
        try {
            var t = wx.getStorageSync("token");
            t ? wx.request({
                url: n,
                method: "GET",
                data: {
                    token: t
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(o) {
                    1 === o.data.resultCode ? "function" == typeof e && e(t) : c(e);
                }
            }) : c(e);
        } catch (e) {}
    }
};