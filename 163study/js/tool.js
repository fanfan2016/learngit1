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

// //ajax封装
// //XHR支持检测
// function createXHR(){
//     if(typeof XMLHttpRequest != "undefined"){
//         return new XMLHttpRequest();
//     }else if (typeof ActiveXObject != "undefined"){
//         var version = [
//         "MSXML2.XMLHttp.6.0",
//         "MSXML2.XMLHttp.3.0",
//         "MSXML2.XMLHttp",
//         ];
//         for(var i=0;i<version.length;i++){
//             try{
//                 return new ActiveXObject(version[i]);
//             } catch(e){
//                 //跳过
//             }
//         }
//     } else{
//         throw new Error("您当前的系统或浏览器不支持XHR对象！")
//     }
// }

//名值对转换为字符串
// function params(data){
//     var arr=[];
//     for(var i in data){
//         arr.push(encodeURIComponent(i)+"="+encodeURIComponent(data[i]));
//     }
//     return arr.join("&");
// }

//封装ajax
// function ajax(obj){
//     var xhr = createXHR();
//     obj.url = obj.url + "?rand"+Math.random(); //解决浏览器缓存问题
//     obj.data = params(obj.data);  //经过转换后的字符串
//     if(obj.method === "get")obj.url +=obj.url.indexOf("?") == -1?"?"+obj.data:"&"+obj.data;
//     if(obj.async === true){
//         xhr.onreadystatechange = function(){
//             if(xhr.readyState == 4){  //浏览器和服务器进行到4,读取完成
//                 callback();
//             }
//         };
//     }
//     xhr.open(obj.method,obj.url,obj.async);  //open方法，传入三个参数，开启一个请求，准备发送
//     if(obj.method === "post"){
//         xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  //修改HTTP头，设置客户端提交给服务器文本内容的编码方式为URL编码
//         xhr.send(obj.data);
//     }else {
//         xhr.send(null); //正式向服务器发起请求，null表示不需要请求主体发送数据
//     }
//     if(obj.async === false){  //同步
//         callback();
//     }
//     function callback(){
//         if(xhr.status == 200){   //http返回码为200，表示读取成功
//             obj.success(xhr.responseText);  //回调传递参数
//         }else {
//             console.log("获取数据错误！错误代码："+xhr.status+",状态信息:"+statusText);
//         }
// }

//窗口关闭函数
function maskoff(btn,win){
    mask.style.display = "none";    //  遮罩关闭
    win.style.display = "none";     //  内容窗口关闭
}

//窗口弹出函数
function winopen(btn,win){
    mask.style.display = "block";
    win.style.display ="block";
}

//cookie封装
//设置cookie头信息,将所有属性作为形参
function setCookie(name,value,expires,path,domain,secure){
    var cookieName = encodeURIComponent(name)+"="+encodeURIComponent(value);
    if(expires instanceof Date){
        cookieName += ";expires="+expires.toGMTString();  //将Date对象转为字符串
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
function setCookieDate(day){  //形参day为天数
    var date = null;
    if(typeof day =="number" && day>0){
        date = new Date();
        date.setDate(date.getDate()+day);  //当前日期加上day
    } else{
        throw new Error("传递的时间不合法！必须为数字且大于0");
    }
    return date;
}

//读取cookie
function getCookie(name){
    var cookieName = encodeURIComponent(name) + "=";  //编码后的名加上=
    var cookieStart = document.cookie.indexOf(cookieName); //在cookie中查找是否有指定的cookieName，cookieStart表示的是符合搜索名的第一个字母的位置，返回值为number
    var cookieValue = null;
    if(cookieStart > -1){
        var cookieEnd = document.cookie.indexOf(";",cookieStart);  //从cookieStart的位置开始查找，直到“；”的位置为止
        if(cookieEnd == -1){  
            cookieEnd = document.cookie.length;  //当不存在分号时，获取从cookieStart到最后一个字符的长度
        }
        cookieValue = decodeURICompoent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
    }  //获取对应的cookie值
    return cookieValue;
}

//getElementsByClassName兼容IE的方法
// function getElementsByClassName(ele,name){
//     if(ele.getElementsByClassName){
//         return ele.getElementsByClassName(name);
//     } else {
//         //获取所有后代元素
//         var children = (ele || document).getElementsByTagName("*");
//         var elements = [];
//         for(var i=0, i < children.length ;i++ ){
//             var child = children[i];
//             var classNames = child.className.split("");
//             for(var j=0 ; j<className.length;j++){
//                 if(classNames[j] === name){
//                     elemetns.push(child);
//                     break;
//                 }
//             }
//         }
//         return elements;
//     }
// }