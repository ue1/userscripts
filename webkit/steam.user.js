// ==UserScript==
// @name        Steam好评百分比
// @namespace   https://github.com/ue1/userscripts
// @version     1.0.3
// @description 评价位置显示 Steam 好评百分比
// @grant       none
// @match       http://store.steampowered.com/*
// @match       https://store.steampowered.com/*
// @match       http://steamcommunity.com/*
// @match       https://steamcommunity.com/*
// @exclude     *://store.steampowered.com/widget*
// @exclude     *://store.steampowered.com/checkout*
// @run-at      document-end
// ==/UserScript==
(function () {
    'use strict';
    const rate = 'game_review_summary';
    const tips = 'data-tooltip-html';
    const span = document.getElementsByTagName('span');
    for (let i = 0; i < span.length; i++) {
        const item = span[i];
        if (item.className.indexOf(rate) !== -1) {
            let attr = item.getAttribute(tips);
            if (!attr) {
                attr = null;
                const upNode = item && item.parentNode && item.parentNode.parentNode;
                // 判断是否有 getAttribute 方法
                if (upNode && typeof upNode.getAttribute === 'function') {
                    attr = upNode.getAttribute(tips);
                }
            }
            if (attr) {
                const pos = attr.match(/(\d+)%/)[1];
                item.innerHTML += ' <span class="' + item.className + '">' + pos + '%</span><span class="' + rate + ' no_reviews">/</span><span class="' + rate + ' negative">' + (100 - pos) + '%</span>';
            }
        }
    }
})();
