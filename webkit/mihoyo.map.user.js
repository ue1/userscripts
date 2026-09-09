// ==UserScript==
// @name        原神地图快捷键
// @namespace   https://github.com/ue1/userscripts
// @version     1.0.0
// @description 增加F键盘快速标记完成
// @grant       none
// @match       https://act.mihoyo.com/ys/app/interactive-map/index.html*
// ==/UserScript==
(function () {
    'use strict';
    setTimeout(() => {
        document.addEventListener("keyup", function (event) {
            console.log("✅按下的键：" + event.key);
            if (event.key && event.key.toLowerCase() === 'f') {
                let pop = document.querySelector('div.leaflet-popup  div.map-popup__footer button:last-child');
                if (pop) {
                    console.log("✅找到浮层按钮");
                    pop.click();
                }
            }
        });
    }, 100);
})();
