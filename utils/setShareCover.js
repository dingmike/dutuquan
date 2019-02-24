require("util.js").smallestCommons;

module.exports = {
    setShareCover: function(e, t) {
        console.log("testStep1"), e = e.replace(/http:/, "https:"), console.log("coverUrl:", e), 
        wx.getImageInfo({
            src: e,
            success: function(a) {
                var s = a.width, o = a.height;
                s / o > 1.25 && wx.downloadFile({
                    url: e,
                    success: function(e) {
                        if (200 === e.statusCode) {
                            var a = wx.createCanvasContext("myCanvas");
                            console.log("canvas", a, e.tempFilePath);
                            var n = 300 * s / o;
                            console.log(n, ",", 300, s, o), a.drawImage(e.tempFilePath, (375 - n) / 2, 0, n, 300), 
                            a.draw(!1, function() {
                                wx.canvasToTempFilePath({
                                    x: 0,
                                    y: 0,
                                    width: 375,
                                    height: 300,
                                    drawWidth: 375,
                                    canvasId: "myCanvas",
                                    success: function(e) {
                                        console.log(e.tempFilePath), t.setData({
                                            cover: e.tempFilePath
                                        });
                                    }
                                });
                            });
                        }
                    }
                }), s / o < 1.25 && wx.getSystemInfo({
                    success: function(a) {
                        var n = new RegExp("iPhone", "g"), c = new RegExp("iPad", "g");
                        n.test(a.model) || c.test(a.model) || wx.downloadFile({
                            url: e,
                            success: function(e) {
                                if (200 === e.statusCode) {
                                    var a = wx.createCanvasContext("myCanvas");
                                    console.log("canvas", a, e.tempFilePath);
                                    var n = 375 * o / s;
                                    a.drawImage(e.tempFilePath, 0, (300 - n) / 2, 375, n), a.draw(!1, function() {
                                        wx.canvasToTempFilePath({
                                            x: 0,
                                            y: 0,
                                            width: s,
                                            height: o,
                                            drawWidth: 375,
                                            drawHeight: n,
                                            canvasId: "myCanvas",
                                            success: function(e) {
                                                t.setData({
                                                    cover: e.tempFilePath
                                                });
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }
};