/**
 *
 * @desc 生成指定范围随机数
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
export function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

/**
 *
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
export function getUrlData(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    let data = null;
    if (r != null) {
        data = unescape(r[2]);
    }
    return data;
}

/**
 * @desc 数组打乱顺序
 */
export function randomArrSort(arr) {
    arr.sort(() => 0.5 - Math.random());
    return arr;
}

/**
 *
 * @desc 随机生成颜色
 * @return {String}
 */
export function randomColor() {
    return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
}

/**
 * 生成一个用不重复的ID
 */
export function getRandomID(randomLength = 8) {
    return 'id_' + Number(
        Math.random()
            .toString()
            .substr(3, randomLength || 8) + Date.now()
    ).toString(36);
}

/**
 * @desc 设置自动适配的尺寸
 */
export function setSize($box, scale, fixed) {
    let width = fixed ? appWidth : $box.width(),
        height = fixed ? appHeight : $box.height();
    const { innerWidth, innerHeight } = window;
    let top = (innerHeight - height * scale) / 2;
    if (top < 0) {
        top = 0;
    }
    $box.css({
        left: (innerWidth - width * scale) / 2,
        top: top,
        transform: `scale(${scale})`
    });
}

/**
 * @desc 计算sacle 和 偏移
 */
export function getScale() {
    const width = 320;
    const height = 514;
    // 自动适配
    const { innerWidth, innerHeight } = window;
    // 假设宽度适配 scale * width = innerWidth
    let scale1 = innerWidth / width;
    // 假设高度适配 scale * height = innerHeigh
    let scale2 = innerHeight / height;
    return scale1 > scale2 ? scale2 : scale1;
}
