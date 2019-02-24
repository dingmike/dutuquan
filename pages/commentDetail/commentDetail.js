var e = require("../../utils/like.js"), t = e.likeRecommend, a = e.getCommentData, n = require("../../utils/newApi/api.js"), o = (n.getCommentDetail, 
n.replyLike);

Page({
    data: {
        userInfo: {
            avatarUrl: "../../assets/moren.png",
            nickName: "匿名"
        },
        id: "",
        title: "",
        token: "",
        page: 1,
        pageindex: 10,
        totalPage: 1,
        noData: !1,
        commentData: [],
        special_comments: [],
        commentDataAll: ""
    },
    onLoad: function(e) {
        this.setData({
            id: e.id,
            title: e.title,
            token: e.token
        }), this.getCommentList();
    },
    getCommentList: function() {
        var e = this.data, t = e.page, n = e.pageindex;
        a(this, t, n);
    },
    like: function(e) {
        t(this, e);
    },
    replyLike: function(e) {
        var t = e.currentTarget.dataset, a = t.index, n = t.reIndex, s = t.id, i = this.data.commentData;
        i[a].response[n].like ? (i[a].response[n].like = !1, i[a].response[n].good = 1 * i[a].response[n].good - 1, 
        o({
            id: s,
            count: -1
        })) : (i[a].response[n].like = !0, i[a].response[n].good = 1 * i[a].response[n].good + 1, 
        o({
            id: s,
            count: 1
        })), this.setData({
            commentData: i
        });
    },
    getUserInfo: function(e) {
        console.log(e);
        var t = e.detail.userInfo || this.data.userInfo, a = e.currentTarget.dataset, n = a.name, o = a.commentId, s = a.toOpenid, i = a.toUser;
        this.setData({
            userInfo: t
        }), this.data.userInfo.gender ? this.selectComponent("#comment-input").isShowReply(!0, n, o, s, i, t) : console.log("用户拒绝授权");
    },
    onReachBottom: function() {
        this.data.page > this.data.totalPage ? this.setData({
            noData: !0
        }) : this.getCommentList();
    },
    onShareAppMessage: function() {}
});