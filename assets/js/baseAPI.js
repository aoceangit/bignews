//在这个函数中，可以拿到为ajax配置的对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    options.url = "http://www.liulongbin.top:3007" + options.url;

    // console.log(options.url);
    //统一为有权限的接口，设置headers请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        // console.log("kk");
        // console.log(res);
        //服务器响应回来的数据通过res.responseJSON获得
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.要清空存储中token的信息
            localStorage.removeItem("token");

            //2.要跳转到登录页面
            location.href = "/login.html";
        }
    }

})