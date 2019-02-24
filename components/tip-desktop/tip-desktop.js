Component({
    properties: {},
    data: {
        showTip: !1
    },
    methods: {
        close: function() {
            this.setData({
                showTip: !1
            }), wx.setStorage({
                key: "addDesktop",
                data: {
                    close: !0,
                    count: 3
                }
            });
        },
        hide: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3;
            setTimeout(function() {
                t.setData({
                    showTip: !1
                });
            }, 1e4), wx.setStorage({
                key: "addDesktop",
                data: {
                    count: e,
                    close: !1
                }
            });
        }
    },
    created: function() {
        var t = this;
        wx.getStorage({
            key: "addDesktop",
            success: function(e) {
                e.data.count < 3 && (t.setData({
                    showTip: !0
                }), t.hide());
            },
            fail: function(e) {
                t.setData({
                    showTip: !0
                }), wx.setStorage({
                    key: "addDesktop",
                    data: {
                        count: 1,
                        close: !1
                    }
                }), t.hide(2);
            }
        });
    },
    attached: function() {}
});