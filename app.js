var t = require("utils/mta_analysis.js");

App({
    onLaunch: function(a) {
        t.App.init({
            appID: "500620479",
            eventID: "500620482",
            lauchOpts: a,
            statPullDownFresh: !0,
            statShareApp: !0,
            statReachBottom: !0
        });
    },
    globalData: {
        is_show: 0,
        is_show_all: 0
    }
});