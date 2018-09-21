// 文档 
/**
 * add方法
 * 添加校验规则
 * dom,
 * [
 *  {strategy:"isNoEmpty", showDom, errorMsg: "账号不能为空"}，
 *  {strategy:"maxLength：4", showDom, errorMsg: "账号长度不能超过4个"}
 * ]
 */
// start方法  校验，并返回校验结果
// extend方法 可以扩展 算法 ｛isMail: function(){}｝

// 提交表单
document.getElementById("submit").addEventListener("click", function () {
    ProxyRequest()
})

// 实例化
var validator = new Validator()
// 构造函数
function Validator() {
    this.cache = []
    this.warnDom = []
}
// 原型链
Validator.prototype.strategies = {
    isNoEmpty: function (value, errorMsg) {
        if (value == '') {
            return errorMsg
        }
        return true
    },
    maxLength: function (value, length, erroMsg) {
        if (value != "" && value.length > length) {
            return erroMsg
        }
        return true
    },
    minLength: function (value, length, erroMsg) {
        if (value != "" && value.length < length) {
            return erroMsg
        }
        return true
    }
}

Validator.prototype.add = function (dom, showDom, strategyArr) {
    var self = this
    this.warnDom.push(showDom)
    strategyArr.forEach(function (ele, index) {
        self.cache.push(function () {
            // arr => ["maxlenght",4]
            var arr = ele.strategy.split(":")
            // arr 变成4
            // type 变成maxlength
            var type = arr.shift()
            // [dom.value] => [dom.value, 4]
            arr.unshift(dom.value)
            //  [dom.value, 4, errorMsg]
            arr.push(ele.errorMsg)

            var msg = self.strategies[type].apply(self, arr)
            if (msg != true) {
                showDom.innerText = msg
            }
            return msg
        })
    });
}

Validator.prototype.start = function () {
    // 标记是否符合规则
    var flag = true

    this.warnDom.forEach(function (ele) {
        ele.innerText = ""
    })
    this.cache.forEach(function (ele) {
        if (ele() !== true) {
            flag = false
        }
    });
    return flag
}

// 扩展方法借口
Validator.prototype.extend = function (config) {
    // 循环插入扩展的方法
    // 一次性扩展多个方法
    for (var prop in config) {
        Validator.prototype.strategies[prop] = config[prop]
    }
}