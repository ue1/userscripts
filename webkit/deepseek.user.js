// ==UserScript==
// @namespace   https://github.com/ue1/userscripts
// @name        DeepSeek Web Key
// @version     1.0.0
// @description Add Quick Delete Key
// @match       https://chat.deepseek.com/*
// @grant       none
// ==/UserScript==
(function () {
    'use strict';
    // 模拟点击
    let simulateClick = function () {
        // 找到当前选中会话的更多操作按钮(通过背景色筛选)
        const area = '.ds-scroll-area';
        const hexColor = hexToRgbStr(getComputedStyle(document.querySelector(area)).getPropertyValue('--dsw-specific-sidebar-nav-item-active-accent'))
        const target = [...document.querySelectorAll(area + ' a')].filter(el => {
            return getComputedStyle(el).backgroundColor === hexColor
        })
        let el = null;
        if (target && target.length > 0) {
            el = target[0].querySelector('div.ds-button')
        } else {
            return;
        }
        if (!el) {
            return;
        }
        el.click();
        setTimeout(() => {
            // 隐藏菜单列表
            document.querySelector('.ds-elevated').style.opacity = 0;
            let del = [...document.querySelectorAll('.ds-dropdown-menu-option__label')].at(-1);
            if (del) {
                del.click();
                // 设置删除按钮焦点
                setTimeout(() => {
                    document.querySelector('div.ds-modal-content--dialog div[role=button]:last-of-type').focus();
                }, 1);
            }
        }, 1);
    }

    // 初始化键盘绑定(无延迟，基于真实加载状态)
    function bindKeyboard() {
        console.log(`✅ 自定义按键已加载`);
        document.onkeydown = (e) => {
            if ((e.altKey || e.metaKey) && e.key === 'Backspace') {
                simulateClick();
            }
        };
    }

    // 色值转为RGB显示
    function hexToRgbStr(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // 检查当前DOM状态,智能绑定
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindKeyboard);
    } else {
        // DOM已就绪("interactive"或"complete")直接执行
        bindKeyboard();
    }
})();
