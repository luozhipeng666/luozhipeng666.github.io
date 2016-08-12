/**
 * Created by Administrator on 2016/8/11.
 */
window.onload=function(){
    //导航搜索...
    (function(){
        var arrText=[
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        var num=0;
        var bar=document.getElementById('bar');
        var form=document.getElementById('form');
        var oText=getClass(form,'text')[0];
        var aLi=bar.getElementsByTagName('li');
        //oText.value='';
        for(var i=0; i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                for(var i=0; i<aLi.length; i++){
                    aLi[i].className='';
                }
                this.className='active';
                oText.value='';
                oText.value=arrText[this.index];
                num=this.index;
            }
        }
        oText.onfocus=function(){
            if(this.value==arrText[num]){
                this.value='';
            }
        };
        oText.onblur=function(){
            if(this.value==''){
                this.value=arrText[num];
            }
        }
    })();
    //undate...
    (function(){
        var arrData = [
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'javascript:;' },
            { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'javascript:;' },
            { 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'javascript:;' },
            { 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'javascript:;' },
            { 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'javascript:;' },
            { 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'javascript:;' },
            { 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'javascript:;' },
            { 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'javascript:;' }
        ];
        var update=document.getElementById('update');
        var oUl=update.getElementsByTagName('ul')[0];
        var up=getClass(update,'triangle_up')[0];
        var down=getClass(update,'triangle_down_red')[0];
        var aLi=oUl.getElementsByTagName('li');
        var iH=aLi[0].offsetHeight;
        var iNow=0;
        var str='';
        var onOff=true;
        var timer=null;
        oUl.innerHTML='';
        for(var i=0; i<arrData.length; i++){
            str+='<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong><span>'+arrData[i].time+'</span>写了一篇新文章：'+arrData[i].title+'</a></li>';
        }
        oUl.innerHTML=str;
        up.onclick=function(){
            if(onOff){
                doMove(-1);
            }
            onOff=false;
        };
        down.onclick=function(){
            if(onOff){
                doMove(1);
            }
            onOff=false;
        };
        update.onmouseover=function(){
            clearInterval(timer);
        };
        update.onmouseout=function(){
            autoPlay();
        };
        function autoPlay(){
            timer=setInterval(function(){
                doMove(-1);
            },3000)
        }
        autoPlay();
        function doMove(num){
            iNow+=num;
            if(Math.abs(iNow)>arrData.length-1){
                iNow=0;
                oUl.style.top=0+'px';
            }
            if(iNow>0){
                iNow=-(arrData.length-1)
            }
            console.log(iNow);
            mTween(oUl,{'top':iNow*iH},300,'elasticBoth',function(){
                onOff=true;
            });
        }
    })();
    //tabCon 切换
    (function(){
        function Drag(id){
            this.tabCon=document.getElementById(id);
            this.oUl1=getClass(this.tabCon,'options_tab')[0];
            this.aDiv=getClass(this.tabCon,'tabCon1');
            this.aLi=this.oUl1.getElementsByTagName('li');
            this.aS=this.oUl1.getElementsByTagName('a');
            this.str=this.aLi[0].getAttribute('class').split(' ')[1];
            this.oldLi=this.aLi[0];
            this.obj=null;
        }
        Drag.prototype.tab=function(){
            var _this=this;
            for(var i=0; i<this.aLi.length; i++){
                this.aLi[i].index=i;
                this.aLi[i].onclick=function(){
                    _this.oldLi.setAttribute('class','gradient '+_this.str);
                    _this.str=this.getAttribute('class').split(' ')[1];
                    _this.obj=this.getElementsByTagName('a')[0];
                    for(var i=0; i<_this.aLi.length; i++){
                        _this.aS[i].className='triangle_down_gray';
                        _this.aDiv[i].style.display='none';
                    };
                    _this.aDiv[this.index].style.display='block';
                    _this.obj.className='triangle_down_red';
                    if(this.getAttribute('class').split(' ')[0]=='gradient'){
                        this.setAttribute('class','active '+_this.str);
                    }
                    _this.oldLi=this;
                    _this.str=this.getAttribute('class').split(' ')[1];
                }
            }
        };
        var tabCon1=new Drag('tabCon1');
        tabCon1.tab();
        console.log(tabCon1.aLi[0].getAttribute('class').split(' '));
        console.log(tabCon1.aDiv);
        var tabCon2=new Drag('tabCon2');
        tabCon2.tab();
    })();
    //tab 切换
    (function(){
        tab($('.tab'),$('.list_con1'));
        tab($('.tab1'),$('.list_con2'));

        function tab(tabNav,tabCon){
            var aLi=tabNav.find('li');
            var aUl=tabCon.children();
            console.log(aLi.length)
            aUl.hide().eq(0).show();
            aLi.each(function(index){
                $(this).on('mouseover',function(){
                    aLi.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    aLi.find('a').attr('class','triangle_down_gray');
                    $(this).find('a').attr('class','triangle_down_red');
                    aUl.hide().eq(index).show();
                });
            });
        }
    })();
    //BBS论坛
    (function(){
        var oL=getClass(document,'bbs_list')[0];
        var aLi=oL.getElementsByTagName('li');
        console.log(aLi);
        for(var i=0; i<aLi.length; i++){
            aLi[i].onmouseover=function(){
                for(var i=0; i<aLi.length; i++){
                    aLi[i].className='';
                }
                this.className='active';
            };
        }
    })();
    //红人烧客
    (function(){
        var arr = [
            '',
            '用户1<br />人气1',
            '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
            '用户3<br />人气3',
            '用户4<br />人气4',
            '用户5<br />人气5',
            '用户6<br />人气6',
            '用户7<br />人气7',
            '用户8<br />人气8',
            '用户9<br />人气9',
            '用户10<br />人气10'
        ];
        var oUl=getClass(document,'hot_lis')[0];
        var aLi=oUl.getElementsByTagName('li');
        var oP=oUl.getElementsByTagName('p')[0];
        var p=null;
        console.log(aLi);
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onmouseenter=function(){
                if(this.index==0){
                    return;
                };
                oP.style.display='none';
                p=document.createElement('p');
                p.innerHTML='';
                p.innerHTML=arr[this.index];
                p.style.width=this.offsetWidth-24+'px';
                p.className='active';
                //alert(this) '<p style="width:'+this.offsetWidth+'px;padding:12px;">'+arr[i]+'</p>'
                this.appendChild(p);
                return false;
            };

            aLi[i].onmouseleave=function(){
                if(this.index==0){
                    return;
                };
                this.removeChild(p);
               return false;
            };
        }
    })();





    //getClass
    function getClass(parent,sClass){
        parent=parent||document;
        var aEle=parent.getElementsByTagName('*');
        var arr=[];
        if(parent.getElementsByClassName){
            return parent.getElementsByClassName(sClass);
        }else{
            var re=new RegExp('\\b'+sClass+'\\b');
            for(var i=0;i<arr.length;i++){
                if(re.test(aEle[i].className)){
                    arr.push(aEle[i])
                }
            }
            return arr;
        }
    }
};