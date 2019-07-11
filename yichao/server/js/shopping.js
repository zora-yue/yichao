$(function(){
$("#top").load("common/public.html .ding")
$("#header").load("common/public.html .tou")

class Car{
    constructor(){
        this.mm=document.querySelector(".m-l");
        this.wu=document.querySelector(".wu");
        this.cont=document.getElementById("cont")
        this.url="http://localhost:8383/data/img.json";
        // console.log(this.wu)
        this.init()
        this.addEvent();
        
    }
    init(){
        var that=this;
        ajax({
            url:this.url,
            success:function(res){
                // console.log(res)
                that.res=JSON.parse(res)
                that.getGoods()
            }
        })
    }
    getGoods(){
        this.goods=JSON.parse(localStorage.getItem("shangpin"));
        this.display();
        this.checkall();
        this.kong();
    }
    display(){
        // console.log(this.goods)
        var str="";
        var index;
        for(var i=0;i<this.res.length;i++){
            index=i;
            for(var p=0;p<this.res[index].goods.length;p++){
                for(var j=0;j<this.goods.length;j++){
                    if(this.res[index].goods[p].bm==this.goods[j].id){
                            str+=`<div class="goods" index="${this.goods[j].id}">
                        <div class="goods1">
                        <input type="checkbox" class="check">
                        <img src="${this.res[index].goods[p].img}" alt="">
                        <span>${this.res[index].goods[p].name}</span>
                        </div>
                        <p class="ji"><i>积</i> ${parseInt(this.res[index].goods[p].price)}</p>
                        <div class="money">
                            <s></s>
                           <span>${this.res[index].goods[p].price}</span><b></b>
                        </div>
                        <input type="number" value="${this.goods[j].num}" class="num" min=1>
                        <p class="xiaoji">${this.res[index].goods[p].price}</p>
                        <div class="buy">
                            <a href="##">立即购买</a>
                            <span class="del">删除</span>
                        </div>
                    </div>`;  
                        
                    }
                }
            }
        }
        this.mm.innerHTML=str;
    }
    addEvent(){
        var that=this;
        this.mm.addEventListener("click",function(eve){
            var e=eve||window.event;
            var target=e.target||e.srcElement;
            if(target.className=="del"){
                // console.log(target)
                // console.log(target.parentNode.parentNode.getAttribute("index"))
                that.id=target.parentNode.parentNode.getAttribute("index");
                target.parentNode.parentNode.remove();
                // that.remove();
                that.changeNum(function(i){
                    that.goods.splice(i,1);
                })
            }
        })
        this.mm.addEventListener("input",function(eve){
            var e=eve||window.event;
            var target=e.target||e.srcElement;
            if(target.type=="number"){
                // console.log(target.value)
                that.id=target.parentNode.getAttribute("index");
                // that.num=target.value;
                // that.setCookie();
                that.changeNum(function(i){
                    that.goods[i].num=target.value;
                })
            }
        })
    }
    changeNum(callback){
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id==this.id){
                callback(i)
            }
        }
        localStorage.setItem("shangpin",JSON.stringify(this.goods))
        this.kong()
    }
    kong(){
        if(this.goods.length==0){
            this.wu.style.display="block";
            this.cont.style.display="none";
        }
    }
    checkall(){
        // console.log($("#allcheck"))
        var that=this;
        $("#allcheck").click(function(){
            // console.log($("#allcheck"))
            if(document.getElementById("allcheck").checked){
                that.oneCheck=$(".check");
                // console.log(oneCheck)
                for(var i=0;i<that.oneCheck.length;i++){
                    that.oneCheck[i].checked=true;
                    that.oneCheck.eq(i).attr("checked","checked");
                }
                that.setPrice();
            }else{
                var oneCheck=$(".check");
                for(var i=0;i<oneCheck.length;i++){
                    oneCheck[i].checked=false;
                    oneCheck.eq(i).attr("checked",false);
                }
                $(".zongjia").html(0);
            }
        })
    }
    setPrice(){
        var str=0;
        var n=0;
        var index;
        for(var s=0;s<this.res.length;s++){
            index=s;
            for(var k=0;k<this.res[index].goods.length;k++){
                for(var j=0;j<this.goods.length;j++){
                    if(this.res[index].goods[k].bm==this.goods[j].id){
                    var p=parseInt(this.res[index].goods[k].price)
                    str+=p*this.goods[j].num;
                    n+=parseInt(this.goods[j].num)
                    $(".zongjia").html(str);
                    $(".liang").html(n);
                }
                }
            }
        }
    }
}
onload=function(){
    new Car();
}
})