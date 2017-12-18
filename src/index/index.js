/**
 * Created by Administrator on 2017/11/20.
 */
import './index.less';


$(function () {
    $('#btn1').click(function () {
        rotatePolygon(30);
    })

    $('#btn2').click(function () {
        rotatePolygon(60);
    })

    $('#btn3').click(function () {
        rotatePolygon(90);
    })

    $('#btn4').click(function () {
        rotatePolygon(120);
    })

    $('#btn5').click(function () {
        rotatePolygon(150);
    })

    function rotatePolygon(deg) {
        $('.wrapper').attr('style', `transform:rotate(${deg}deg)`);
        $('.item').addClass('active');
        $('.center-point').addClass('active');
        $('.wrapper').on('transitionend', function () {
            $(this).children('.item').removeClass('active')
        })
    }
})