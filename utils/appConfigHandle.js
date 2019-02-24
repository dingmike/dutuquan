var o = require("./global.js"), e = o.getUrl, t = o.appName, a = function(o) {
    wx.setStorage({
        key: "appConfig",
        data: {
            timiestamp: Date.now(),
            config: o
        }
    });
}, n = function(o) {
    console.log("get app config from server"), wx.request({
        url: e,
        method: "GET",
        data: {
            type: "GetAppConfig",
            appName: t
        },
        success: function(e) {
            console.log(e.data), o && o(e.data);
        }
    });
};

module.exports = {
    getAppConfig: function(o) {
        wx.getStorage({
            key: "appConfig",
            success: function(e) {
                var t = e.data, i = t.timiestamp, c = t.config;
                Date.now() > i + 36e5 ? n(function(e) {
                    a(e), e && o && o(e);
                }) : (console.log("get app config from storage"), c && o && o(c));
            },
            fail: function() {
                n(function(e) {
                    a(e), e && o && o(e);
                });
            }
        });
    }
};