function t(t, e, n) {
    (0, o.validation)(function(o) {
        wx.request({
            url: a.postCommonUrl,
            method: "POST",
            data: {
                method: "comment",
                action: "setGood",
                token: o,
                artic_id: e,
                id: t,
                appName: a.appName,
                count: n
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                1 === t.data.resultCode && console.log("like result:", t);
            },
            fail: function(t) {
                console.log("fail get recommandList");
            }
        });
    });
}

var a = require("./global.js"), e = require("./newApi/api.js"), o = require("./validation.js"), n = function(t) {
    return new Promise(function(a, e) {
        wx.getStorage({
            key: t,
            success: a,
            fail: e
        });
    });
}, c = function(t, a) {
    return new Promise(function(e, o) {
        wx.setStorage({
            key: t,
            data: a,
            success: e,
            fail: o
        });
    });
};

module.exports = {
    getCommentData: function(t, o, n) {
        wx.request({
            url: e.commonGetUrl,
            method: "GET",
            data: {
                appName: a.appName,
                method: "comment",
                action: "getCommentV2",
                token: t.data.token,
                artic_id: t.data.id,
                page: o,
                pageindex: n
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                if (1 === a.data.resultCode) {
                    var e = wx.getStorageSync("likeRecommend") || [], o = a.data.data;
                    if (2 !== n) {
                        var c = a.data.special_comments.map(function(t) {
                            return t.id;
                        });
                        o = o.filter(function(t) {
                            return !c.includes(t.id);
                        });
                    }
                    e.map(function(e) {
                        var o = a.data.special_comments.findIndex(function(a) {
                            return t.data.id == e.articleId && a.id == e.commentId;
                        });
                        return -1 != o && (a.data.special_comments[o].like = !0), e;
                    }), e.map(function(a) {
                        var e = o.findIndex(function(e) {
                            return t.data.id == a.articleId && e.id == a.commentId;
                        });
                        return -1 != e && (o[e].like = !0), a;
                    });
                    var m = 2 === n ? o : t.data.commentData.concat(o);
                    t.setData({
                        commentData: m,
                        special_comments: a.data.special_comments,
                        totalPage: a.data.totalPage,
                        commentDataAll: a.data.all_comment_count,
                        page: t.data.page + 1
                    });
                } else t.setData({
                    commentDataAll: 0
                });
            },
            fail: function(t) {
                console.log("fail get recommandList");
            }
        });
    },
    likeRecommend: function(a, e) {
        var o = e.currentTarget.dataset, m = o.index, i = o.id, d = o.special, l = a.data.id, s = {
            articleId: l,
            commentId: i
        };
        n("likeRecommend").then(function(e) {
            var o = e.data.findIndex(function(t) {
                return t.articleId == l && t.commentId == i;
            });
            if (-1 != o) {
                e.data.splice(o, 1), wx.setStorageSync("likeRecommend", e.data);
                var n = d ? a.data.special_comments : a.data.commentData;
                n[m].like = !1, n[m].good = 1 * n[m].good - 1, d ? a.setData({
                    special_comments: n
                }) : a.setData({
                    commentData: n
                }), console.log("index", m), console.log("this.data.commentData", a.data.commentData), 
                t(i, l, -1);
            } else {
                e.data.length >= 50 && e.data.pop(), e.data.unshift(s), c("likeRecommend", e.data);
                var r = d ? a.data.special_comments : a.data.commentData;
                r[m].like = !0, r[m].good = 1 * r[m].good + 1, d ? a.setData({
                    special_comments: r
                }) : a.setData({
                    commentData: r
                }), t(i, l, 1);
            }
        }).catch(function(e) {
            c("likeRecommend", [ s ]);
            var o = d ? a.data.special_comments : a.data.commentData;
            o[m].like = !0, o[m].good = 1 * o[m].good + 1, d ? a.setData({
                special_comments: o
            }) : a.setData({
                commentData: o
            }), t(i, l, 1);
        });
    },
    deleteCommentData: function(t, e, o) {
        wx.request({
            url: a.postCommonUrl,
            method: "POST",
            data: {
                appName: a.appName,
                method: "comment",
                action: "deleteComment",
                token: t.data.token,
                artic_id: t.data.id,
                id: e
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                if (1 === a.data.resultCode) {
                    var e = t.data.myCommentData;
                    e.splice(o, 1), t.setData({
                        myCommentData: e
                    }), wx.showToast({
                        title: "已删除"
                    });
                }
            },
            fail: function(t) {
                console.log("fail to delete");
            }
        });
    }
};