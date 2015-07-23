$(function () {
    "use strict";
    var news,
        data = newsData2();
   // try {
        news = new News(data);
        $(window).resize($.proxy(news.updateAfterBrowserResize, news));
  //  } catch (e) {
       // console.error("Game.init failed: " + e.message, e);
    //}
});