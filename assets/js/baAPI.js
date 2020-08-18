var baURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function (paras) {
    // 拼接地址
    paras.url = baURL + paras.url;
    console.log(paras.url);
})