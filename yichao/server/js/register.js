$(function(){
    $("#top").load("public.html .ding");
    $("#header").load("public.html .tou");
    $("#footer").load("public.html .footbox");


    class Register{
        constructor(){
            this.user=$(".user");
            this.pass1=$(".pass1");
            this.pass2=$(".pass2");
            this.btn=$(".btn");
            this.init();
        }
        init(){
            var that=this;
            this.btn.click(function(){
                // 先获取指定的localstroage，用来判断是不是第一次注册
                that.getUserMsg()
            })
        }
        getUserMsg(){
            // 获取localstroage里面的usermsg
            this.usermsg=localStorage.getItem("usermsg");
            console.log(this.usermsg);
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
                        this.user.next().html("用户名重复")
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
        }
    }

    onload=function(){
        new Register();
    }
})