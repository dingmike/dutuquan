Component({
    properties: {
        share: {
            type: String,
            value: "1",
            observer: function(t, e) {
                console.log("this.properties.isShare", t), this.setData({
                    is_share: t
                });
            }
        }
    },
    data: {
        is_share: "1",
        tipsStartTime: 5e3,
        durations: 5e3,
        showShareTips: !1
    },
    methods: {
        changeShareTips: function() {
            var t = this, e = this.data.showShareTips;
            t.setData({
                showShareTips: !e
            });
        },
        home: function() {
            1 === getCurrentPages().length ? wx.redirectTo({
                url: "/pages/index/index"
            }) : wx.navigateBack();
        }
    },
    created: function() {
        var t = this;
        Math.random() > 0 && (setTimeout(function() {
            t.changeShareTips();
        }, t.data.tipsStartTime), setTimeout(function() {
            t.changeShareTips();
        }, t.data.tipsStartTime + t.data.durations));
    }
});