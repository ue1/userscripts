// ==UserScript==
// @name        OpenCode Web 快捷键
// @namespace   https://github.com/ue1/userscripts
// @version     1.0.0
// @description 删除快捷键 Windows(Alt + Backspace) / macOS(Cmd + Backspace)
// @grant       none
// @match       http://127.0.0.1:4096/*
// ==/UserScript==
(function () {
    'use strict';
    // 添加按钮焦点样式
    const style = document.createElement('style');
    style.textContent = `button:focus { border: dotted;}`;
    document.head.appendChild(style);
    /**
     * 模拟真实用户点击（支持延迟和回调）
     * @param {string|HTMLElement} target - CSS选择器 或 DOM元素
     * @param {object} options - 可选配置
     * @param {number} options.delay - 延迟毫秒数，默认 0（立即执行）
     * @param {Function} options.callback - 点击完成后的回调函数（接收一个参数：是否成功触发）
     * @param {boolean} options.silent - 是否静默（不打印日志），默认 false
     * @returns {boolean} 同步返回是否成功启动（若元素不存在则返回 false，否则 true）
     */
    let simulateClick = function (target, options = {}) {
        const {delay = 0, callback = null, silent = true} = options;
        // 1. 解析目标元素（立即检查，避免延迟后元素消失）
        const el = typeof target === 'string' ? Array.from(document.querySelectorAll(target)).pop() : target;
        if (!el) {
            console.error(`❌simulateClick 失败：未找到元素`, target);
            // 如果有回调，立即告知失败
            if (typeof callback === 'function') callback(false);
            return false;
        }
        // 2. 定义真正的点击动作（内部函数，延迟或立即执行）
        const performClick = () => {
            // 再次检查元素是否还在 DOM 中（因为延迟期间可能被移除）
            if (!document.contains(el)) {
                console.warn('⚠️simulateClick：元素已从 DOM 中移除', el);
                if (typeof callback === 'function') callback(false);
                return;
            }
            // 计算中心坐标
            const rect = el.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            // 构建指针事件属性
            const baseProps = {
                bubbles: true,
                cancelable: true,
                pointerType: 'mouse',
                isPrimary: true,
                clientX: x,
                clientY: y,
                button: 0,
            };
            // 派发事件链
            el.dispatchEvent(new PointerEvent('pointerdown', {...baseProps, buttons: 1}));
            el.dispatchEvent(new PointerEvent('pointerup', {...baseProps, buttons: 0}));
            el.dispatchEvent(new MouseEvent('click', {bubbles: true, clientX: x, clientY: y}));
            if (!silent) {
                console.log(`✅simulateClick 已触发（延迟 ${delay}ms）:`, el);
            }
            // 执行回调，传入成功状态
            if (typeof callback === 'function') callback(true);
        };

        // 3. 根据是否延迟来执行
        if (delay > 0) {
            setTimeout(performClick, delay);
        } else {
            performClick(); // 同步执行
        }
        return true; // 同步返回启动成功
    };

    // 初始化键盘绑定（无延迟，基于真实加载状态）
    function bindKeyboard() {
        console.log(`✅ 按键已加载`);
        document.onkeydown = (e) => {
            if ((e.altKey || e.metaKey) && e.key === 'Backspace') {
                simulateClick('button[aria-label="更多选项"]', {
                    delay: 100,
                    silent: true,
                    callback: (success) => {
                        if (success) {
                            simulateClick('div[role="menu"] div:last-of-type');
                            // 设置焦点
                            setTimeout(() => {
                                document.querySelectorAll('div[role="dialog"] button')[2]?.focus();
                            }, 10);
                        }
                    }
                });
            }
        };
    }

    // 检查当前 DOM 状态绑定
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindKeyboard);
    } else {
        // DOM 已就绪（"interactive" 或 "complete"）直接执行
        bindKeyboard();
    }
})();