
/**
 * 懒加载
 */


// 实例化   
// new MyImage("demo").setSrc('https://avatars1.githubusercontent.com/u/41097785?s=460&v=4')
// new MyImage("demo").setSrc('https://avatars1.githubusercontent.com/u/41097785?s=460&v=4')
// new MyImage("demo").setSrc('https://avatars1.githubusercontent.com/u/41097785?s=460&v=4')
// new MyImage("demo").setSrc('https://avatars1.githubusercontent.com/u/41097785?s=460&v=4')
// new MyImage("demo").setSrc('https://avatars1.githubusercontent.com/u/41097785?s=460&v=4')
// new MyImage("demo").setSrc('https://avatars1.githubusercontent.com/u/41097785?s=460&v=4')
// new MyImage("demo").setSrc('https://avatars1.githubusercontent.com/u/41097785?s=460&v=4')
// new MyImage("demo").setSrc('https://avatars1.githubusercontent.com/u/41097785?s=460&v=4')


// 构造函数
function MyImage(_id) {
    var oImg = document.createElement('img')
    this.setSrc = function (_src) {
        oImg.src = _src
    }
    document.getElementById(_id).appendChild(oImg)
}

var ProxyImage = function (src) {
    // 预加载 + 懒加载   
    // 预加载 -> 1.jpg
    // 懒加载 -> 监控真正要展示的图片内容 是否有被加载成功 2.jpg
    // 提高用户体验 减少性能伤害
    var oImg = new Image()
    var oMyIamge = new MyImage("demo")
    // 占位图
    oMyIamge.setSrc("./1.jpg")
    oImg.src = src
    
    oImg.onload = function () {
        document.getElementById("btn").addEventListener("click",function(){
            oMyIamge.setSrc(oImg.src)
        })
    }  
}

ProxyImage("./2.jpg")