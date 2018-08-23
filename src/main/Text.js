import * as tool from '../utils/tools';

import { texts } from './texts';

/**
 * @desc 文字的方法
 */
export default class Text {
    constructor(set) {
        this.set = Object.assign(
            {
                target: '#phone',
                width: 320,
                height: 514,
                callback: () => {}
            },
            set
        );
        this.dom = $(set.target);
    }

    // 获取随机文案
    getText() {
        const index = tool.randomNum(0, texts.length - 1);
        const t1 = texts[index];
        return t1.split('');
    }

    // 获取全部文字
    getAllText() {
        let all = [];
        const { width, height } = this.set;
        texts.forEach(d => {
            // let str = d.replace(/[，,。,？,！,……,～,：”,“,\s]/gm, '');
            all = [...all, ...d.split('')];
        });
        // 去重
        all = Array.from(new Set(all));
        all = all.map(text => {
            const a = tool.randomNum(5, 10);
            const iskey = this.targetText.indexOf(text) === -1 ? false : true;
            return {
                id: tool.getRandomID(),
                y: height / 2 - a / 2,
                x: width / 2 - a / 2,
                opacity: Math.random() * 0.5,
                scale: Math.random() * 1.2,
                iskey,
                width: a,
                height: a,
                text
            };
        });
        return tool.randomArrSort(all);
    }

    // 渲染allText
    renderTexts(arr) {
        let shtml = '';
        arr.forEach(d => {
            const { id, x, y, scale, opacity, iskey, width, height, text } = d;
            shtml += `<span id="${id}" class="${
                iskey ? 'text text-active' : 'text'
            }" style="width: ${width}px; height: ${height}px; transform: translate(${x}px, ${y}px) scale(${scale}); opacity: ${opacity};">${text}</span>`;
        });
        this.dom.append(shtml);
    }

    // 计算目标文字的位置
    getTargetCoord(targetText) {
        const tlen = targetText.length;
        let val = 10; // 10个换行
        let size = 20,
            arr = [],
            boxWidth = Math.ceil(tlen / val) * size,
            boxHeight = size * val; // 10个字换行
        const { width, height } = this.set;
        // 坐标起点
        const start = {
            x: (width - boxWidth) / 2,
            y: (height - boxHeight) / 2 - 100
        };
        for (let i = 0; i < tlen; i++) {
            let a = Math.floor(i / val);
            arr.push({
                width: size,
                height: size,
                x: start.x + a * size,
                y: start.y + (i - a * val) * size
            });
        }
        return arr;
    }

    // 找到对应的字，然后clone一个对象
    cloneTargetStyle(d, tArr) {
        const obj = tArr.filter(a => {
            return a.text === d;
        })[0];
        obj.id = tool.getRandomID();
        return { ...obj };
    }

    // 目标文字动画
    targetTextAimate() {
        let index = 0;
        let tArr = [];
        this.allText.forEach(d => {
            if (d.iskey) {
                tArr.push(d);
            }
            $(`#${d.id}`).css({
                opacity: 0
            });
        });

        // 获取目标数组
        const targetArr = [];
        this.targetText.forEach(d => {
            targetArr.push(this.cloneTargetStyle(d, tArr));
        });

        // 设置坐标
        const arr = this.getTargetCoord(targetArr);
        // 渲染dom
        this.renderTexts.bind(this)(targetArr);
        targetArr.forEach((d, index) => {
            let item = arr[index];
            $(`#${d.id}`).css({
                opacity: 1,
                width: item.width,
                height: item.height,
                transform: `translate(${item.x}px, ${item.y}px) scale(1)`
            });
        });

        setTimeout(() => {
            this.set.callback();
        }, 3000);
    }

    // allText 文字动画
    allTextAnimate() {
        const { width, height } = this.set;
        let count = 0;
        const doAnimate = () => {
            count++;
            this.allText = this.allText.map(d => {
                d.y = tool.randomNum(0, height);
                d.x = tool.randomNum(0, width);
                d.scale = Math.random() * 1.5;
                // d.opacity = Math.random() * 0.5;
                return d;
            });
            this.allText.forEach(d => {
                const { x, y, scale } = d;
                $(`#${d.id}`).css({
                    transform: `translate(${x}px, ${y}px) scale(${scale})`
                });
            });
        };
        const runTime = () => {
            if (count > 2) {
                setTimeout(() => {
                    this.targetTextAimate.bind(this)();
                }, 3000);
                return;
            }
            setTimeout(() => {
                doAnimate();
                runTime();
            }, 3000);
        };
        doAnimate();
        runTime();
    }

    // 重新执行
    restart = () => {
        this.dom.empty();
        this.targetText = this.getText();
        this.allText = this.getAllText.bind(this)();
        this.renderTexts.bind(this)(this.allText);
        setTimeout(() => {
            this.allTextAnimate.bind(this)();
        }, 10);
    };

    // 初始化
    init = () => {
        // 获取文案
        this.targetText = this.getText();
        this.allText = this.getAllText.bind(this)();

        // 渲染文字
        this.dom.addClass('h5ds-text7');
        this.renderTexts.bind(this)(this.allText);

        setTimeout(() => {
            this.allTextAnimate.bind(this)();
        }, 0);
    };
}
