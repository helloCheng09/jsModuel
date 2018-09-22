var oDiv = document.getElementById("show")
var oBtnArr = document.getElementsByTagName("button")
// 构造 代理模式 
var ProxyRequest = function   () {
    var cache = []
    var timer = null
    return function () {
        cache.push(this.getAttribute("type"))
        clearTimeout(timer)
        timer = setTimeout(() => {
            changeStyle(oDiv, cache)
            cache = []  
        }, 2000);
    }

}
// 实例 代理核心
var realChange =  ProxyRequest(changeStyle)


// 让点击事件进入代理
for (var i = 0; i < oBtnArr.length; i++) {
    // oBtnArr[i].onclick = function () {
    //     changeStyle(oDiv, this.getAttribute("type"))
    // }
    oBtnArr[i].onclick = realChange
}

// 改变样式函数
function changeStyle(dom, typeArr) {
    // type => bg  +> dom.style.background
    // 如果单次发送 if() {}  or switch
    // if ( type == "bg") { 
    //     dom.style.backgroundColor = "blue"
    // }

    // 打包一次发送
    // 比喻后台处理上传文件
    var tyepObj = {
        bg: ["backgroundColor", "green"],
        cl: ["color", "blue"],
        fs: ["fontSize", "30px"],
        fw: ["fontWeight", "bold"],
        td: ["textDecoration", "line-through"]
    }
    // 判断传入的是否为数组
    if (typeArr.constructor == Array) {
        typeArr.forEach(element => {
            dom.style[tyepObj[element][0]] = tyepObj[element][1]  
        });
    } else {
        dom.style[tyepObj[typeArr][0]] = tyepObj[typeArr][1]
    }
}

// changeStyle(oDiv, ["bg", "cl", "fs"])