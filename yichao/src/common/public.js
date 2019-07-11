    class Public{
        constructor(){
            this.ali=$(".nav").children("li");
            this.top1=$(".top1");
            this.smallcar=$(".car").children("em")
            this.hover();
            this.change();
        }
        hover(){
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
        }
        change(){
            this.num=localStorage.getItem("shangpin");
            if(this.num){
                this.num=JSON.parse(localStorage.getItem("shangpin"));
                var s=0;
                for(var i=0;i<this.num.length;i++){
                    s+=parseInt(this.num[i].num)
                }
                this.smallcar.html(s)
            }
        }
    }
    
    class Search{
        constructor(){
            
        }
    }