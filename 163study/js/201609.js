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

//窗口登录
//获取登录窗口节点
var login = document.getElementById("login");
var loginoff = document.getElementById("loginoff");
var mask = document.getElementById("mask");
//获取登录窗口的3个input节点
var userName = document.getElementById("userName");
var password = document.getElementById("password");
var submit = document.getElementById("submit");

//获取关注按钮的各个节点
var gz = document.getElementById("gz");
var ygz = document.getElementById("ygz");
var fs = document.getElementById("fs");
//获取video窗口的各个节点
var video =  document.getElementById("video");  //视频播放区域
var videoplay = document.getElementById("videoplay");

//获取课程列表的li节点
var ulcontainer = document.getElementById("ulcontainer");


//登录表单验证,将事件绑定在确认按钮上,可验证元素有button，input，select，textarea
function loginVerify(){
    submit.onclick = function(){
        //判断用户名是否合适要求，以字母开头，字符串在4-16之间，不区分大小写
        var pattern = /^[a-zA-Z]\w{3,15}$/ig;
        if(pattern.test(userName.value)){
            var form = getElementById("form");
            //验证通过
            //          alert("验证通过1");
            ajax({
                method:"get",//get方式传递
                url:"http://study.163.com/webDev/login.htm",  //url地址
                data:{"userName":"studyOnline",  //传的参数
                    "password":"study.163.com"},
                success:function(text){
                    //成功后，进入到这里
                    alert(text);  //显示文本
                    setCookie("loginSuc","login",setCookieDate(10));//设置cookie有效期，cookie名为loginSuc
                    gz.style.display = "none";  //隐藏、展示匹配的信息
                    ygz.style.display = "block";
                    fs.style.display = "block";
                },
                async:true //异步方式
            });
        }else{
            alert("用户名或密码不合法！");
        }
    };
}
getLoginSuc();

//判断Cookie，loginSuc是否存在
function getLoginSuc(){
    gz.onclick = function(){
        if(getCookie("loginSuc")){
            //cookie存在调用关注按钮
        }else {
            //弹出登录窗口函数调用
            mask.style.display = "block";
            video.style.display = "none";
            //调用登录窗口关闭函数
            loginoff.onclick = function(){
                mask.style.display = "none";
            };
            loginVerify();
        }
    };
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
function connectAjax(pageNo,type,psize){
    ajax:ajax({
        method:"get",
        url:"http://study.163.com/webDev/couresByCategory.htm",  //要解决跨域问题
        data:{  //传参
            "pageNo":pageNo,  //当前页数
            "psize":psize,  //数据个数
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
                    connectHtml += '<li>\
                        <a>\
                            <div class="coursediv">\
                                <div class="pic">\
                                    <div><img src="'+connectObjlist[i].middlePhotoUrl+'" alt="'+connectObjlist[i].name+'" />\
                                    </div>\
                                </div>\
                                <div class="txt1">\
                                    <h3>'+connectObjlist[i].name+'</h3>\
                                    <span>'+connectObjlist[i].categoryName+'</span>\
                                    <span class="span-1"><i class="learnerNum">'+connectObjlist[i].leatnerCount+'</i></span>\
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
                }
            }
        },
        saync:true //true为异步方式
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
        pageli[now].className = "actice-page";

        //非当前页码重置class
        var page = pageli[i].className = "";

        //给页码增加点击事件，type默认为10
        pageli[i].onclick = function(){
            var type = 10,
                psize = 20;
            //this指向的是这个方法的调用者
            now = this.index;
            for(var i=0 ; i < pageli.length;i++){
                pageli[i].className = "";
            }
            pageli[now].className = "active-page";
            //判断停留在哪个分类
            design.className =="active-checked"?type = 10:type = 20;
            //数据自适应窗口大小
            document.body.offsetWidth < 1205 ? psize = 15 : psize = 20;

            connectAjax(now + 1 , type , psize);
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
            pageli[7].className = "active-page";
        }else{
            pageli[pageNow].className = "active-page";
        }
        //判断当前停留在哪个分类
        design.className == "active-checked"?type = 10:type = 20;
        document.body.offsetWidth < 1205 ? psize = 15 : psize = 20;
        connectAjax(pageNow + 1,type);
        return pageNow;
         }

    //给“上一页”按钮添加点击事件,同时判断停留在哪个分类
        pageUp.onclick = function(){
        pageNow--;
        //重置所有页码样式
        for(var i=0; i<pageli.length;i++){
            pageli[i].className = "";
        }
        if(pageNow <= 0){
            pageli[0].className = "active-page";
            pageNow = 0;
        }else {
            pageli[pageNow].className = "active-page";
        }
        //判断停留在哪个分类
        design.className == "active-checked"?type = 10:type = 20;
        ducument.body.offsetWidth < 1205 ? psize = 15: psize =20;
        connectAjax(pageNow + 1 ,type);
        return pageNow;
        }
    }
}
coursePage();


//切换课程
var design = document.getElementById("tab1"),
    programme = document.getElementById("tab2");
function connectTab(){
    var psize = 20;
    //切换课程类型,绑定两个函数，connectAjax和coursePage
    design.onclick = function(){
        document.body.offsetWidth <1205 ? psize = 15 : psize = 20;
        connectAjax(1,10,psize);
    //调整页码，1为初始化页码位置，10代表分类
    coursePage(1,10);
    design.className = "active-checked";
    programme.className = "";
    }
    programme.onclick = function(){
        connectAjax(1,20,psize);
        coursePage(1,20);
        design.className = "";
        programme.className = "active-checked"
    }
}
connectTab();




//热销课程列表
function connectHot(){
    ajax:ajax({
        method:"get",
        url:"http://study.163.com/webDev/hotcouresByCategory.htm",
        success:function(text){
            //连接成功后进入这里,将JSON数据转为js对象
            var hotList = JSON.parse(text)
            //hotHtml作为每个传递过来的，放在li节点的内容容器
            var hotHtml = '',
            //取UL节点
            hotListHtml = document.getElementById("hotlist");
            for(var i = 0; i < 10; i++){
                 hotHtml += '<li>\
                        <a href="#">\
                            <img src="'+hotList[i].smallPhotoUrl+'" width="50" height="50" alt="'+hotList[i].name+'" />\
                            <p>'+hotList[i].name+'</p>\
                            <span>'+hotList[i].learnerCount+'</span>\
                        </a>\
                     </li>';
                     hotListHtml.innerHTML = hotHtml;
            }
               
        },
        async:true  //异步方式
    });
}
connectHot();

// //代替hover效果，课程介绍
// var courselist = document.getElementById("courselist");
// var courselistLi = courselist.getElementsByTagName("li");
// var courseHover = document.getElementById("course-hover");
// courselistLi.onmouseover = function(){
//     courseHover.style.display="block"
// }




//ajax封装
//浏览器添加事件，兼容性处理,3个形参分别为，obj事件对象，type事件类型，fn事件处理函数
function addEvent(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn,false)  //最大限度兼容浏览器，在冒泡阶段调用
    }else if (obj.attachEvent) {
        obj.attachEvent("on"+type,fn);  //兼容IE8之前的版本，所以要加上“on”
    }
}

//跨域浏览器移除事件，出于安全考虑，JS不允许跨域调用其他页面的对象，即同源政策
function removeEvent(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else if(obj.detachEvent){
        obj.detachEvent("on"+type,fn);
    }
}

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

//名值对转换为字符串
function params(data){
    var arr=[];
    for(var i in data){
        arr.push(encodeURIComponent(i)+"="+encodeURIComponent(data[i]));
    }
    return arr.join("&");
}

//封装ajax
function ajax(obj){
    var xhr = createXHR();
    obj.url = obj.url + "?rand"+Math.random(); //解决浏览器缓存问题
    obj.data = params(obj.data);  //经过转换后的字符串
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
            console.log("获取数据错误！错误代码："+xhr.status+",状态信息:"+statusText);
        }
}

//窗口关闭函数
function maskoff(but,win){
    mask.style.display = "none";
    // win.style.display = "none";
}

//窗口弹出函数
function winopen(){
    mask.style.display = "block";
    // win.style.display = "block";
}

//cookie封装
//设置cookie头信息,将所有属性作为形参
function setCookie(name,value,expires,path,domain,secure){
    var cookieName = encodeURIComponent(name)+"="+encodeURIComponent(value);
    if(expires instanceof Date){
        cookieName += ":expires="+expires;
    }
    if(path){
        cookieName +=";path=" + path;
    }
    if(domain){
        cookieName += ";domain=" + domain;
    }
    if(secure){
        cookieName += ";secure";
    }
    document.cookie = cookieName;
}

//给Cookie添加时间戳
function setCookieDate(day){  //形参为天数
    var date = null;
    if(typeof day =="number" && day>0){
        date = new Date();
        date.setDate(date.getDate()+day);  //当前日期加上形参day
    } else{
        throw new Error("传递的时间不合法！必须为数字且大于0");
    }
    return date;
}

//读取cookie
// function getCookie(name){
//     var cookieName = encodeURIComponent(name) + "=";  //编码后的名加上=
//     var cookieStart = document.cookie.indexOf(cookieName); //在cookie中查找是否有指定的cookieName，cookieStart表示的是符合搜索名的第一个字母的位置，返回值为number
//     var cookieValue = null;
//     if(cookieStart > -1){
//         var cookieEnd = document.cookie.indexOf(";",cookieStart);  //从cookieStart的位置开始查找，直到“；”的位置为止
//         if(cookieEnd == -1){  
//             cookieEnd = document.cookie.length;  //当不存在分号时，获取从cookieStart到最后一个字符的长度
//         }
//         cookieValue = decodeURICompoent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
//     }  //获取对应的cookie值
//     return cookieValue;
// }
