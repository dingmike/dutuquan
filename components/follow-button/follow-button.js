var t = require("../../utils/global.js"), o = (t.appName, t.getUrl, t.dbname, t.tbl, 
require("../../utils/appConfigHandle.js").getAppConfig);

Component({
    properties: {
        sinceTime: {
            type: String
        }
    },
    data: {
        buttonShow: "off",
        avatarUrl: "",
        accountName: "",
        avatarTips: "",
        buttonText: ""
    },
    methods: {
        getConfig: function() {
            var t = this;
            o(function(o) {
                var a = JSON.parse(o.followButtonControl);
                console.log("follow button config", a), t.setConfig(a);
            });
        },
        setConfig: function(t) {
            var o = t.buttonShow, a = void 0 === o ? "off" : o, n = t.avatarUrl, e = void 0 === n ? "" : n, i = t.accountName, r = void 0 === i ? "" : i, s = t.avatarTips, u = void 0 === s ? "" : s, f = t.buttonText, l = void 0 === f ? "聊天" : f;
            this.setData({
                buttonShow: a,
                avatarUrl: e,
                accountName: r,
                avatarTips: u,
                buttonText: l
            });
        }
    },
    ready: function() {
        this.getConfig();
    }
});