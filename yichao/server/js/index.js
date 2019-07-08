
$(function(){
    $("#top").load("public.html .ding");
    $("#header").load("public.html .tou");
    $("#footer").load("public.html .footbox");
    // 页面渲染
    class Shop{
        constructor(){
            this.ali=$(".nav").children("li");
            this.box=$(".goods");
            this.gucci=$(".gucci").children("ul");
            this.louti=$(".kuai");
            this.top1=$(".top1");
            this.init();
            this.hover();
        }
        init(){
            // 商品图渲染
            var that=this;
            $.ajax({
                url:"http://localhost:8383/data/img.json",
                success:function(res){
                    that.res=res;
                    that.display();
                }
            })
            // 城市三级菜单渲染
            $.ajax({
                url:"http://localhost:8383/data/city.json",
                success:function(res){
                    that.res=res;
                    that.cityDisplay();
                }
            })
            // 商品品牌
            $.ajax({
                url:"http://localhost:8383/data/f8img.json",
                success:function(res){
                    that.res=res;
                    that.f8Display();
                }
            })
        }
        hover(){
            // 城市三级菜单
            this.ali.hover(function(){
                $(this).css({
                  background:"#686868"
             }).children(".allstore").css("display","block")
            },function(){
                $(this).css({
                    background:"#222"
                }).children(".allstore").css("display","none")
               })
            this.ali.on("click",".shoparea",function(){
                $(this).siblings().toggle()
            })

            this.top1.children("li").hover(function(){
                $(this).children("div").css("display","block")
            },function(){
                $(this).children("div").css("display","none")
            })
                this.init()
        }
        display(){
            
            for(var i=0;i<this.res.length;i++){
                var str="";
                    str+=`
                    <div class="zuo1">
                    <img src="${this.res[i].mainimg}" alt="">
                    </div>
                    <ul class="you1">
                    `;
                    for(var j=0;j<this.res[i].goods.length;j++){
                        str+=`
                        <li><a href="##"><img src="${this.res[i].goods[j].img}" alt=""></a><p class="p1">${this.res[i].goods[j].name}<br><span>${this.res[i].goods[j].price}</span></p><p class="p2">${this.res[i].goods[j].tcp}</p></li>
                        `;
                    }
                    str+=`</ul>`;
                    if(this.res[i].id=="1"){
                        this.box.eq(0).html(str)
                        this.addEvent(0)
                    }
                    if(this.res[i].id=="2"){
                        this.box.eq(1).html(str)
                        this.addEvent(1)
                    }
                    if(this.res[i].id=="3"){
                        this.box.eq(2).html(str)
                        this.addEvent(2)
                    }
                    if(this.res[i].id=="4"){
                        this.box.eq(3).html(str)
                        this.addEvent(3)
                    }
                    // this.addEvent()
            }
        }
        cityDisplay(){
            var str="";
            for(var i=0;i<this.res.length;i++){
                str+=`
                 <div class="cityWrap">
                <div class="shoparea">${this.res[i].key}</div>
                <div class="shoplist">
                `;
                for(var j=0;j<this.res[i].value.length;j++){
                    str+=`
                    <a href="##">${this.res[i].value[j]}</a>
                `;
                }
                str+=`</div>
                </div>`;
                
            }
            this.ali.find("div").html(str);
            this.addEvent();
        }
        f8Display(){
            // console.log(this.res)
            var str="";
            for(var i=0;i<this.res.length;i++){
                str+=`
                <li>
                <div class="img" style="background:url(${this.res[i].bg}) no-repeat">
                    <img src="${this.res[i].meng}"/>
                <div>
                </li>
                `;
            }
            this.gucci.html(str);
            this.addEvent();
        }
        addEvent(n){
            var that=this;
            this.box.eq(n).on("mouseover.mo","li",function(eve){
                $(this).children(".p2").stop().animate({
                    bottom:0
                },300)
                .parent().siblings().children(".p2").stop().animate({
                    bottom:-100
                })
                return false;
            })
            this.box.eq(n).on("mouseout.out","li",function(){
                $(this).children(".p2").stop().animate({
                    bottom:-100
                },300)
            })
            this.gucci.find(".img").hover(function(){
                $(this).find("img").css("display","none")
            },function(){
                $(this).find("img").css("display","block")
            })

            this.louti.children("li").click(function(){
                that.kuai()
            })
        }
        
        kuai(){
            $("html").animate({
                scrollTop:$(".f1").offset().top
                
            })
        }
    }


    onload=function(){
        new Shop();
    }
})