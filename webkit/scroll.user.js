// ==UserScript==
// @name        窄边滚动条
// @namespace   https://github.com/ue1/userscripts
// @version     1.0.2
// @description 原始配色8px宽滚动条(适合替换宽的滚动条)
// @grant       none
// @match       http://*/*
// @match       https://*/*
// @run-at      document-start
// ==/UserScript==
(function () {
    'use strict';
    const _tag = "head|body|html".split("|");
    for (let i = 0; i < _tag.length; i++) {
        const _head = document.getElementsByTagName(_tag[i])[0];
        if (!_head) {
            continue;
        }
        const _style = document.createElement('style');
        _style.setAttribute("type", "text/css");
        _style.innerHTML = "::-webkit-scrollbar{width:8px;height:8px;}::-webkit-scrollbar-thumb:hover{background-color:#a8a8a8;}::-webkit-scrollbar-thumb{background-color:#c0c0c0;}::-webkit-scrollbar-track-piece{background-color:#f1f1f1;}::-webkit-scrollbar-thumb:active{background-color:#787878;}";
        _head.appendChild(_style);
        break;
    }
})();