Component({
    properties: {
        content: {
            type: String
        }
    },
    data: {
        contentOne: []
    },
    methods: {
        getGraphic: function() {
            for (var t = this.properties.content, e = JSON.parse(t), r = /([^/]+)$/, i = 0; i < e.length; i++) {
                if ("img" == e[i].type) {
                    var p = e[i].src;
                    if (-1 != p.indexOf("http://mmbiz.qpic.cn/") || -1 != p.indexOf("https://mmbiz.qpic.cn/")) {
                        a = p.replace(r, "");
                        e[i].src = a;
                    }
                }
                if ("expression_left" == e[i].type || "expression_right" == e[i].type) {
                    var n = e[i].img;
                    if (-1 != n.indexOf("http://mmbiz.qpic.cn/") || -1 != n.indexOf("https://mmbiz.qpic.cn/")) {
                        var a = n.replace(r, "");
                        e[i].img = a;
                    }
                }
            }
            this.dataFunc(e, !0);
            for (var s = [], f = !1, i = 0; i < e.length; i++) {
                if ("text_left" === e[i].type && !1 === f) {
                    f = !0;
                    var c = e[i].url;
                    c = c.replace(/url\(\"/g, "").replace(/\"\)/g, ""), this.setData({
                        speakerName: e[i].name,
                        speakerUrl: c
                    });
                }
                e[i].src && s.push(e[i].src);
            }
            for (i = 0; i < e.length; i++) "img" === e[i].type && (e[i].imgList = s);
            this.setData({
                contentOne: e
            });
        },
        dataFunc: function(t, e) {
            for (var r = 0; r < t.length; r++) t[r].text && (t[r].text = t[r].text.split("<br>")), 
            t[r].flag = "norepeat";
            for (var i = 1; i < t.length; i++) (t[i].type === t[i - 1].type || "text_left" === t[i].type && "expression_left" === t[i - 1].type || "expression_left" === t[i].type && "text_left" === t[i - 1].type || "text_right" === t[i].type && "expression_right" === t[i - 1].type || "expression_right" === t[i].type && "text_right" === t[i - 1].type) && (t[i].flag = "repeat");
            if (!0 === e) {
                for (var p = 0; p < t.length; p++) if (t[p].name && ("text_left" == t[p].type || "expression_left" == t[p].type)) {
                    t[p].firstFlag = "firstLeft";
                    break;
                }
                for (var n = 0; n < t.length; n++) if (t[n].name && ("text_right" == t[n].type || "expression_right" == t[n].type)) {
                    t[n].firstFlag = "firstRight";
                    break;
                }
            }
        },
        previewImg: function(t) {
            var e = t.currentTarget.dataset.src, r = t.currentTarget.dataset.list;
            wx.previewImage({
                current: e,
                urls: r
            });
        }
    },
    attached: function() {
        console.log(9987), this.getGraphic();
    }
});