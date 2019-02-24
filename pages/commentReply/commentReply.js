function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = require("../../utils/like.js"), a = e.likeRecommend, n = (e.getcommentDataReply, 
require("../../utils/newApi/api.js")), o = (n.wxLogin, n.sendComment, n.sendCommentReply, 
n.getCommentReplyDetail), i = n.replyLike;

Page({
    data: {
        userInfo: {
            avatarUrl: "../../assets/moren.png",
            nickName: "匿名"
        },
        id: "",
        title: "",
        commentId: "",
        page: 1,
        pageindex: 10,
        totalPage: 1,
        noData: !1,
        count: "",
        commentDataReply: [],
        commentData: [],
        commentDataReplyAll: ""
    },
    onLoad: function(t) {
        this.setData({
            id: t.articId,
            commentId: t.commentId,
            title: t.title
        }), this.getCommentList();
    },
    getCommentList: function() {
        var e = this, a = this.data, n = a.page, i = a.pageindex;
        o({
            artic_id: this.data.id,
            comment_id: this.data.commentId,
            page: n,
            pageindex: i
        }).then(function(a) {
            if (console.log("detailReply", a), 1 === a.data.resultCode) {
                var n = [ a.data.comment ], o = (wx.getStorageSync("likeRecommend") || []).findIndex(function(t) {
                    return e.data.id == t.articleId && e.data.commentId == t.commentId;
                });
                -1 === o || (n[o].like = !0), e.setData({
                    totalPage: a.data.totalPage,
                    page: e.data.page + 1,
                    commentData: n,
                    commentDataReply: [].concat(t(e.data.commentDataReply), t(a.data.data)),
                    count: a.data.count
                });
                var i = a.data.comment;
                e.selectComponent("#comment-input").isShowReply(!1, i.username, e.data.commentId, i.to_openid, i.username);
            }
        });
    },
    like: function(t) {
        a(this, t);
    },
    replyLike: function(t) {
        var e = t.currentTarget.dataset, a = e.index, n = e.id, o = this.data.commentDataReply;
        o[a].like ? (o[a].like = !1, o[a].good = 1 * o[a].good - 1, i({
            id: n,
            count: -1
        })) : (o[a].like = !0, o[a].good = 1 * o[a].good + 1, i({
            id: n,
            count: 1
        })), this.setData({
            commentDataReply: o
        });
    },
    getUserInfo: function(t) {
        console.log(t);
        var e = t.detail.userInfo || this.data.userInfo, a = t.currentTarget.dataset, n = a.name, o = a.commentId, i = a.toOpenid, m = a.toUser;
        this.setData({
            userInfo: e
        }), this.data.userInfo.gender ? this.selectComponent("#comment-input").isShowReply(!0, n, o, i, m, e) : console.log("用户拒绝授权");
    },
    onReachBottom: function() {
        this.data.page > this.data.totalPage ? this.setData({
            noData: !0
        }) : this.getCommentList();
    },
    onShareAppMessage: function() {}
});