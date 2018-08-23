import * as tool from '../utils/tools';

import Text from './Text';
import domtoimage from 'dom-to-image';

// 设置尺寸
function setSize() {
    const scale = tool.getScale();
    tool.setSize($('#app'), scale);
}

$(function() {
    setSize();

    $(window).resize(() => {
        setSize();
    });

    $('#title')
        .find('span')
        .each(function() {
            $(this).css({
                'animation-delay': `${Math.random()}s`
            });
        });

    setTimeout(() => {
        $('#title')
            .find('button')
            .show();
    }, 2000);

    const textAnim = new Text({
        target: '#phone',
        callback: () => {
            $('.qrcodebox').show();
            // $('#qrcode').qrcode('http://7x.h5ds.com');
        }
    });

    // 开始
    $('#run').on('click', () => {
        $('#title').hide();
        textAnim.init();
    });

    // 重新选择
    $('#restart').on('click', () => {
        $('.qrcodebox').hide();
        textAnim.restart();
    });

    // 保存图
    $('#saveImg').on('click', () => {
        domtoimage
            .toPng($('body')[0])
            .then(function(dataUrl) {
                $('body').append(`<img id="toimg" src="${dataUrl}" />`);
                alert('图片已经生成，长按屏幕保存到手机！')
            })
            .catch(function(error) {
                console.error('oops, something went wrong!', error);
            });
    });
});
