//获取滚动条当前的位置 
export function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//获取当前可视范围的高度 
export function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度 
export function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

export function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};


export function checkIsTotalVisible(element) {
    const rect = element.getBoundingClientRect() //用于获取某个元素相对于视窗的位置集合
    const {
        top,
        left,
        bottom,
        right
    } = rect
    const isTotalVisible = (
        top >= 0 &&
        left >= 0 &&
        bottom < document.documentElement.clientHeight &&
        right < document.documentElement.clientWidth
    )
    return isTotalVisible
}