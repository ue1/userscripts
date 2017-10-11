// ==UserScript==
// @name Steam评分百分比
// @description 显示Steam评分(好评如潮位置)百分比
// @namespace https://github.com/ue1/userscripts
// @version 1.0.0
// @run-at document-end
// @require https://cdn.bootcss.com/jquery/3.1.1/jquery.min.js
// @include http*://store.steampowered.com*
// @include http*://steamcommunity.com*
// @exclude *://store.steampowered.com/widget*
// @exclude *://store.steampowered.com/checkout*
// @compatible chrome
// @grant none
// ==/UserScript==
(function () {
    'use strict';
    var text = "game_review_summary";
    $("." + text).html(function () {
        var rate = $(this), pos = rate.closest("[data-store-tooltip]").data("storeTooltip").match(/(\d+)%/)[1];
        rate.after('<span class="' + text + ' positive">' + pos + '%</span>/<span class="' + text + ' negative">' + (100 - pos) + '%</span>');
        return rate.html();
    });
})();