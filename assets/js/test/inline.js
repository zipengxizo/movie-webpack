function show() {
    $(".tabs a").first().removeClass("on");
    $(".tabs a").last().addClass("on");
    $(".conts .item item-3").show().siblings().hide();
}

function myvalidform() {
    if ($("#searchbox").val() == "") {
        $.Showmsg("请输入关键字！");
        setTimeout(closeMsg, 1200);
        return false;
    }
    if ($("#searchbox").val().length > 8) {
        $.Showmsg("关键字不得超过8个字符!");
        setTimeout(closeMsg, 1200);
        return false;
    }
    return true;
}

function closeMsg() {
    $.Hidemsg()
}

var allcookies = document.cookie;

function getCookie(cookie_name) {
    var value = "";
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name); //索引的长度
    // 如果找到了索引，就代表cookie存在，
    // 反之，就说明不存在。
    if (cookie_pos != -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可。
        cookie_pos += cookie_name.length + 1; //这里我自己试过，容易出问题，所以请大家参考的时候自己好好研究一下。。。
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        if (cookie_end == -1) {
            cookie_end = allcookies.length;
        }
        value = unescape(allcookies.substring(cookie_pos, cookie_end)); //这里就可以得到你想要的cookie的值了。。。
    }
    return value;
}