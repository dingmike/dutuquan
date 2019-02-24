var t = require("../../utils/newApi/api.js"), e = (t.wxLogin, t.sendComment), n = t.sendCommentReply;

Component({
    properties: {
        articId: {
            type: String,
            value: "0",
            observer: function(t, e) {
                this.setData({
                    id: t
                });
            }
        },
        title: {
            type: String,
            value: "0",
            observer: function(t, e) {
                this.setData({
                    title: t
                });
            }
        }
    },
    data: {
        userInfo: {
            avatarUrl: "../../assets/moren.png",
            nickName: "匿名"
        },
        commentId: "",
        toOpenid: "",
        toUser: "",
        id: "",
        title: "",
        name: "",
        focus: !1,
        inputValue: "",
        commentInfo: ""
    },
    methods: {
        send: function(t) {
            var e = this.data.commentInfo.replace(/\s+/g, ""), n = t.detail.formId;
            e && (this.data.name ? this.sendCommentReply(n) : this.sendComment(n));
        },
        sendComment: function(t) {
            var n = this;
            e({
                formId: t,
                comment: this.data.commentInfo,
                username: this.data.userInfo.nickName,
                avatarUrl: this.data.userInfo.avatarUrl,
                artic_id: this.data.id,
                artic_title: this.data.title
            }).then(function(t) {
                console.log("留言成功:", t), 1 === t.data.resultCode && (wx.showToast({
                    title: "已留言"
                }), n.setData({
                    inputValue: "",
                    commentInfo: ""
                }), n.hiddenReply());
            }).catch(function(t) {
                console.log("留言err", t);
            });
        },
        sendCommentReply: function(t) {
            var e = this;
            n({
                formId: t,
                comment_id: this.data.commentId,
                comment: this.data.commentInfo,
                username: this.data.userInfo.nickName,
                avatarUrl: this.data.userInfo.avatarUrl,
                artic_id: this.data.id,
                artic_title: this.data.title,
                to_user: this.data.toUser,
                to_openid: this.data.toOpenid
            }).then(function(t) {
                console.log("回复留言成功:", t), 1 === t.data.resultCode && (wx.showToast({
                    title: "已留言"
                }), e.setData({
                    inputValue: "",
                    commentInfo: ""
                }), e.hiddenReply());
            }).catch(function(t) {
                console.log("回复留言err", t);
            });
        },
        isShowReply: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "", o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "", i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "";
            console.log("name", e), this.setData({
                focus: t,
                name: e
            }), (i || n) && this.setData({
                userInfo: i,
                commentId: n,
                toOpenid: a,
                toUser: o
            });
        },
        hiddenReply: function() {
            this.isShowReply(!1);
        },
        bindfocus: function() {
            var t = this;
            setTimeout(function() {
                t.data.userInfo.gender || wx.hideKeyboard();
            }, 1e3);
        },
        bindinput: function(t) {
            var e = t.detail.value;
            this.setData({
                commentInfo: e
            });
        },
        getUserInfo: function(t) {
            var e = t.detail.userInfo || this.data.userInfo;
            this.setData({
                userInfo: e
            }), this.data.userInfo.gender ? this.isShowReply(!0, this.data.name) : console.log("用户拒绝授权");
        }
    }
});