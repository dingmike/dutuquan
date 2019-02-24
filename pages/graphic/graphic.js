function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = require("../../utils/mta_analysis.js"), e = require("../../utils/util.js"), i = e.formatDate, o = e.formatTime, d = e.since, s = (e.getDateStr, 
e.formatSeconds), n = e.formatString, r = require("../../utils/global.js"), c = r.version, u = (r.appName, 
r.tbl), l = r.getUrl, h = r.getGraphicUrl, g = r.postCommonUrl, f = r.getRandomMore, m = (r.getCommentUrl, 
require("../../utils/formIdHandle.js")), p = m.getFormId, w = m.setFormId, v = m.formIdHandle, x = require("../../utils/appConfigHandle.js").getAppConfig, y = require("../../utils/validation.js").validation, C = require("../../utils/setShareCover.js").setShareCover, _ = (require("../../utils/classInfo.js"), 
require("../../utils/qyStat/qy-stat.js")), S = require("../../utils/like.js"), T = S.likeRecommend, D = S.getCommentData, I = require("../../utils/newApi/api.js");

Page({
    data: {
        is_share: "",
        updatedTime: "",
        audioLength: "",
        totalTime: "04:10",
        music_src: "",
        vid: "",
        music_title: "",
        isPlaying: !0,
        sliderValue: 0,
        audio_progress: !0,
        controlAdShow: "on",
        version: c,
        id: 0,
        token: "",
        time: 0,
        title: "",
        cover: "",
        count: 6,
        graphicType: "1",
        typography: "left",
        nodeList: [],
        nodeListLength: 0,
        previewImg: [],
        recommandList: [],
        commentData: [],
        commentDataAll: 0,
        page: 1,
        offset: 0,
        offsetCount: 0,
        offsetLength: 10,
        emptyTips: "",
        adControl: {
            1: "off",
            2: "off",
            3: "off"
        },
        adControlSelf: {},
        adSelfInfo: {},
        classType: "",
        windowHeight: 0,
        graphicHeight: 0,
        hasReaded: "0%",
        adselfList: [],
        adSelfFirst: !1,
        adSelfSecond: !1,
        adSelfThird: !1,
        adSelfControl: {},
        adIndex: 0,
        bg_url: "",
        isPlay: !0,
        audioCurrentTime: 0,
        audioShow: !0,
        adId: {}
    },
    onLoad: function(t) {
        console.log(t), wx.showLoading({
            title: "加载中"
        }), this.setData({
            id: t.id
        });
        var e = this;
        y(function(i) {
            e.getGraphic(t, i), e.adConfig(), e.getAdselfList(), a.Page.init();
            try {
                p(v);
            } catch (t) {
                console.log(t);
            }
        });
    },
    onShow: function() {
        var t = this, a = this.data.token && this.data.id ? 0 : 2e3;
        setTimeout(function(a) {
            t.getCommentList();
        }, a), this.data.isPlay ? (this.audioCtx = wx.createAudioContext("myAudio"), this.audioCtx.play(), 
        setTimeout(function(a) {
            t.audioCtx.seek(t.data.audioCurrentTime);
        }, 3e3)) : this.audioPause(), this.setData({
            audioShow: !0
        });
    },
    onReady: function() {
        this.audioCtx = wx.createAudioContext("myAudio");
    },
    onHide: function() {
        this.setData({
            audioCurrentTime: this.data.audioCurrentTime,
            audioShow: !1
        });
    },
    onPageScroll: function(t) {
        this.recordReadingExtent(t);
    },
    recordReadingExtent: function(t) {
        var a = this;
        if (this.data.graphicHeight) {
            var e = t.scrollTop + this.data.windowHeight, i = "0%";
            e > .25 * this.data.graphicHeight && (i = "25%"), e > .5 * this.data.graphicHeight && (i = "50%"), 
            e > .75 * this.data.graphicHeight && (i = "75%"), e > this.data.graphicHeight && (i = "100%"), 
            Number(i.replace(/%/g, "")) > Number(this.data.hasReaded.replace(/%/g, "")) && this.setData({
                hasReaded: i
            });
        } else {
            try {
                var o = wx.getSystemInfoSync();
                this.setData({
                    windowHeight: o.windowHeight
                });
            } catch (t) {
                console.error(t);
            }
            wx.createSelectorQuery().select(".graphic-content").boundingClientRect(function(t) {
                console.log(t);
                var e = t.height;
                a.setData({
                    graphicHeight: e
                });
            }).exec();
        }
    },
    ctrlAudio: function() {
        var t = this, a = !0;
        this.data.isPlay ? (this.audioPause(), a = !1) : (this.audioCtx.play(), setTimeout(function(a) {
            t.audioCtx.seek(t.data.audioCurrentTime);
        }, 1e3)), this.setData({
            isPlay: a
        });
    },
    bindended: function() {
        this.audioPlay();
    },
    audioPlay: function() {
        this.audioCtx = wx.createAudioContext("myAudio"), this.audioCtx.play(), this.setData({
            isPlay: !0
        });
    },
    audioPause: function() {
        this.audioCtx = wx.createAudioContext("myAudio"), this.audioCtx.pause(), this.setData({
            isPlay: !1
        });
    },
    bindtimeupdate: function(t) {
        this.setData({
            audioCurrentTime: t.detail.currentTime
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return this.data.api2_status && _.getOpenId(function(a) {
            _.add_share_overview2(t.data.id, a, t.data.api2);
        }), {
            title: this.data.title,
            imageUrl: this.data.cover,
            path: "pages/index/index?id=" + this.data.id
        };
    },
    redirectTo: function() {
        var t = this;
        wx.getStorage({
            key: "graphics",
            success: function(a) {
                var e = a.data.findIndex(function(a) {
                    return a.id === t.data.id;
                }), i = a.data[e + 1], o = i ? "/pages/graphic/graphic?id=" + i.id : "/pages/index/index";
                wx.redirectTo({
                    url: o
                });
            }
        });
    },
    getGraphic: function(t, a) {
        var e = t.id, d = this;
        wx.request({
            url: h,
            method: "GET",
            data: {
                token: a,
                id: e,
                tbl: u,
                ad_self: 1,
                ad_page: getApp().globalData.is_show_all
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t);
                var r = t.data, c = r.className, u = (r.classId, r.title), l = r.content, h = r.is_share, g = r.time, f = r.vid, m = r.cover, p = r.typography, w = void 0 === p ? "left" : p, v = r.bg_url, x = "";
                switch (t.data.type) {
                  case "1":
                    x = JSON.parse('{ "arr": ' + l + " }").arr;
                    break;

                  case "2":
                    x = n(l);
                    break;

                  default:
                    x = l;
                }
                "" === v ? d.setData({
                    bg_url: "#fff"
                }) : d.setData({
                    bg_url: v
                }), d.setData({
                    nodeList: x,
                    graphicType: t.data.type
                }, function() {
                    wx.hideLoading();
                }), "0" === h ? wx.hideShareMenu() : wx.showShareMenu(), d.setData({
                    api2: t.data.api2,
                    api2_status: t.data.api2_status,
                    classType: c,
                    updatedTime: i(g),
                    is_share: h,
                    id: e,
                    token: a,
                    title: u,
                    nodeListLength: Math.floor(x.length / 2),
                    typography: w,
                    sinceTime: o(g),
                    time: g,
                    cover: m,
                    audioLength: t.data.music_time,
                    totalTime: s(t.data.music_time),
                    music_src: t.data.music_url,
                    vid: f,
                    music_title: t.data.music_title
                }), d.audioPlay(), t.data.api1_status && _.add_page_overview(e, t.data.api1), C(m, d);
            }
        });
    },
    getRecommandList: function() {
        var t = this;
        wx.request({
            url: l,
            method: "GET",
            data: {
                type: "GetRandom",
                tbl: u
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                console.log("get recommand list", a.data), a.data && a.data.length < 10 && t.setData({
                    recommandList: a.data.map(function(t) {
                        return t.sinceTime = d(t.time), t;
                    })
                });
            }
        });
    },
    adConfig: function() {
        var t = this;
        x(function(a) {
            var e = a.adControl;
            if (e) {
                var i = JSON.parse(e), o = i.graphic, d = void 0 === o ? t.data.adControl : o, s = i.adSelfInfo, n = i.adId, r = i.graphicSelf;
                t.setData({
                    adControl: d,
                    adSelfControl: r,
                    adSelfInfo: s.graphic,
                    adId: n.graphicId
                });
            }
        });
    },
    getAdselfList: function() {
        var t = this;
        I.getAdselfList({
            method: "ad",
            action: "getAdByLocation",
            location: 2
        }).then(function(a) {
            var e = a.data.data || [];
            if (0 === e.length) {
                var i = {
                    id: "",
                    "wx:url": "",
                    ad_img: "",
                    appId: ""
                };
                e.push(i, i);
            }
            t.setData({
                adselfList: a.data.data
            }), t.getRecommandList();
        });
    },
    saveToFav: function() {
        var t = wx.getStorageSync("favourites") || [], a = this.data, e = a.id, i = a.time, d = a.title, s = a.cover;
        if (e) if (0 === t.filter(function(t) {
            return t.id === e;
        }).length) {
            var n = {
                id: e,
                time: i,
                title: d,
                cover: s,
                saveTime: o(Date.now())
            };
            t.unshift(n), wx.setStorage({
                key: "favourites",
                data: t,
                success: function() {
                    wx.showToast({
                        title: "文章收藏成功"
                    });
                }
            });
        } else wx.showToast({
            title: "文章已经收藏过啦"
        });
    },
    showPreviewImage: function(t) {
        var a = [], e = t.currentTarget.dataset.imgurl;
        this.data.previewImg.length ? a = this.data.previewImg : (a = this.data.nodeList.filter(function(t) {
            return t.url;
        }).map(function(t) {
            return t.url;
        }), this.setData({
            previewImg: a
        })), wx.previewImage({
            current: e,
            urls: a
        });
    },
    navigateTo: function(t) {
        console.log(t.detail.target.dataset);
        var a = t.detail.target.dataset, e = a.graphicUrl, i = a.redirectId, o = a.redirectPath, d = a.articId;
        d === this.data.recommandList[0].id ? (getApp().globalData.is_show += 1, getApp().globalData.is_show_all += 1) : getApp().globalData.is_show = 0;
        try {
            w(t);
        } catch (t) {
            console.log(t);
        }
        i && o || wx.redirectTo({
            url: e
        }), wx.request({
            url: g,
            method: "POST",
            data: {
                method: "artic",
                action: "setCount",
                token: this.data.token,
                artic_id: d,
                tbl: u
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log("两个推荐列表统计:", t);
            }
        });
    },
    _controlAdEvent: function(t) {
        this.setData({
            controlAdShow: t.detail
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.loadingMore();
    },
    loadingMore: function() {
        var t = this, a = this.data, e = a.offset, i = a.offsetCount, o = a.offsetLength, s = e[i] ? e[i] : "";
        i >= o ? this.setData({
            emptyTips: "暂时没有了喔"
        }) : wx.request({
            url: f,
            method: "GET",
            data: {
                count: this.data.count,
                offset: s,
                tbl: u
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                console.log("get recommand more", a), e || t.setData({
                    offset: a.data.pageArr,
                    offsetLength: Object.keys(a.data.pageArr).length,
                    count: 6
                }), a.data.data.map(function(t) {
                    t.sinceTime = d(t.time);
                }), t.data.adIndex === t.data.adselfList.length - 1 && t.setData({
                    adIndex: 0
                });
                var i = t.data.recommandList, o = t.data.adselfList[t.data.adIndex], s = [];
                s.push({
                    adSelf: o,
                    show: !1
                }), i = i.concat(s).concat(a.data.data);
                var n = t.data.offsetCount + 1, r = t.data.adIndex + 1;
                t.setData({
                    offsetCount: n,
                    recommandList: i,
                    adIndex: r
                });
            },
            fail: function(t) {
                console.log("fail get recommand more");
            }
        });
    },
    getCommentList: function() {
        D(this, 1, 2);
    },
    like: function(t) {
        T(this, t);
    },
    adCount: function(t) {
        var e = t.currentTarget.dataset.id;
        "ad1" == e ? a.Event.stat("ad_graphic_1") : "ad2" == e ? a.Event.stat("ad_graphic_2") : a.Event.stat("ad_graphic_3");
    },
    bindAderror: function(a) {
        var e = a.detail.errCode, i = a.target.dataset.id;
        if (i === this.data.adId[1] && this.setData({
            adSelfFirst: !0
        }), i === this.data.adId[2] && this.setData({
            adSelfSecond: !0
        }), I.setAdErrorCodes({
            error_code: e,
            ad_id: i
        }), i === this.data.adId[3]) {
            var o = a.currentTarget.dataset.key;
            this.setData(t({}, "recommandList[" + o + "].show", !0));
        }
    },
    adSuccess: function(t) {
        var a = t.target.dataset.id;
        I.setaddAdSuccessCount({
            ad_id: a
        });
    },
    addZyAdSuccess: function(t) {
        var a = t.detail;
        I.addZyAdSuccess({
            ad_id: a
        });
    }
});