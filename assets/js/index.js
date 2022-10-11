$(function () {
    getUserInfo();
    var layer = layui.layer;
    //退出登录时绑定的函数
    $("#btnLogout").on("click", function () {

        //退出时的提示信息
        layer.confirm('确定要退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.要清空存储中token的信息
            localStorage.removeItem("token");

            //2.要跳转到登录页面
            location.href = "/login.html";
            //关闭confirm的询问框
            layer.close(index);
        });
    })
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("请求失败！");//不要忘记用---return---关键字
            }
            // 渲染用户头像
            renderAvatar(res.data);
        },
        //无论成功或失败都要执行的函数
        // complete: function (res) {
        //     // console.log("kk");
        //     // console.log(res);
        //     //服务器响应回来的数据通过res.responseJSON获得
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.要清空存储中token的信息
        //         localStorage.removeItem("token");

        //         //2.要跳转到登录页面
        //         location.href = "/login.html";
        //     }
        // }

    })

}
// 渲染用户头像
function renderAvatar(user) {
    //获取用户名
    var name = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        // "user.user_pic"是变量不能用双引号
        $(".layui-nav-img").attr("src", user.user_pic).show;
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}