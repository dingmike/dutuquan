Component({
    properties: {
        isLoading: {
            type: Boolean,
            value: !1,
            observer: function(e, o) {}
        }
    },
    data: {
        tId: {},
        rotate: 0
    },
    methods: {
        refreshClick: function() {
            console.log(222222, 33), this.triggerEvent("ClickToRefresh");
        }
    }
});