
$(function(){
    $("#top").load("common/public.html .ding",function(){
        new Public;
    })
    $("#header").load("common/public.html .tou")
    $("nav").load("common/public.html .bignav")
    $("#footer").load("common/public.html .footbox")


    class Fang{
        constructor(){
            this.sbox=$(".sbox");
            this.span=$(".sbox").find("span");
            this.oul=$(".zuo").find("ul");
            this.bbox=$(".bbox");
            this.bimg=$(".bbox").children("img")
            this.btn=$(".btn");
            this.myajax();
            this.add();
        }
        myajax(){
            var that=this;
            $.ajax({
                url:"http://localhost:8383/data/img.json",
                success:function(res){
                    that.res=res;
                    that.display();
                }
            })
            $.ajax({
                url:"http://localhost:8383/data/city.json",
                success:function(res){
                    that.res=res;
                    that.citydisplay();
                }
            })
        }
        citydisplay(){
            var str="";
            for(var i=0;i<this.res.length;i++){
                str+=`<li><a href="##">${this.res[i].key}</a></li>`;
            }
            $(".city2").html(str);
        }
        display(){
            this.spId=localStorage.getItem("spId");
            var index;
            var str="";
            for(var i=0;i<this.res.length;i++){
                index=i;
                for(var j=0;j<this.res[index].goods.length;j++){
                   if(this.spId==this.res[index].goods[j].bm){
                       str=`<img src="${this.res[index].goods[j].img}" index="${this.res[i].goods[j].bm}"/>
                       <span></span>
                       `;
                       $(".sbox").html(str)
                   }
                }
            }
        }
        add(){
            var that=this;
            this.sbox.on("mouseover",function(){
                that.show();
                that.init();
            })
            this.oul.on("click","li",function(){
                $(this).addClass("active")
                .siblings().removeClass("active");
                var src=$(this).find("img").attr("src");
                console.log(src)
                $(".sbox").children("img").attr("src",src)
                that.bimg.attr("src",src)
            })
            this.sbox.on("mousemove",function(){
                that.move(event)
            })
            this.sbox.on("mouseout",function(){
                that.hide();
            })
            this.btn.on("click",function(){
                that.setGoods();
            })
        }
        setGoods(){
            this.id=localStorage.getItem("spId");
            this.goods=localStorage.getItem("shangpin");
            if(this.goods){
                this.goods=JSON.parse(this.goods);
                var onoff=true;
                for(var i=0;i<this.goods.length;i++){
                    if(this.goods[i].id==this.id){
                        this.goods[i].num++;
                        onoff=false;
                    }
                }
                if(onoff){
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            }else{
                this.goods=[{
                    id:this.id,
                    num:1
                }]
            }
            localStorage.setItem("shangpin",JSON.stringify(this.goods))
        }
        init(){
            var w=this.bimg.width()/this.bbox.width();
            var h=this.bimg.height()/this.bbox.height();
            this.span.css({
                width:parseInt(this.sbox.width()/w),
                height:parseInt(this.sbox.width()/h)
            })
        }
        show(){
            this.bbox.css("display","block");
            this.span.css("display","block");
        }
        move(e){
            var l=e.pageX-this.sbox.offset().left-this.span.width()/2;
            var t=e.pageY-this.sbox.offset().top-this.span.height()/2;
            if(l<0) l=0;
            if(t<0) t=0;
            if(l>this.sbox.width()-this.span.width()){
                l=this.sbox.width()-this.span.width();
            }
            if(t>this.sbox.height()-this.span.height()){
                t=this.sbox.height()-this.span.height();
            }
            this.span.css({
                left:l,
                top:t
            })
            var x=l/(this.sbox.width()-this.span.width());
            var y=t/(this.sbox.height()-this.span.height());
            this.bimg.css({
                left:x*-(this.bimg.width()-this.bbox.width()),
                top:y*-(this.bimg.height()-this.bbox.height())
            })
        }
        hide(){
            this.bbox.css("display","none");
            this.span.css("display","none");
        }
    }
    onload=function(){

        new Fang;
    }

})