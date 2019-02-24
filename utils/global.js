var p = "https://crazywednesday.top/";

module.exports = {
    version: "2.0.0.3",
    appName: "yuetu",
    appCNName: "阅图Lite",
    url: p,
    getUrl: p + "/api/get.php",
    getUrl2: p + "/api/get/selectAll.php",
    getGraphicUrl: p + "/apiV2/get/selectOne.php",
    getRandomMore: p + "/api/get/randomMore.php",
    getRankingsUrl: p + "/apiV2/get/rankings.php",
    getCommentUrl: p + "apiV2/app/common/get_new.php",
    postCommentUrl: p + "/apiV2/comment/index_yuetu.php",
    postCommonUrl: p + "/apiV2/app/common/post_new.php",
    getCommonUrl: p + "/apiV2/app/common/get_new.php",
    getTokenUrl: p + "/apiV2/get/getToken.php",
    checkTokenUrl: p + "/apiV2/get/checkToken.php",
    dbname: "WechatApp",
    tbl: "graphic_tbl"
};