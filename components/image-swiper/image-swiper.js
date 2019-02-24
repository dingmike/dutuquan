Component({
    properties: {
        imgList: {
            type: Array,
            value: [],
            observer: function(t, e) {
                this.setData({
                    activeText: t[0] ? t[0].text : ""
                });
            }
        }
    },
    data: {
        activeText: "",
        previewImgList: [],
        swiperIndex: 0,
        sliderIndex: 0,
        tId: {}
    },
    methods: {
        _showImage: function() {
            var t = [];
            this.data.previewImgList.length ? t = this.data.previewImgList : (t = this.properties.imgList.map(function(t) {
                return t.url;
            }), this.setData({
                previewImgList: t
            })), wx.previewImage({
                current: this.properties.imgList[this.data.sliderIndex].url,
                urls: t,
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        },
        _swiperChange: function(t) {
            console.log("swiper change");
            var e = t.detail, i = this;
            if (this.setData({
                sliderIndex: e.current
            }), e.current !== this.data.imgList.length) {
                var s = this.data.imgList[e.current].text;
                "" !== s && this.setData({
                    activeText: s
                });
            } else setTimeout(function() {
                i.triggerEvent("SlideToLast");
            }, 1500);
        },
        _sliderChange: function(t) {
            console.log("slider change");
            var e = t.detail.value;
            this.setData({
                swiperIndex: e
            });
        },
        _sliderChanging: function(t) {
            console.log("slider changing");
            var e = t.detail.value, i = this;
            clearTimeout(i.data.tId), i.setData({
                tId: setTimeout(function() {
                    i.setData({
                        swiperIndex: e
                    });
                }, 0)
            });
        }
    }
});