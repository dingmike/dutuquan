Component({
    data: {
        activeStyle: "color:red",
        indexActive: !1,
        navigationActive: !1,
        rankingsActive: !1,
        gamesActive: !1,
        favouritesActive: !1
    },
    ready: function() {
        var t = this, e = {};
        e[[ "index", "navigation", "rankings", "games", "favourites" ].find(function(e) {
            return t.checkRoute(e);
        }) + "Active"] = !0, this.setData(e);
    },
    methods: {
        checkRoute: function(t) {
            var e = getCurrentPages(), n = e[e.length - 1].route;
            return new RegExp(t).test(n);
        },
        navigationTo: function(t) {
            var e = t.currentTarget.dataset, n = e.navkey, i = e.navurl;
            this.checkRoute(n) || wx.redirectTo({
                url: i
            });
        }
    }
});