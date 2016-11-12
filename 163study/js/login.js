//窗口登录
//获取登录窗口节点
var login = document.getElementById("login");
var loginoff = document.getElementById("loginoff");
var mask = document.getElementById("mask");
var prompt = document.getElementById("tips");
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


//判断Cookie，loginSuc是否存在
function getLoginSuc(){
    //点击关注按钮
    gz.onclick = function(){
        if(getCookie("followSuc")){
            gz.style.display = "none";
            ygz.style.display = "block";
            fs.style.display = "block";
        }else {
            //显示登录框，隐藏video窗口
         mask.style.display = "block";
         loginoff.style.display = "block";
         video.style.display = "none";
            //点击关闭按钮，关闭登录框
            loginoff.onclick = function(){
                mask.style.display = "none";
                loginoff.style.display = "none";
                // maskoff(loginoff,login);
            };
            loginFun();
        }
    };
}
getLoginSuc();

//登录表单验证,判断input所输入的内容是否符合预设条件
function loginFun(){
    var userVerify = false,
        pawordVerify = false;
    function clickVerify(){
        if(userName.value.length > 3 && userName.value.length < 17){
            prompt.innerHTML = "用户名符合";
            prompt.style.color = "#189f36";
            userVerify = true;
        }else{
            prompt.innerHTML = "用户名不正确，请输入3-16位的用户名"
            prompt.style.color = "";
            userVerify = false;
             }
       if(password.value.length >= 6){
            prompt.innerHTML = "密码符合要求";
            prompt.style.color = "#189f36";
            pawordVerify = true;        
    } else {
            prompt.innerHTML = "密码不符合要求";
            prompt.style.color = "";
            pawordVerify = false; 
          }
}

//验证焦点移出input时，内容是否符合条件
function blurVerify(){
        //输入框失去焦点，开始验证
        userName.onblur = function(){
            if(userName.value.length > 4 && userName.value.length < 17){
                prompt.innerHTML = "用户名符合";
                prompt.style.color = "#189f36";
                userVerify = true;
                submit.disabled = false;
            } else {
                prompt.innerHTML = "用户名不合要求";
                prompt.style.color = "";
                userVerify = false;
            }
        }
        //输入框失去焦点，开始验证
        password.onblur = function(){
            if(password.value.length >= 6 && userName.value.length > 4 && userName.value.length <17){
                prompt.innerHTML = "用户名和密码都符合";
                prompt.style.color = "#189f36";
                pawordVerify = true;
                submit.disabled = false;
            } else {
                prompt.innerHTML = "密码或用户名不正确";
                prompt.style.color = "";
                pawordVerify = false;
            }
        }
    }
blurVerify();

//点击提交按钮
submit.onclick = function(){
        //验证输入内容是否符合预设要求
        clickVerify();
        if(userVerify && pawordVerify){
            submit.disabled = false;
            ajax({
                method:"get",
                url:"http://study.163.com/webDev/login.htm",
                async:true, //异步
                data:{
                    userName:md5(userName.value),
                    password:md5(password.value),
                    // "userName": "studyOnline",
                    // "password": "study.163.com"
                },
                //登陆成功，返回1，不成功返回0
                success:function(text){
                    if(text == 0){
                        mask.style.display = "block";
                        login.style.display = "block";
                        prompt.style.display ="block";
                        prompt.style.color = "red";
                        prompt.innerHTML = "登录失败，用户名或密码错误，请重新登陆！";

                    }else {
                    //写入cookie
                    setCookie("loginSuc","login",setCookieDate(10));
                    //关闭登录窗口
                    maskoff(loginoff,login);
                    //隐藏关注按钮
                    gz.style.display = "none";
                    //发送关注请求
                    ajax({
                        method:"get",
                        async:true,
                        url:'http://study.163.com/webDev/attention.htm',
                        success:function(text){
                            setCookie("followSuc","followSuc",setCookieDate(10));
                            ygz.style.display = "block";
                        },
                    });
                    fs.style.display = "block";
                    }

                },
                    
            });
        } else if(userName.value == ""){
            prompt.style.display = 'block';
            prompt.innerHTML = "用户名或密码不能为空！";
            //阻止表单提交
            submit.disabled = true;
        }else {
            prompt.style.display = "block";
            prompt.innHTML = "用户名或密码有误，请重新输入！";
            //阻止表单提交
            submit.disabled = true;
        }
    };
}


   