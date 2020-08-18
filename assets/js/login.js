$(function () {
    // 点击去登录，显示登录区域，隐藏注册区域
    $('#deng').on('click', function () {
        $('.denglu').show();
        $('.zhuce').hide();
    })
    // 点击去注册账号，显示注册区域，隐藏登录区域
    $('#zhu').on('click', function () {
        $('.zhuce').show();
        $('.denglu').hide();
    })
})
// 表单验证，正则
var form = layui.form;
form.verify({
    pwd: [
        /^[\S]{6,16}$/,
        '密码必须6~16位,且不能输入空格'
    ],
    repwd: function (value) {   //此时的value值为repwd的内容
        var pwd = $('#layui_lo [name=password]').val();
        if (value !== pwd) {
            return "两次密码不一致"
        }
    }
})
// 注册页面的提交
var layer = layui.layer;
$('.zhuce').on('submit', function (e) {
    // 清除表单的默认样式
    e.preventDefault();
    // 发送ajax
    $.ajax({
        method: 'POST',
        url: '/api/reguser',
        data: {
            username: $('.zhuce [name=username]').val(),
            password: $('.zhuce [name=password]').val(),
        },
        success: function (res) {
            // 判断
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // 自动点击进入登录页面
            $('#deng').click();
            // 清空所有注册内容
            $('.zhuce')[0].reset();
        }
    })
})

// 登录页面提交
$('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // 保存token
            localStorage.setItem('token', res.token);
            // 跳转
            location.href = "/index.html";
        }
    })
})



