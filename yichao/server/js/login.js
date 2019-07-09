$(function(){
    $("#top").load("public.html .ding",function(){
        new Public;
    })
    $("#header").load("public.html .tou")
    $("#footer").load("public.html .footbox")


    class Login{
        constructor(){
            this.user=$(".user");
            this.pass=$(".pass");
            this.btn=$(".btn");
            this.init();
        }
        init(){
            var that=this;
            this.btn.click(function(){
                that.getUserMsg();
            })
        }
        getUserMsg(){
            this.usermsg=localStorage.getItem("usermsg")?JSON.parse(localStorage.getItem("usermsg")):[];
            this.check();
        }
        check(){
            // console.log(this.btn.nextAll("p"))
            for(var i=0;i<this.usermsg.length;i++){
                if(this.usermsg[i].user==this.user.val()&&this.usermsg[i].pass==this.pass.val()){
                    console.log(1)
                    this.usermsg[i].onoff=1;
                    this.btn.nextAll("p").html("登录成功，3秒后自动跳转");
                    setTimeout(() => {
                        location.href="index.html";
                    }, 3000);
                    return;
                }
            }
            this.btn.nextAll("p").html("账号或密码错误");
            this.btn.nextAll("p").css({
                color:"red"
            })

        }
    }
    onload=function(){
        new Login;
    }
})