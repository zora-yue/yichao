    class Public{
        constructor(){
            this.ali=$(".nav").children("li");
            this.top1=$(".top1");
            this.hover();
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
    }
    
