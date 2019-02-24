var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}, e = function(e) {
    var n = new Date(parseInt(e));
    return n.getMonth() + 1 + "月" + t(n.getDate()) + "日 " + t(n.getHours()) + ":" + t(n.getMinutes());
};

module.exports = {
    formatTime: e,
    since: function(t) {
        if (isNaN(parseInt(t))) return "暂无";
        var n = Date.now() - t;
        return n < 36e5 ? Math.ceil(n / 1e3 / 60) + "分钟前" : n < 864e5 ? Math.floor(n / 1e3 / 60 / 60) + "小时前" : e(t);
    },
    getDateStr: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e = new Date(Date.now() + 24 * t * 60 * 60 * 1e3), n = e.getFullYear(), r = e.getMonth() + 1, a = e.getDate();
        return n + "-" + (r < 10 ? "0" + r : r) + "-" + (a < 10 ? "0" + a : a);
    }
};