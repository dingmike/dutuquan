function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e = require("../../utils/mta_analysis.js"), i = require("../../utils/global.js"), o = i.version, s = i.appName, n = i.appCNName, d = i.getUrl, r = i.getUrl2, l = (i.dbname, 
i.tbl), c = require("../../utils/formIdHandle.js").setFormId, h = require("../../utils/appConfigHandle.js").getAppConfig, g = require("../../utils/newApi/api.js"), u = d;

Page({
    data: {
        version: o,
        pageHeight: 0,
        listHeight: 0,
        graphics: [],
        carouselList: [],
        page: 1,
        count: 6,
        randId: "",
        isFetching: !1,
        isTheLatestData: !1,
        emptyTips: "",
        updated: !1,
        tId: {},
        adControl: {
            1: "off",
            2: "off",
            3: "off",
            4: "off",
            indexListGap: 6
        },
        adSelfInfo: {},
        adId: {},
        adSelfFirst: !1,
        adSelfSecond: {},
        adselfList: [],
        adSelfControl: {}
    },
    onLoad: function(t) {
        var a = this;
        if (t.is_collect && this.userViewFromTemple(), void 0 !== t.id) wx.showLoading({
            title: "加载中"
        }), setTimeout(function() {
            wx.hideLoading(), console.log("index onload"), a.getCarouselList(), a.adConfig();
            var e = a.data.page;
            a.getGraphics(e, function(i) {
                var o = i.data || [];
                a.setData({
                    page: e,
                    graphics: o
                }), setTimeout(function() {
                    wx.navigateTo({
                        url: "/pages/graphic/graphic?id=" + t.id
                    });
                }, 100);
            });
            var i = wx.getSystemInfoSync();
            a.setData({
                pageHeight: i.windowHeight
            });
        }, 0); else {
            console.log("index onload"), this.getCarouselList(), this.adConfig(), this.getAdselfList();
            var e = this.data.page;
            this.getGraphics(e, function(t) {
                console.log("index get", t);
                var i = t.data.length;
                t.data[i - 1].show = !1;
                var o = t.data || [];
                a.setData({
                    page: e,
                    graphics: o
                });
            });
            var i = wx.getSystemInfoSync();
            this.setData({
                pageHeight: i.windowHeight
            });
        }
    },
    onShow: function() {},
    onPageScroll: function(t) {
        var a = this.data.pageHeight || 800;
        (this.data.listHeight || 800) - a - t.scrollTop < 200 && (console.log("scroll to lower"), 
        this.scrollToLower());
    },
    adSuccess: function(t) {
        var a = t.target.dataset.id;
        g.setaddAdSuccessCount({
            ad_id: a
        });
    },
    adError: function(t) {
        var e = t.detail.errCode, i = t.target.dataset.id;
        if (i === this.data.adId[1] && this.setData({
            adSelfFirst: !0
        }), i === this.data.adId[2]) {
            var o = t.currentTarget.dataset.key;
            this.setData(a({}, "graphics[" + o + "].show", !0));
        }
        g.setAdErrorCodes({
            error_code: e,
            ad_id: i
        });
    },
    onShareAppMessage: function() {
        return {
            title: n
        };
    },
    onPullDownRefresh: function() {
        this.anotherBatch({
            type: "pulldown"
        });
    },
    getGraphics: function() {
        var t = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, e = arguments[1];
        this.data.isFetching || (this.setData({
            isFetching: !0
        }), wx.request({
            url: u,
            method: "GET",
            data: {
                type: "GetAll",
                is_admin: 1,
                ad_self: 1,
                page: a,
                count: this.data.count,
                tbl: l
            },
            success: function(a) {
                e && e(a), setTimeout(t.getListHeight, 10);
            }
        }));
    },
    getCarouselList: function() {
        var t = this;
        wx.request({
            url: d,
            method: "GET",
            data: {
                type: "GetIndexCarousel",
                appName: s,
                tbl: l
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                a.data && a.data.length < 10 && t.setData({
                    carouselList: a.data
                }), console.log(a.data);
            }
        });
    },
    getAdselfList: function() {
        var t = this;
        g.getAdselfList({
            method: "ad",
            action: "getAdByLocation",
            location: 1
        }).then(function(a) {
            var e = a.data.data || [];
            if (0 === e.length) {
                var i = {
                    id: "",
                    "wx:url": "",
                    ad_img: "",
                    appId: ""
                };
                e.push(i);
            }
            t.setData({
                adselfList: a.data.data
            });
        });
    },
    adConfig: function() {
        var t = this;
        h(function(a) {
            var e = a.adControl;
            if (e) {
                var i = JSON.parse(e), o = i.index, s = void 0 === o ? t.data.adControl : o, n = i.adId, d = i.indexSelf, r = i.adSelfInfo;
                t.setData({
                    adControl: s,
                    adSelfControl: d,
                    adSelfInfo: r.index,
                    adId: n.indexId
                });
            }
        });
    },
    navigateTo: function(t) {
        getApp().globalData.is_show += 1, getApp().globalData.is_show_all += 1;
        var a = t.detail.target.dataset, i = a.graphicUrl, o = a.redirectId, s = a.redirectPath, n = a.id, d = a.title;
        e.Event.stat("artic_count", {
            id: n
        }), e.Event.stat("artic_count", {
            title: d
        });
        try {
            c(t), console.log(12123134, t);
        } catch (t) {
            console.log(t);
        }
        o && s ? wx.navigateToMiniProgram({
            appId: o,
            path: s
        }) : wx.navigateTo({
            url: i
        });
    },
    getListHeight: function() {
        var t = this;
        wx.createSelectorQuery().select("#content").boundingClientRect(function(a) {
            var e = a.height;
            t.setData({
                isFetching: !1,
                listHeight: e
            });
        }).exec();
    },
    scrollToLower: function() {
        var t = this, a = this.data.page + 1, e = this.data.isTheLatestData;
        this.data.randId ? this.anotherBatch({
            type: "loadMore"
        }) : !e && this.getGraphics(a, function(e) {
            if (e.data.length) {
                var i = e.data.length;
                e.data[i - 1].show = !1;
                var o = t.data.graphics.concat(e.data);
                t.setData({
                    page: a,
                    graphics: o
                });
            } else t.setData({
                isTheLatestData: !0,
                emptyTips: "暂时没有了喔"
            });
        });
    },
    anotherBatch: function(a) {
        var e = this, i = a.type;
        if (!this.data.isFetching) {
            this.setData({
                isFetching: !0
            });
            var o = parseInt(6 * Math.random() + 1);
            "loadMore" === i || wx.pageScrollTo({
                scrollTop: 0,
                duration: 0
            }), "loadMore" !== i && (wx.showLoading({
                title: "加载中"
            }), this.setData({
                graphics: [],
                page: 1,
                randId: o
            })), g.anotherBatch({
                page: this.data.page,
                pageindex: 6,
                randId: this.data.randId
            }).then(function(a) {
                1 === a.data.resultCode ? (e.setData({
                    graphics: [].concat(t(e.data.graphics), t(a.data.data)),
                    page: e.data.page + 1,
                    updated: "loadMore" !== i
                }), wx.hideLoading(), "pulldown" === i && wx.stopPullDownRefresh(), "loadmore" !== i && setTimeout(function() {
                    e.setData({
                        updated: !1
                    });
                }, 1e3)) : wx.hideLoading(), setTimeout(e.getListHeight, 10);
            }).catch(function(t) {
                wx.hideLoading(), console.log("换一批Error", t);
            });
        }
    },
    refresh: function(t) {
        var a = this, e = t.type;
        if (!this.data.isFetching) {
            wx.showLoading({
                title: "加载中"
            });
            this.setData({
                graphics: [],
                page: 1
            }), u = r, "pulldown" !== e && wx.pageScrollTo({
                scrollTop: 0,
                duration: 0
            }), this.getGraphics(1, function(t) {
                t.data;
                a.setData({
                    page: 1,
                    graphicsade: graphicsade
                }), "pulldown" === e && wx.stopPullDownRefresh(), wx.hideLoading(), a.setData({
                    updated: !0
                }), setTimeout(function() {
                    a.setData({
                        updated: !1
                    });
                }, 1e3);
            });
        }
    },
    addZyAdSuccess: function(t) {
        var a = t.detail;
        g.addZyAdSuccess({
            ad_id: a
        });
    },
    userViewFromTemple: function() {
        g.userViewFromTemple({});
    }
});