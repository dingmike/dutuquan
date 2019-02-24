var t = require("../../yuetu-utils/global.js"), e = t.appName, a = t.appCNName, i = t.getUrl, s = (t.dbname, 
t.tbl), o = (require("../../yuetu-utils/formIdHandle.js").setFormId, require("../../yuetu-utils/appConfigHandle.js").getAppConfig);

Page({
    data: {
        version: "0.9.3",
        pageHeight: 0,
        listHeight: 0,
        graphics: [],
        carouselList: [],
        page: 1,
        count: 25,
        isFetching: !1,
        isTheLatestData: !1,
        emptyTips: "",
        tId: {},
        adControl: {
            1: "off",
            2: "off",
            3: "off",
            4: "off",
            indexListGap: 6
        }
    },
    onLoad: function() {
        var t = this;
        console.log("index onload"), this.getCarouselList(), this.adConfig();
        var e = this.data.page;
        this.getGraphics(e, function(a) {
            var i = a.data || [];
            t.setData({
                page: e,
                graphics: i
            });
        });
        var a = wx.getSystemInfoSync();
        this.setData({
            pageHeight: a.windowHeight
        });
    },
    onPageScroll: function(t) {
        var e = this.data.pageHeight || 800;
        (this.data.listHeight || 800) - e - t.scrollTop < 200 && (console.log("scroll to lower"), 
        this.scrollToLower());
    },
    onShareAppMessage: function() {
        return {
            title: a
        };
    },
    onPullDownRefresh: function() {
        this.refresh({
            type: "pulldown"
        });
    },
    getGraphics: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, a = arguments[1];
        this.data.isFetching || (this.setData({
            isFetching: !0
        }), wx.request({
            url: i,
            method: "GET",
            data: {
                type: "GetAll",
                page: e,
                count: this.data.count,
                tbl: s
            },
            success: function(e) {
                a && a(e), setTimeout(t.getListHeight, 10);
            }
        }));
    },
    getCarouselList: function() {
        var t = this;
        wx.request({
            url: i,
            method: "GET",
            data: {
                type: "GetIndexCarousel",
                appName: e,
                tbl: s
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                e.data && e.data.length < 10 && t.setData({
                    carouselList: e.data
                });
            }
        });
    },
    adConfig: function() {
        var t = this;
        o(function(e) {
            var a = e.adControl;
            if (a) {
                var i = JSON.parse(a).index, s = void 0 === i ? t.data.adControl : i;
                console.log("index page ad", s), t.setData({
                    adControl: s
                });
            }
        });
    },
    navigateTo: function(t) {
        var e = t.detail.target.dataset, a = e.imageUrl;
        e.graphicUrl, e.redirectId, e.redirectPath;
        console.log(a), wx.previewImage({
            current: a,
            urls: [ a ]
        });
    },
    getListHeight: function() {
        var t = this;
        wx.createSelectorQuery().select("#content").boundingClientRect(function(e) {
            var a = e.height;
            t.setData({
                isFetching: !1,
                listHeight: a
            });
        }).exec();
    },
    scrollToLower: function() {
        var t = this, e = this.data.page + 1;
        !this.data.isTheLatestData && this.getGraphics(e, function(a) {
            if (a.data.length) {
                var i = t.data.graphics.concat(a.data);
                t.setData({
                    page: e,
                    graphics: i
                });
            } else t.setData({
                isTheLatestData: !0,
                emptyTips: "暂时没有了喔"
            });
        });
    },
    refresh: function(t) {
        var e = this, a = t.type;
        if (!this.data.isFetching) {
            this.setData({
                isFetching: !0
            });
            var o = this.data.graphics[0], n = o ? o.id : 0;
            this.getCarouselList(), wx.request({
                url: i,
                method: "GET",
                data: {
                    type: "GetNew",
                    id: n,
                    tbl: s
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var i = t.data || [];
                    i && 0 !== i.length && e.setData({
                        graphics: i.concat(e.data.graphics)
                    }), "pulldown" === a ? wx.stopPullDownRefresh() : wx.pageScrollTo({
                        scrollTop: 0,
                        duration: 300
                    }), setTimeout(function() {
                        e.setData({
                            isFetching: !1
                        });
                    }, 500);
                }
            });
        }
    }
});