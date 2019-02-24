var t = require("../../utils/util.js").since, e = require("../../utils/global.js"), i = e.version, a = e.appCNName, s = require("../../utils/appConfigHandle.js").getAppConfig;

Page({
    data: {
        version: i,
        currentTag: "favourite",
        favourites: [],
        historyGraphics: [],
        adControl: {
            1: "off",
            2: "off"
        }
    },
    onLoad: function() {
        this.getFavourites(), this.setTitle(), this.adConfig();
    },
    onShareAppMessage: function(t) {
        var e = t.target.dataset, i = e.path, s = void 0 === i ? "/pages/index/index" : i, o = e.cover, r = void 0 === o ? null : o, n = e.title;
        return {
            title: void 0 === n ? a : n,
            path: s,
            imageUrl: r
        };
    },
    setTitle: function() {
        wx.setNavigationBarTitle({
            title: a + " - 我的收藏"
        });
    },
    deleteFavourite: function(t) {
        var e = this, i = t.currentTarget.dataset.id, a = this.data.favourites, s = a.findIndex(function(t) {
            return t.id == i;
        });
        wx.showModal({
            title: "收藏删除提示",
            content: "是否删除该文章",
            success: function(t) {
                t.confirm && (a.splice(s, 1), wx.setStorage({
                    key: "favourites",
                    data: a,
                    success: function() {
                        console.log("delete favourites success"), e.setData({
                            favourites: a
                        });
                    }
                }));
            }
        });
    },
    getFavourites: function() {
        var e = this;
        wx.getStorage({
            key: "favourites",
            success: function(i) {
                e.setData({
                    favourites: i.data.map(function(e) {
                        return e.sinceTime = t(e.time), e;
                    })
                });
            }
        });
    },
    getHistoryGraphics: function() {
        var t = this;
        wx.getStorage({
            key: "historyGraphics",
            success: function(e) {
                t.setData({
                    historyGraphics: e.data
                });
            }
        });
    },
    adConfig: function() {
        var t = this;
        s(function(e) {
            var i = e.adControl;
            if (i) {
                var a = JSON.parse(i).favourites, s = void 0 === a ? t.data.adControl : a;
                console.log("favourites page ad", s), t.setData({
                    adControl: s
                });
            }
        });
    }
});