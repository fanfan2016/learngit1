//轮播
var imgLi = document.getElementById("img-list").getElementsByTagName("li");
var pointLi = document.getElementById("point").getElementsByTagName("i");
var banner = document.getElementById("banner");

var cur = 0;
////遍历按钮元素，给每个按钮调价click事件，添加自定义index属性，在循环中，绑定下标i
for(var i = 0;i<pointLi.length;i++){
    pointLi[i].index = i;
    pointLi[i].onclick = function(){
        cur = this.index
        changeTab();
    }
}
//控制当前状态，point的样式，以及对应的图片样式
function changeTab(){
    //控制point的className
    for(var i = 0;i<pointLi.length;i++){
        pointLi[i].className = "";
    }
    pointLi[cur].className = "active";
    //控制banner图片的className
    for(var j = 0;j<imgLi.length;j++){
        imgLi[j].className = "";
        imgLi[j].style.opacity = "0";
        // imgLi[j].style.display = "none";
    }
    imgLi[cur].className = "current";
    // imgLi[cur].style.display = "block";
    fadein(imgLi[cur],1);
}

//淡入
function fadein(elem, alpha) {
    var val = 0,
    timer1 = null;
    clearInterval(timer1);
    timer1 = setInterval(function() {
        setOpacity(elem, val);
        if(alpha == 0) {
            val += 0.1;
        }
        // if(alpha == 1) {
        //     val -= 0.1;
        // }
        if(val > 1 || val < 0) {
            clearInterval(timer1);
        }
    }, 50); //50毫秒 X 10 =500毫秒

//设置opacity ,兼容IE浏览器透明度设置,value为透明度的值
function setOpacity(element, value) {
        element.filters ? element.style.filter = 'alpha(opacity=' + value + ')' : element.style.opacity = value;
    }
}

//自动播放
function next(){
    cur++;
    //判断图片滚动的位置
    if (cur == imgLi.length) {
        cur = 0;
    }
    changeTab();
}

//定时器
var timer2 = setInterval(next,5000);

//鼠标移入清除定时器
banner.onmouseover = function(){
    clearInterval(timer2);
}

//鼠标移入开启定时器,直接给timer2赋值
banner.onmouseout = function(){
    timer2 = setInterval(next,5000);
}


//淡入
function fadein(elem, alpha) {
    var val = 0,
        timer1 = null;
        clearInterval(timer1);
         timer1 = setInterval(function(){
            //用定时器来控制透明度，淡入
            setOpacity(elem,val);
                if(alpha == 0){
                    val -= 0.1;
                }
                if(alpha == 1){
                    val += 0.1;
                }
                if(val > 1||val < 0 ){
                    clearInterval(timer1);
                }
            },50);     

    //兼容IE浏览器透明度设置
    function setOpacity(element, value) {
        element.filters ? element.style.filter = 'alpha(opacity=' + value + ')' : 
element.style.opacity = value;
    }
}

//向左循环滚动图片
var imgScroll = document.getElementById("img-scroll");
var speed = -2;
imgScroll.innerHTML += imgScroll.innerHTML;

function scroll(){
        if(imgScroll.offsetLeft < -imgScroll.offsetWidth/2){
            imgScroll.style.left = "0";
        }
        imgScroll.style.left = imgScroll.offsetLeft + speed + "px";
    }
var timerScroll = setInterval(scroll,30);

imgScroll.onmouseover = function(){
        clearInterval(timerScroll);
    }
imgScroll.onmouseout = function(){
        timerScroll = setInterval(scroll,30);
    }


//视频播放控制
var videoBtn = document.getElementById("vidoe-Play");  //播放按钮
var videooff = document.getElementById("videooff");  //关闭按钮
function videoPlay(){
    videoBtn.onclick = function(){
        mask.style.display = "block";
        video.style.display = "block";
        videoplay.play();  //视频自动播放
        };
    videooff.onclick = function(){
        mask.style.display = "none";
        videoplay.pause();  //视频暂停
    };
}
videoPlay();


//ajax-课程数据获取

//pageNo当前页面，type筛选类型，psize每页返回数据个数
//获取课程列表的li节点
var ulcontainer = document.getElementById("ulcontainer");
function connectAjax(pageNo,type,psize){
    // ajax:
    ajax({  //已封装的ajax
        method:"get",
        url:"http://study.163.com/webDev/couresByCategory.htm",  //要解决跨域问题
        data:{  //传参
            "pageNo":pageNo,  //当前页数
            "psize":20,  //数据个数
            "type":type  //课程类型 ，10：设计，20：编程
        },
        success:function(text){
            connectObj = JSON.parse(text);  //将json字符串转为js对象
            connectObjlist = connectObj.list;  //获取js对象的list属性
            var jsonArr = [];
            var connectHtml = "";
            for(var i=0;i<connectObjlist.length;i++){  //遍历js对象的所有list属性
                jsonArr = [i];
                for(var j = 0; j< jsonArr.length;j++){
//判断价格属性的值是否免费，价格保留小数点后两位，传参的时候，每一行末尾要加斜线，最后一个可以不加。
                    connectObjlist[i].price == 0? connectObjlist[i].price = "免费":connectObjlist[i].price.toFixed(2);
                    connectHtml += '<li class="kc-list">\
                        <a>\
                            <div class="coursediv">\
                                <div class="pic">\
                                    <div><img src="'+connectObjlist[i].middlePhotoUrl+'" width="223" height="124" alt="'+connectObjlist[i].name+'" />\
                                    </div>\
                                </div>\
                                <div class="txt1">\
                                    <h3>'+connectObjlist[i].name+'</h3>\
                                    <span>'+connectObjlist[i].provider+'</span>\
                                    <span class="span-1"><i class="learnerNum">'+connectObjlist[i].learnerCount+'</i></span>\
                                    <span class="cost">￥'+connectObjlist[i].price+'</span>\
                                </div>\
                            </div>\
                            <div class="course-hover" id="course-hover" >\
                                <div class="course-hover-top clearfix">\
                                    <img src="'+connectObjlist[i].middlePhotoUrl+'" alt="'+connectObjlist[i].name+'" />\
                                    <dl>\
                                        <h3>'+connectObjlist[i].name+'</h3>\
                                        <dt><p><span class="learnerCount">'+connectObjlist[i].learnerCount+'</span>在学</p></dt>\
                                        <dd><p>发布者:<span>'+connectObjlist[i].provider+'</span></p></dd>\
                                        <dd><p>分类:<span>'+connectObjlist[i].categoryName+'</span></p></dd>\
                                    </dl>\
                                </div>\
                                <div class="course-hover-txt">\
                                    <p class="description">'+connectObjlist[i].description+'</p>\
                                </div>\
                            </div>\
                        </a>\
                    </li>';  //斜线一定要加，否则报错，最后一个不用加
              ulcontainer.innerHTML = connectHtml;
              showInfo();
                }
            }
            function showInfo(){
                var kcList = getElementsByClassName(ulcontainer,"kc-list"),  //注意括号中的写法
                    kcHover = getElementsByClassName(ulcontainer,"course-hover"),
                    hoverindex = 0,
                    timer = null;
            for(var i = 0; i < kcList.length; i++){
                kcList[i].index = i;
                //鼠标移入
                kcList[i].onmouseenter = function(){  //onmouseenter不支持冒泡，只支持IE
                    clearTimeout(timer);      //记得清除定时器，不然会有问题
                    hoverindex = this.index;
                    for(var i = 0;i<kcList.length;i++){
                        timer = setTimeout(function(){
                            kcHover[hoverindex].style.display = "block";
                        },350);
                    }
                }
                //鼠标移开
                kcList[i].onmouseleave = function(){ //配合onmouseenter一同使用，只支持IE
                    clearTimeout(timer); 
                    kcHover[hoverindex].style.display = "none";
                }
            }
            }
        },
        async:true //true为异步方式
    });
}

//默认加载课程列表，1为页码 10课程分类。少一个参数，默认加载课程列表数据?????
connectAjax(1,10);

//翻页函数
var ulbox = document.getElementById("ulbox"),
    pagediv = document.getElementById("pagenum"),
    pageli = ulbox.getElementsByTagName("li"),
    pageUp = document.getElementById("pageup"),
    pageDown = document.getElementById("pagedown");
//点击翻页，替换不同页面对应的数据
function coursePage(page,type){
    var now = 0;
    for(var i = 0;i<pageli.length;i++){
        pageli[i].index = i;  //绑定i到当前页码的下标

        //默认展示第一页
        pageli[now].className = "cur-num";

        //非当前页码重置class
        var page = pageli[i].className = "";

        //给页码增加点击事件，type默认为10
        pageli[i].onclick = function(){
            var type = 10;
            //this指向的是这个方法的调用者
            now = this.index;
            for(var i=0 ; i < pageli.length;i++){
                pageli[i].className = "";
            }
            pageli[now].className = "cur-num";
            //判断停留在哪个分类
            design.className =="active-checked"?type = 10:type = 20;
            connectAjax(now + 1 , type);
            return pageNow = now;
        }
        //定义全局变量pageNow
        var pageNow = '';

    //给“下一页”按钮添加点击事件，同时判断停留在哪个分类,这里不能直接使用now，会找到外层的变量，now为0
        pageDown.onclick = function(){
        pageNow++;
        //重置所有页码样式
        for(var i=0;i < pageli.length; i++){
            pageli[i].className = "";
        }
        if(pageNow >= 7){  
            pageli[7].className = "cur-num";
        }else{
            pageli[pageNow].className = "cur-num";
        }
        //判断当前停留在哪个分类
        design.className == "active-checked"?type = 10:type = 20;
        connectAjax(pageNow + 1,type);
        return pageNow;
         }

    //给“上一页”按钮添加点击事件,同时判断停留在哪个分类，但代码在临界点会有问题
        pageUp.onclick = function(){
        pageNow--;
        //重置所有页码样式
        for(var i=0; i<pageli.length;i++){
            pageli[i].className = "";
        }
        if(pageNow <= 0){
            pageli[0].className = "cur-num";
            pageNow = 0;
        }else {
            pageli[pageNow].className = "cur-num";
        }

        //判断停留在哪个分类
        design.className == "active-checked"?type = 10:type = 20;
        connectAjax(pageNow + 1 ,type);
        return pageNow;
        }
    }
}
coursePage();


//切换课程,获取H2对应的两个节点
var design = document.getElementById("tab1"),
    programme = document.getElementById("tab2");
function connectTab(){
    //切换课程类型,绑定两个函数，connectAjax和coursePage
    design.onclick = function(){
        connectAjax(1,10);
    //调整页码，1为初始化页码位置，10代表分类
    coursePage(1,10);
    design.className = "active-checked";
    programme.className = "";
    }
    programme.onclick = function(){
        connectAjax(1,20);
        coursePage(1,20);
        design.className = "";
        programme.className = "active-checked"
    }
}
connectTab();


//热销课程列表
function connectHot(){
    ajax({
        method:"get",
        url:"http://study.163.com/webDev/hotcouresByCategory.htm",
        success:function(text){
            //连接成功后进入这里,将JSON数据转为js对象
            var hotList = JSON.parse(text)
            //hotHtml作为每个传递过来的，放在li节点的内容容器
            var hotHtml = '',
            //取UL节点
            hotListHtml = document.getElementById("hotlist");
            //定义两个变量控制遍历
            var indexLength = 10,
                hotIndex = 0;
            function hotHtmlfn(){
                for(var i = hotIndex; i < indexLength; i++){
                 hotHtml += '<li>\
                        <a href="#">\
                            <img src="'+hotList[i].smallPhotoUrl+'" width="50" height="50" alt="'+hotList[i].name+'" />\
                            <p>'+hotList[i].name+'</p>\
                            <span>'+hotList[i].learnerCount+'</span>\
                        </a>\
                     </li>';
                     hotListHtml.innerHTML = hotHtml;
            }
            hotIndex++;
            indexLength++;
               
        }
        hotHtmlfn();
        //热门课程循环
        setInterval(function(){
            if(hotIndex > 10){
                hotIndex = 0;
                indexLength = 10;
            }
            hotHtml= "";
            hotHtmlfn();
        },5000);
    },
        async:true  //异步方式
    });
}
connectHot();


//ajax封装
//XHR支持检测
function createXHR(){
    if(typeof XMLHttpRequest != "undefined"){
        return new XMLHttpRequest();
    }else if (typeof ActiveXObject != "undefined"){
        var version = [
        "MSXML2.XMLHttp.6.0",
        "MSXML2.XMLHttp.3.0",
        "MSXML2.XMLHttp",
        ];
        for(var i=0;i<version.length;i++){
            try{
                return new ActiveXObject(version[i]);
            } catch(e){
                //跳过
            }
        }
    } else{
        throw new Error("您当前的系统或浏览器不支持XHR对象！")
    }
}

//封装ajax
function ajax(obj){
    var xhr = createXHR();
    obj.url = obj.url + "?rand"+Math.random(); //解决浏览器缓存问题
    obj.data = params(obj.data);  //经过转换后的字符串,patams见tool文件
    if(obj.method === "get")obj.url +=obj.url.indexOf("?") == -1?"?"+obj.data:"&"+obj.data;
    if(obj.async === true){
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){  //浏览器和服务器进行到4,读取完成
                callback();
            }
        };
    }
    xhr.open(obj.method,obj.url,obj.async);  //open方法，传入三个参数，开启一个请求，准备发送
    if(obj.method === "post"){
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  //修改HTTP头，设置客户端提交给服务器文本内容的编码方式为URL编码
        xhr.send(obj.data);
    }else {
        xhr.send(null); //正式向服务器发起请求，null表示不需要请求主体发送数据
    }
    if(obj.async === false){  //同步
        callback();
    }
    function callback(){
        if(xhr.status == 200){   //http返回码为200，表示读取成功
            obj.success(xhr.responseText);  //回调传递参数
        }else {
            console.log("获取数据错误！错误代码："+xhr.status+",状态信息:"+xhr.statusText);
        }
    }
}


//名值对转换为字符串
function params(data){
    var arr=[];
    for(var i in data){
        arr.push(encodeURIComponent(i)+"="+encodeURIComponent(data[i]));
    }
    return arr.join("&");
}


//getElementsByClassName兼容IE的方法
function getElementsByClassName(ele,name){
    if(ele.getElementsByClassName){
        return ele.getElementsByClassName(name);
    } else {
        //获取所有后代元素
        var children = (ele || document).getElementsByTagName("*");
        var elements = [];
        for(var i=0; i < children.length ;i++ ){
            var child = children[i];
            var classNames = child.className.split(" ");
            for(var j=0 ; j<className.length;j++){
                if(classNames[j] === name){
                    elemetns.push(child);
                    break;
                }
            }
        }
        return elements;
    }
}

//页面布局动态适应
//检测屏幕尺寸,body.offsetWidth为可视宽度
// var minCss = document.getElementById("changecss");
// if(document.body.offsetWidth <= 1205){
//     minCss.href = "css/min-1025.css";
//     //课程加载每页15条
//     connectAjax(1,10,15);
// } else{
//     connectAjax(1,10,20);
// }

// //设置定时器
// var timeBody;
// timeBody = setInterval(function(){
//     if(document.body.offsetWidth <= 1205){
//         minCss.href = "css/min-1205.css";
//     }else {
//         minCss.href = "";
//     }
// },500);

// window.onresize = function(){
//     if(document.body.offsetWidth <= 1205){
//         minCss.href = "css/min-1205.css";
//         connectAjax(1,10,15);

//     }else{
//         minCss.href = "";
//         connectAjax(1,10,20);
//     }
// }







