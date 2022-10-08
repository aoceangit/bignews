$(function () {
    //点击"去注册账号"的链接
    $("#link_reg").on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    //点击"去登录"的链接
    $("#link_login").on('click', function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    //获取layui的表单对象
    var form = layui.form;
    var layer = layui.layer;
    //自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //确认密码校验
        repwd: function (value) {
            var val = $(".reg-box [name=password]").val();
            if (val !== value) {
                return "二次输入的密码不一致";
            }
        }
    })

    //监听注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        //阻止默认的提交行为
        e.preventDefault();
        //获取用户名和密码
        // var username = $(".reg-box [name=username]").val();
        // var password = $(".reg-box [name=password]").val();
        var data = {
            username: $(".reg-box [name=username]").val(),
            password: $(".reg-box [name=password]").val()
        }
        //发起ajax的请求
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) {
                // return console.log(reg.message);
                return layer.msg(res.message);
            }
            // console.log("注册成功!");
            layer.msg(res.message);
            $("#link_login").click();
        })
    })
    //监听登录事件
    $("#form_login").submit(function (e) {
        //阻止默认的提交行为
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败！");
                }
                layer.msg("登录成功！");
                // console.log(res.token);
                //存储token
                localStorage.setItem("token", res.token);
                location.href = "/index.html";
            }
        })

    })

})