// ==UserScript==
// @name Steam评分百分比
// @description 显示Steam评分(好评如潮位置)百分比
// @namespace https://github.com/ue1/userscripts
// @version 1.0.1
// @run-at document-end
// @include http*://store.steampowered.com*
// @include http*://steamcommunity.com*
// @exclude *://store.steampowered.com/widget*
// @exclude *://store.steampowered.com/checkout*
// @compatible chrome
// @grant none
// ==/UserScript==
(function () {
    'use strict';
    var rate = "game_review_summary";
    var tips = "data-store-tooltip";
    var span = document.getElementsByTagName("span");
    for(var i = 0; i < span.length; i++) {
        var item = span[i];
        if(item.className.indexOf(rate) != -1) {
            var attr = item.getAttribute(tips);
            if(!attr) {
                attr = item.parentNode.parentNode.getAttribute(tips);
            }
            if(attr) {
                var pos = attr.match(/(\d+)%/)[1];
                item.innerHTML += ' <span class="' + item.className + '">' + pos + '%</span><span class="' + rate + ' no_reviews">/</span><span class="' + rate + ' negative">' + (100 - pos) + '%</span>';
            }
        }
    }
})();
