$(function(){
    $("#top").load("common/public.html .ding");
    $("#header").load("common/public.html .tou");
    $("#footer").load("common/public.html .footbox");


    class Register{
        constructor(){
            this.user=$(".user");
            this.pass1=$(".pass1");
            this.pass2=$(".pass2");
            this.btn=$(".btn");
            this.init();
            this.add();
        }
        add(){
            var that=this;
            this.user.on("mousedown",function(){
                $(this).next().html("请输入手机/邮箱").css({color:"#ccc"});
                $(this).blur(function(){
                    var reg=/^(1[3-9]\d{9})|(?:[0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
                    if($(this).val()==""||!reg.test($(this).val())){
                        $(this).next().html("请输入邮箱/手机号码！").css({color:"red"});
                    }else{
                        $(this).next().html("");
                        that.a=1
                    }
                    
                })
            })
            this.pass1.on("mousedown",function(){
                $(this).next().html("6-16位字符，可用数字、字母或符号的组合").css({color:"#ccc"})
                $(this).blur(function(){
                    var reg=/^[\w\W]{6,16}$/g;
                    if($(this).val()==""||!reg.test($(this).val())){
                        $(this).next().html("请输入密码！").css({color:"red"});
                    }else{
                        $(this).next().html("");
                        that.b=1
                    }
                    if(that.pass2.val()!=""){
                        if($(this).val()==that.pass2.val()){
                            that.pass2.next().html("")
                        }else{
                            that.pass2.next().html("两次密码输入不一致！").css({color:"red"})
    
                        }
                        }
                })
            })
            this.pass2.on("mousedown",function(){
                $(this).next().html("请再次输入登录密码，两次输入必须一致").css({color:"#ccc"})
                $(this).blur(function(){
                    if($(this).val()==that.pass1.val()){
                        $(this).next().html("");
                        that.c=1
                    }else{
                        $(this).next().html("两次密码输入不一致！").css({color:"red"})
                    }
                })
            })
        }
        init(){
            var that=this;
            this.btn.click(function(){
                if(that.a+that.b+that.c==3){
                    that.getUserMsg()
                }
                // 先获取指定的localstroage，用来判断是不是第一次注册
            })
        }
        getUserMsg(){
            // 获取localstroage里面的usermsg
            this.usermsg=localStorage.getItem("usermsg");
            this.setUserMsg()
        }
        setUserMsg(){
            if(this.usermsg==null){
                // 第一次
                this.usermsg=[{
                    user:this.user.val(),
                    pass:this.pass1.val(),
                    onoff:0
                }]
                this.user.next().html("")
            }else{
                // 不是第一次;获取值同时专成数组
                this.usermsg=JSON.parse(localStorage.getItem("usermsg"));
                for(var i=0;i<this.usermsg.length;i++){
                    if(this.usermsg[i].user==this.user.val()){
                        this.user.next().html("该用户名已注册").css("color","red")
                        return;
                    }
                }
                this.user.next().html("")
                this.usermsg.push({
                    user:this.user.val(),
                    pass:this.pass1.val(),
                    onoff:0
                })
            }
            localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
            this.success();
        }
        success(){
            $(".box").append($("<div class='success'></div>"));
                    $(".success").css({
                        position:"absolute",
                        width:300,
                        height:200,
                        top:"20%",
                        left:"40%",
                        border:"1px solid #eee"
                    }).append("<p>注册成功，3秒后自动进入登录页面</p>")
                    .children().css({
                        textAlign: "center",
                        font: '16px/25px ""',
                        marginTop: "60px",
                        color: "#41f85f"
                    })
                    setTimeout(function(){
                        location.href="login.html"
                    },3000)
        }
    }

    onload=function(){
        new Register();
    }
})