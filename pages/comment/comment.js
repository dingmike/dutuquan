var t = require("../../utils/like.js").deleteCommentData, e = require("../../utils/newApi/api.js").sendComment;

Page({
    data: {
        userInfo: {
            avatarUrl: "../../assets/moren.png",
            nickName: "匿名"
        },
        commentData: [ 1, 2, 3 ],
        myCommentData: [],
        commentInfo: "",
        commentBtnText: "留言",
        formId: "",
        loading: !1,
        disabled: !1,
        id: "",
        token: "",
        title: "",
        noteNowLen: 0,
        noteMaxLen: 150
    },
    onLoad: function(t) {
        var e = t.id, a = t.title, n = t.token;
        this.setData({
            id: e,
            token: n,
            title: a
        });
    },
    comment: function() {
        var t = this, a = this.data.commentInfo.replace(/\s+/g, "");
        if (a) {
            var n = this.data, o = n.userInfo, i = n.id, s = n.title;
            this.setData({
                loading: !0,
                disabled: !0,
                commentBtnText: "留言中..."
            }), e({
                comment: a,
                formId: this.data.formId,
                username: o.nickName,
                avatarUrl: o.avatarUrl,
                artic_id: i,
                artic_title: s
            }).then(function(e) {
                if (console.log("留言结果:", e), 1 === e.data.resultCode) {
                    wx.showToast({
                        title: "已留言"
                    });
                    var n = {
                        username: o.nickName,
                        comment: a,
                        commentId: e.data.id,
                        avatarUrl: o.avatarUrl
                    }, i = t.data.myCommentData;
                    i.push(n), t.setData({
                        myCommentData: i
                    });
                }
                t.setData({
                    loading: !1,
                    disabled: !1,
                    commentBtnText: "留言"
                });
            }).catch(function(e) {
                t.setData({
                    loading: !1,
                    disabled: !1,
                    commentBtnText: "留言"
                }), console.log("留言err", e);
            });
        }
    },
    deleteComment: function(e) {
        var a = e.currentTarget.dataset, n = a.commentId, o = a.index;
        t(this, n, o);
    },
    bindTextAreaChange: function(t) {
        var e = t.detail.value, a = parseInt(e.length);
        a > this.data.noteMaxLen || this.setData({
            commentInfo: e,
            noteNowLen: a
        });
    },
    getCode: function(t) {
        wx.login({
            success: function(e) {
                t && e.code && t(e.code);
            }
        });
    },
    getFormId: function(t) {
        this.setData({
            formId: t.detail.formId
        });
    },
    getUserInfo: function(t) {
        var e = t.detail.userInfo || this.data.userInfo;
        console.log("es", t), this.setData({
            userInfo: e
        }), this.data.userInfo.gender ? this.comment() : console.log("用户拒绝授权");
    },
    onShareAppMessage: function() {}
});