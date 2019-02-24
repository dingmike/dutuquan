var e = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, t = function(t) {
    var r = new Date(parseInt(t));
    return r.getMonth() + 1 + "月" + e(r.getDate()) + "日 " + e(r.getHours()) + ":" + e(r.getMinutes());
};

module.exports = {
    formatDate: function(t) {
        var r = new Date(parseInt(t));
        return r.getFullYear() + "年" + e(r.getMonth() + 1) + "月" + e(r.getDate()) + "日";
    },
    formatTime: t,
    since: function(e) {
        if (isNaN(parseInt(e))) return "暂无";
        var r = Date.now() - e;
        return r < 36e5 ? Math.ceil(r / 1e3 / 60) + "分钟前" : r < 864e5 ? Math.floor(r / 1e3 / 60 / 60) + "小时前" : t(e);
    },
    getDateStr: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = new Date(Date.now() + 24 * e * 60 * 60 * 1e3), r = t.getFullYear(), a = t.getMonth() + 1, n = t.getDate();
        return r + "-" + (a < 10 ? "0" + a : a) + "-" + (n < 10 ? "0" + n : n);
    },
    formatSeconds: function(e) {
        var t = parseInt(e), r = 0, a = 0;
        t > 60 && (r = parseInt(t / 60), t = parseInt(t % 60), r > 60 && (a = parseInt(r / 60), 
        r = parseInt(r % 60)));
        var n = parseInt(t) >= 10 ? "00:" + parseInt(t) : "00:0" + parseInt(t);
        if (r > 0) {
            var p = parseInt(t) >= 10 ? parseInt(t) : "0" + parseInt(t);
            n = (parseInt(r) >= 10 ? parseInt(r) : "0" + parseInt(r)) + ":" + p;
        }
        if (a > 0) {
            var s = parseInt(t) >= 10 ? parseInt(t) : "0" + parseInt(t), i = parseInt(r) >= 10 ? parseInt(r) : "0" + parseInt(r);
            n = "0" + (parseInt(a) >= 10 ? parseInt(a) : "0parseInt(theTime2)") + ":" + i + ":" + s;
        }
        return n;
    },
    formatString: function(e) {
        return e.replace(/@m/g, "max-width:100%").replace(/@b/g, "box-sizing:border-box").replace(/@c/g, "color:rgb").replace(/@a/g, "background-color:").replace(/@s/g, "style=").replace(/@p/g, "padding").replace(/@r/g, "margin").replace(/@f/g, "font-").replace(/@e/g, "width:100%;height:auto").replace(/@j/g, "https://mmbiz.qpic.cn/mmbiz_jpg/").replace(/@n/g, "https://mmbiz.qpic.cn/mmbiz_png/").replace(/@g/g, "https://mmbiz.qpic.cn/mmbiz_gif/");
    }
};