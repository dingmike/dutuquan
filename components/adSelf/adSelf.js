Component({
    properties: {
        adFirstList: {
            type: Object,
            observer: function(t, e) {}
        },
        adSelftId: {
            type: String
        }
    },
    data: {
        tId: {},
        rotate: 0,
        adFirstList: {},
        adSelftId: ""
    },
    methods: {
        bindsuccess: function(t) {
            wx.reportAnalytics("ad_self_click", {
                adselftid: this.data.adSelftId
            }), wx.reportAnalytics("ad_self_clickall", {});
        },
        go_adself: function() {
            wx.redirectTo({
                url: "/pages/graphic-adself/graphic-adself?id=" + this.data.current_app_id
            }), wx.setStorageSync("ad_info", this.data.adFirstList.ad_info);
        }
    },
    ready: function() {
        var t = this.properties.adFirstList, e = "";
        "0" === t.type && (e = t.wx_url.split("id=")[1]), this.setData({
            adFirstList: t,
            adSelftId: this.properties.adSelftId,
            current_app_id: e
        }), this.triggerEvent("AdToRefresh", this.properties.adSelftId), wx.reportAnalytics("ad_self_show", {});
    }
});