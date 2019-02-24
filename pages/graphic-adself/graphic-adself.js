var t = require("../../utils/util.js"), e = t.formatDate, a = t.formatTime, i = (t.since, 
t.getDateStr, t.formatSeconds), s = t.formatString, o = require("../../utils/global.js"), r = o.version, n = o.tbl, d = (o.getUrl, 
o.getGraphicUrl), u = (o.getRandomMore, require("../../utils/formIdHandle.js")), h = u.getFormId, c = (u.setFormId, 
u.formIdHandle), l = (require("../../utils/appConfigHandle.js").getAppConfig, require("../../utils/validation.js").validation), g = require("../../utils/setShareCover.js").setShareCover, f = (require("../../utils/classInfo.js"), 
require("../../utils/qyStat/qy-stat.js"), require("../../utils/like.js")), m = (f.likeRecommend, 
f.getCommentData, require("../../utils/newApi/api.js"));

Page({
    data: {
        is_share: "",
        updatedTime: "",
        audioLength: "",
        currentTime: "00:00",
        totalTime: "04:10",
        music_src: "",
        vid: "",
        music_title: "",
        isPlaying: !0,
        sliderValue: 0,
        audio_progress: !0,
        controlAdShow: "on",
        version: r,
        id: 0,
        time: 0,
        title: "",
        cover: "",
        count: 5,
        graphicType: "1",
        typography: "left",
        nodeList: [],
        nodeListLength: 0,
        previewImg: [],
        recommandList: [],
        commentData: [],
        commentDataAll: 0,
        offset: 0,
        offsetCount: 0,
        offsetLength: 10,
        emptyTips: "",
        adControl: {
            1: "off",
            2: "off",
            3: "off"
        },
        classType: "",
        windowHeight: 0,
        graphicHeight: 0,
        hasReaded: "0%",
        shareTipsShow: !1,
        is_share_on_show: !1,
        adselfList: [],
        adSelfFirst: !1,
        adSelfSecond: !1,
        adSelfThird: !1,
        adIndex: 0,
        adSelfControl: {},
        bg_url: "",
        isPlay: !0,
        audioCurrentTime: 0,
        audioShow: !0,
        font_color: "",
        ad_info: {}
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中"
        });
        var e = this;
        l(function(a) {
            e.setData({
                token: a
            }), e.get_ad_info(), e.getGraphic(t, a);
            try {
                h(c);
            } catch (t) {
                console.log(t);
            }
        });
    },
    preventTouchMove: function() {},
    closeShareTip: function() {
        this.setData({
            shareTipsShow: !1
        });
    },
    onShow: function() {
        var t = this;
        this.data.token && this.data.id;
        this.data.isPlay ? (this.audioCtx = wx.createAudioContext("myAudio"), this.audioCtx.play(), 
        setTimeout(function(e) {
            t.audioCtx.seek(t.data.audioCurrentTime);
        }, 3e3)) : this.audioPause(), this.data.is_share_on_show && this.setData({
            shareTipsShow: !0
        }), this.setData({
            is_share_on_show: !1,
            audioShow: !0
        });
    },
    onHide: function() {
        this.setData({
            audioCurrentTime: this.data.audioCurrentTime,
            audioShow: !1
        });
    },
    onReady: function() {
        var t = this;
        wx.onUserCaptureScreen(function(e) {
            m.blackList({
                id: t.data.id
            });
        });
    },
    onPageScroll: function(t) {
        this.recordReadingExtent(t);
    },
    recordReadingExtent: function(t) {
        var e = this;
        if (this.data.graphicHeight) {
            var a = t.scrollTop + this.data.windowHeight, i = "0%";
            a > .25 * this.data.graphicHeight && (i = "25%"), a > .5 * this.data.graphicHeight && (i = "50%"), 
            a > .75 * this.data.graphicHeight && (i = "75%"), a > this.data.graphicHeight && (i = "100%"), 
            Number(i.replace(/%/g, "")) > Number(this.data.hasReaded.replace(/%/g, "")) && this.setData({
                hasReaded: i
            });
        } else {
            try {
                var s = wx.getSystemInfoSync();
                this.setData({
                    windowHeight: s.windowHeight
                });
            } catch (t) {
                console.error(t);
            }
            wx.createSelectorQuery().select(".graphic-content").boundingClientRect(function(t) {
                var a = t.height;
                e.setData({
                    graphicHeight: a
                });
            }).exec();
        }
    },
    get_ad_info: function() {
        var t = JSON.parse(wx.getStorageSync("ad_info"));
        t.type = "1", t.fromPage = !0, this.setData({
            ad_info: t
        });
    },
    ctrlAudio: function() {
        var t = this, e = !0;
        this.data.isPlay ? (this.audioPause(), e = !1) : (this.audioCtx.play(), setTimeout(function(e) {
            t.audioCtx.seek(t.data.audioCurrentTime);
        }, 1e3)), this.setData({
            isPlay: e
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
        return this.setData({
            is_share_on_show: !0
        }), {
            title: this.data.title,
            imageUrl: this.data.cover,
            path: "pages/index/index?id=" + this.data.id
        };
    },
    getGraphic: function(t, o) {
        var r = t.id, u = this;
        wx.request({
            url: d,
            method: "GET",
            data: {
                token: o,
                id: r,
                tbl: n
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t);
                var n = t.data, d = n.className, h = (n.classId, n.title), c = n.content, l = n.time, f = n.vid, m = n.is_share, p = n.cover, w = n.typography, y = void 0 === w ? "left" : w, _ = n.bg_url, v = n.font_color, x = "";
                switch (t.data.type) {
                  case "1":
                    x = JSON.parse('{ "arr": ' + c + " }").arr;
                    break;

                  case "2":
                    x = s(c);
                    break;

                  default:
                    x = c;
                }
                u.setData({
                    nodeList: x,
                    graphicType: t.data.type
                }, function() {
                    wx.hideLoading();
                }), "0" === m ? wx.hideShareMenu() : wx.showShareMenu(), u.setData({
                    api2: t.data.api2,
                    api2_status: t.data.api2_status,
                    classType: d,
                    updatedTime: e(l),
                    id: r,
                    token: o,
                    is_share: m,
                    title: h,
                    nodeListLength: Math.floor(x.length / 2),
                    typography: y,
                    sinceTime: a(l),
                    time: l,
                    cover: p,
                    bg_url: _,
                    font_color: v,
                    audioLength: t.data.music_time,
                    totalTime: i(t.data.music_time),
                    music_src: t.data.music_url,
                    vid: f,
                    music_title: t.data.music_title
                }), setTimeout(wx.hideLoading, 500), g(p, u);
            }
        });
    },
    showPreviewImage: function(t) {
        var e = [], a = t.currentTarget.dataset.imgurl;
        this.data.previewImg.length ? e = this.data.previewImg : (e = this.data.nodeList.filter(function(t) {
            return t.url;
        }).map(function(t) {
            return t.url;
        }), this.setData({
            previewImg: e
        })), wx.previewImage({
            current: a,
            urls: e
        });
    },
    addZyAdSuccess: function(t) {
        var e = t.detail;
        m.addZyAdSuccess({
            ad_id: e
        });
    },
    home: function() {
        1 === getCurrentPages().length ? wx.redirectTo({
            url: "/pages/index/index"
        }) : wx.navigateBack();
    }
});