
$(function(){
    $("#top").load("common/public.html .ding",function(){
        // new Public;
    });
    $("#header").load("common/public.html .tou");
    $("#footer").load("common/public.html .footbox");
    // 页面渲染
    class Shop{
        constructor(){
            this.ali=$(".nav").children("li");
            this.box=$(".goods");
            this.gucci=$(".gucci").children("ul");
            this.louti=$(".kuai");
            this.top1=$(".top1");
            this.aspan=$(".f22").children("span");
            this.txt=$(".txt");
            this.menu=$(".box1");
            this.banner2=$(".banner2");
            this.banner1=$("#banner1").children(".imgbox");
            this.deng();
            this.init();
            this.hover();
            this.add();
            this.search();
            // this.aspan.on("mouseover",function(){
            //     console.log($(this))
            //     $(this).toggleClass("active2")
            //     })
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
            $.ajax({
                url:"http://localhost:8383/data/menu.json",
                success:function(res){
                    that.res=res;
                // console.log(res)
                that.adsieDisplay();
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
                // this.init()
        }
        adsieDisplay(){
            var str="";
            // 商品分类渲染
            for(var i=0;i<this.res.length;i++){
                str+=`
                <li>
                    <a href="##"  class="list2"><i class="icon${i+1}"></i>${this.res[i].name}<b class="iconfont icon-jiantou"></b></a>
                    <div class="cl-content"><dl class="cl-c-list">
                `;
                // console.log(this.res[i].name)
                for(var key in this.res[i].bt){
                    // console.log(this.res[i].bt[key])
                    str+=`
                    <dt class="red">${key}</dt>
                    <dd>
                    `;
                    // console.log(key)
                    for(var j=0;j<this.res[i].bt[key].length;j++){
                        // console.log(this.res[i].bt[key][j])
                        str+=`<a href="##" target="">${this.res[i].bt[key][j]}</a>`;
                    }
                    str+=`</dd>`; 
                }

                str+=`
                </dl><div class="clear"></div></div>
                `;
                // console.log(str)
            }
            str+=`<li><a href="##" class="list2"><i class="icon8"></i>国际品牌</a></li>
            <li><a href="##" class="list2"><i class="icon9"></i>老花镜</a></li>
            <li><a href="##" class="list2"><i class="icon10"></i>眼镜配件</a></li>`;
            this.menu.html(str)
            // console.log(str)
            this.mhover();
        }
        mhover(){
            // 商品分类的鼠标滑过效果
            this.menu.on("mouseover","li",function(){
                $(this).css({
                    border:"1px solid #b91c2b"
                }).siblings().css({
                    border:"1px solid #ddd"
                }).end().children(".cl-content").css("display","block")
                .siblings(".cl-content").css("display","none")
            })
            this.menu.on("mouseout","li",function(){
                $(this).css({border:"1px solid #ddd"})
                .children(".cl-content").css("display","none")
            })

        }
        display(){
            // 主页商品渲染
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
                        <li><a href="details.html" index=${this.res[i].goods[j].bm}><img src="${this.res[i].goods[j].img}" alt="" class="tiao"></a><p class="p1">${this.res[i].goods[j].name}<br><span>${this.res[i].goods[j].price}</span></p><p class="p2">${this.res[i].goods[j].tcp}</p></li>
                        `;
                    }
                    str+=`</ul>`;
                    switch(this.res[i].id){
                            case "1":this.box.eq(0).html(str);this.addEvent(0);
                            case "1-2":this.box.eq(1).html(str);this.addEvent(1);
                            case "1-3":this.box.eq(2).html(str);this.addEvent(2);
                            case "2":this.box.eq(3).html(str);this.addEvent(3)
                            case "3":this.box.eq(4).html(str);this.addEvent(4);
                            case "4":this.box.eq(5).html(str);this.addEvent(5);break;
                    }
            }
            this.show()
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

        }
        search(){
            
        }

        show(){

            this.aspan.on("mouseover",function(){
                console.log($(this).parent().parent().siblings(".f2-shop1"))
                $(this).attr("class","active2")
                .siblings().attr("class","")
                .parent().parent().siblings(".f2-shop1").eq($(this).index()).css("display","block")
                .siblings(".f2-shop1").css("display","none")
                })
            

        }
        add(){
            var that=this;
            this.louti.children("li").click(function(){
                if($(this).attr("class")=="last"){
                    $("html").animate({
                        scrollTop:$("#header").offset().top
                    })
                }else{
                        $("html").animate({
                            scrollTop:$(".box").eq($(this).index()).offset().top
                        })
                }
            })  
            this.banner2.banner({
                items:this.banner2.children(".imgbox"),
                list:true,
                autoplay:true
            })
            this.banner1.banner({
                items:this.banner1.children("a"),
                left:this.banner1.children(".left"),
                right:this.banner1.children(".right"),
                // autoplay:true
            })
            this.banner1.hover(function(){
                $(this).children(".left").css({
                    display:"block"
                })
                $(this).children(".right").css({
                    display:"block"
                })
            },function(){
                $(this).children(".left").css({
                    display:"none"
                })
                $(this).children(".right").css({
                    display:"none"
                })
            })
            this.box.on("click",function(){
                if(event.target.className=="tiao"){
                    that.id=event.target.parentNode.getAttribute("index");
                    localStorage.setItem("spId",that.id)
                }
            })
        }
        deng(){
            this.msg=localStorage.getItem("usermsg")?JSON.parse(localStorage.getItem("usermsg")):[];
            var num=0;
                for(var i=0;i<this.msg.length;i++){
                    if(this.msg[i].onoff==1){
                        this.shop=localStorage.getItem("shangpin")?JSON.parse(localStorage.getItem("shangpin")):[];
                        for(var j=0;j<this.shop.length;j++){
                            num+=parseInt(this.shop[j].num)
                            console.log(num)
                        }
                        $(".car").children("em").html(num);

                    }

                    
                    
            }
        }

    }


    onload=function(){
        
        new Shop();
        
    }
})