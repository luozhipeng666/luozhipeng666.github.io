// JavaScript Document
		//portfolio
		var posTop=[];
		var aLi=$('.portfolio_tab li');
		var oUl=$('.portfolio_tab ul');
		var aUl=$('.portfolio_content ul');
		var por=$('.portfolio_content');
		var oPage=$('.pages');
		var disLi=$('.dis_top');
		var prev=$('.prev');
		var next=$('.next');
		var num1=0;
		aLi.each(function(i,elem){
			$(elem).attr('data','data'+i)
			$(this).mouseover(function(){
				$(this).find('span').animate({'opacity':1},200,'linear')
				$(this).find('a').css({'color':'#fff'})
			})
			$(this).mouseout(function(){
				if($(this).attr('class')=='active'){
					$(this).find('span').css({'opacity':1});
					$(this).find('a').css({'color':'#fff'})					
				}else{
					$(this).find('span').animate({'opacity':0},200,'linear')	
					$(this).find('a').css({'color':'#3f3f3f'});					
				}		
			})
			$(this).click(function(){
				//$(this).find('span').animate('');
				$('.portfolio_tab span').css('opacity',0);
				$('.portfolio_tab a').css('color','#3f3f3f');
				$(this).find('a').css('color','#fff');
				$(this).find('span').css('opacity',1);			
				$(this).addClass('active').siblings().removeClass('active');
				//return false;
				//console.log(oPage.innerHTML)
				createLi(0,i)
			});
		});
		//初始化	
		createLi(0,0);		
		function createLi(n,num){
			var str='';
			var str1='';
			posTop=[];		
			var data=createA('data'+num);
				for(var i=1; i<data.length+1; i++){
					if(i==n+1){
						str+='<a href="javascript:;" class="active">'+i+'</a>';
					}else{
						str+='<a href="javascript:;">'+i+'</a>';
					}					
				}
				oPage.html(str);	
				var aS=$('.pages a');
				aS.each(function(i,elem){
					$(elem).off().click(function(){
						//num1=i;
						createLi(i,num);
						//$(this).addClass('active').siblings().removeClass('active');						
					})
				});
				//console.log(num1)
				next.off().click(function(){
					//alert(1)
					num1++;
					if(num1>=data.length-1){
						num1=data.length-1;
					}
					console.log(1)
					createLi(num1,num);
					return false;				
				});
				prev.off().click(function(){
					//alert(1)
					num1--;
					if(num1<=0){
						num1=0;
					}
					//console.log(num1)
					createLi(num1,num);				
				});			
			for(var i=0; i<data[n].title.length; i++){
					str1+='<li><a href="javascript:;"><div class="explain"><h3>'+data[n].title[i]+'</h3><span>'+data[n].text[i]+'</span></div><img src="img/portfolio_img/'+data[n].img[i]+'.jpg"/></a></li>'
				}
				aUl.html(str1);	
				var lis=$('.portfolio_content li');
				var outHeight=lis.eq(0).outerHeight(true);
				var totle=Math.ceil(lis.length/3);
				por.css('height',totle*outHeight);
				disLi.each(function(i,elem){
					posTop.push($(elem).offset().top-64)
				})
				//console.log(posTop);
				lis.each(function(i,elem){
					//console.log($(elem).outerHeight(true))
					$(elem).hover(
						function(){
							$(this).find('.explain').animate({'top':0},150,'linear');
							$(this).find('img').animate({'top':55},150,'linear');
						},
						function(){
							$(this).find('.explain').animate({'top':-55},150,'linear');
							$(this).find('img').animate({'top':0},150,'linear');							
						}
					);
				});
		}	
	//导航	
	(function(){
		var aLi=$('.head_nav li');
		//var arr=[0,644,1592,2401,3435]
		aLi.each(function(i,elem){
			$(this).mouseover(function(){
				//$(this).find('span').animate('');
				$(this).find('span').animate({'opacity':1},150,'linear');
				$(this).find('a').css('color','#fff');
			});				
			$(this).click(function(){
				$('.head_nav span').css('opacity',0);
				$('.head_nav a').css('color','#bdbdbd');
				$(this).find('a').css('color','#fff');
				$(this).find('span').css('opacity','1');
				$(this).addClass('active').siblings().removeClass('active');
				$('html,body').animate({'scrollTop':posTop[i]},1500,'easeInQuad');
				return false;
			});						
			$(this).mouseout(function(){								
				if($(this).attr('class')=='active'){
					$(this).find('a').css('color','#fff');
					$(this).find('span').css('opacity','1');
				}else{
					$(this).find('span').animate({'opacity':0},150,'linear');
					$(this).find('a').css('color','#bdbdbd');
				}				
			});		
		});
	})();
	//搜索
	(function(){
		var oA=$('.search a');
		var oSeach=$('.search div');
		var oText=$('#form .text');
		var oBtn=$('#form .btn');
		$(oA).on('click',function(){
			if($(this).attr('class')=='active'){
				$(this).attr('class','');
				$(oSeach).animate({'height':0},150,'linear');				
			}else{
				$(this).addClass('active');
				$(oSeach).animate({'height':33},150,'linear');				
			}
			return false;
		});	
		$(document).on('click',function(){
				$(oA).attr('class','');
				$(oSeach).animate({'height':0},150,'linear');	
				$(oText).css('border','none');	
		});
		oText.focus(function(){
			//alert(1)
			$(this).css('border','2px solid #33558c');
			return false;
		});
		oText.on('click',function(){
			return false;
		})
	})();
	//banner 切换 轮播
	(function(){
		var aLi=$('#banner li');
		var ban=$('#banner');
		var leftBtn=$('.left_btn');
		var rightBtn=$('.right_btn');
		var iW=document.documentElement.clientWidth;  //不带滚动条的宽度
		var ul=$('#banner ul');
		var leftImg=$('#banner .left_img');
		var rightImg=$('#banner .right_img');
		var num=0;
		var imgW=	$(leftImg).width();	
		//console.log(imgW)
		var l=998/2;
		var oL=iW/2;
		var on=true;	
		var timer=null;
		for(var i=1; i<aLi.length; i++){
			aLi[i].style.left=iW+'px';
			aLi[i].style.width=iW+'px';
		}
		aLi[0].style.width=iW+'px';		
		rightBtn.click(function(){
			if(!on){			
				return false;				
			}
					
				num++
				var n=Math.abs(4-(4-num)%4);
				//console.log(n)
				rightTab(n);
				on=false;		
		});
		leftBtn.click(function(){
			if(!on){			
				return false;				
			}				
			var num1=Math.abs(4-(4-(num-1))%4);
			//console.log(num1)
			for(var i=0; i<leftImg.length; i++){
				if(i==num1){
					aLi[i].style.left=-iW+'px';
				}
			}					
			leftTab(num1);
			on=false;
		});
		//右边点击的时候 easeInStrong easeBoth
		autoPlay();
		function autoPlay(){
			clearInterval(timer);
			timer=setInterval(function(){
				num++;
				var n=Math.abs(4-(4-num)%4);
				//console.log(n)
				rightTab(n);
				on=false;	
			},4000)
		}
		function rightTab(n){
			leftImg.eq(n%leftImg.length).css({'left':l});
			rightImg.eq(n%leftImg.length).css({'left':l});
			aLi[n%leftImg.length].style.left=iW+'px'
			mTween(leftImg[(n-1)%leftImg.length],{left:-oL-oL},400,'easeBoth');
			mTween(rightImg[(n-1)%leftImg.length],{left:-oL-oL},700,'easeInStrong',function(){
				mTween(leftImg[n%leftImg.length],{left:-l},800,'easeBoth');
				mTween(rightImg[n%leftImg.length],{left:-l},1000,'easeOut');
				mTween(aLi[(n-1)%leftImg.length],{left:-iW},800,'easeOutStrong');
				mTween(aLi[n%leftImg.length],{left:0},800,'easeOutStrong',function(){
					on=true;
				
				});
			});
		}
		//左边点击的时候
		function leftTab(num1){			
			leftImg.eq(num1%leftImg.length).css({'left':-l-998});
			rightImg.eq(num1%leftImg.length).css({'left':-l-998});
			aLi[num1%leftImg.length].style.left=-iW+'px'
			mTween(rightImg[(num1+1)%leftImg.length],{left:l+oL},400,'easeBoth');
			mTween(leftImg[(num1+1)%leftImg.length],{left:l+oL},700,'easeInStrong',function(){
				mTween(rightImg[num1%leftImg.length],{left:-l},800,'easeBoth');
				mTween(leftImg[num1%leftImg.length],{left:-l},1000,'easeOut');
				mTween(aLi[(num1+1)%leftImg.length],{left:iW},800,'easeOutStrong');
				mTween(aLi[num1%leftImg.length],{left:0},800,'easeOutStrong',function(){
					on=true;	
					num--;		
				});
			});			
		}
		ban.hover(function(){
			clearInterval(timer);
			$(leftBtn).animate({'left':0},300,'linear')
			$(rightBtn).animate({'right':0},300,'linear')			
		},function(){
			autoPlay();
			$(leftBtn).animate({'left':-52},300,'linear')
			$(rightBtn).animate({'right':-52},300,'linear')			
		})
	})();
	//services
	(function(){
		var aLi=$('.pro li');
		var oPop=$('.popup');
		var off=$('.close');
		var popTab=$('.popup_tab')
		var aLi1=$('.popup_tab li')
		var aLi2=$('#services .popup_li');
		aLi.each(function(i,elem){
			$(elem).hover(
			function(){
				$(this).find('img').eq(0).animate({'left':210},300,'linear');
				$(this).find('img').eq(1).animate({'left':0},300,'linear');
				$(this).find('.mask').animate({'opacity':1},300,'linear');
				$(this).find('.write1').animate({'left':-280},300,'linear');
				$(this).find('.write2').animate({'left':0},300,'linear');
			},
			function(){
				$(this).find('img').eq(0).animate({'left':0},300,'linear');
				$(this).find('img').eq(1).animate({'left':-210},300,'linear');
				$(this).find('.mask').animate({'opacity':0},300,'linear');	
				$(this).find('.write1').animate({'left':0},300,'linear');
				$(this).find('.write2').animate({'left':280},300,'linear');			
			});
			
			$(elem).click(function(){
				oPop.animate({'height':353},300,'linear');
					prop(i);
			});
		});
		aLi1.each(function(i,elem){
			$(elem).click(function(){
				prop(i);
			})
		});
		function prop(i){
				aLi1.eq(i).addClass('active').siblings().removeClass('active');
				aLi2.eq(i).css('display','block').siblings().css('display','none');					
		}
		off.click(function(){
			oPop.animate({'height':0},300,'linear')
		})
	})();	
	//about
	(function(){
		var about=$('#about');
		var aLi=$('.about_list li');
		var aLi2=$('.about_tab li');
		var aDiv=$('.about_content').children();
		var aboutTop=about.offset().top;
		aLi.each(function(i,elem){
			$(elem).hover(
				function(){
					$(this).find('span').animate({'opacity':0.8},300,'linear');
				},
				function(){
					$(this).find('span').animate({'opacity':0},300,'linear');
				}
			);
		});
		aLi2.each(function(i,elem){
			$(this).click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				aDiv.eq(i).css({'display':'block'}).siblings().css({'display':'none'});
			})
		})
		//console.log(aboutTop);
		//console.log($(document).scrollTop())
	})();
	//contact
	(function(){
		var aInput=$('#contact input');
		var textarea=$('.area');
		//console.log(textarea)
		var arr=[];
		aInput.each(function(i,elem){
			arr.push($(this).val());
			//console.log(arr);
			$(elem).focus(function(){
				$(this).addClass('focus');
				if($(this).val()==arr[i]){
					$(this).val('')
				}
			});
			$(elem).blur(function(){
				$(this).removeClass('focus');
				if($(this).val()==''){
					$(this).val(arr[i]);
				}
			})
		});
		var val=textarea.val();
		textarea.focus(function(){
			$(this).addClass('focus');
			if($(this).val()==val){
				$(this).val('');				
			}

		}); 
		textarea.blur(function(){
			$(this).removeClass('focus');
			if($(this).val()==''){
				$(this).val(val);
			}
		}); 		
	})();
	//鼠标滚动触发
	(function(){
		var stick=$('#stick');
		var header=$('#contact');
		var disTop=$('.dis_top');
		var aboutLis=$('.about_list');
		var grayImg=$('.about_list .grayImg');
		var redImg=$('.about_list .redImg');
		var headSpan=$('.head_nav span');
		var headLi=$('.head_nav li');
		var headA=$('.head_nav a');
		var servies=$('#portfolio');

		//网页加载完滚动条的位置
		$('html,body').animate({'scrollTop':644},1000,'linear');
		$(window).on('scroll',function(){
			var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
			//console.log(posTop)
			if(scrollTop>200){
				stick.animate({'opacity':1},16,'linear');
			}else{
				stick.animate({'opacity':0},16,'linear');
			}
			for(var i=0; i<posTop.length; i++){
				if(scrollTop>posTop[i]-64 && scrollTop<posTop[i+1]-64){
					for(var j=0; j<posTop.length;j++){
						headSpan.eq(j).css('opacity',0);
						headA.eq(j).css('color','#bdbdbd');						
					}
					headSpan.eq(i).css('opacity',1);
					headA.eq(i).css('color','#fff');
					headLi.eq(i).addClass('active').siblings().removeClass('active');
				}
			}
			if(scrollTop>posTop[4]-64){
				for(var j=0; j<posTop.length;j++){
					headSpan.eq(j).css('opacity',0);
					headA.eq(j).css('color','#bdbdbd');						
				}
					headSpan.eq(4).css('opacity',1);
					headA.eq(4).css('color','#fff');
					headLi.eq(4).addClass('active').siblings().removeClass('active');			
			}
			if(scrollTop>posTop[3]-64){
				redImg.css('display','block');
				grayImg.css('display','none');
			}else{
				redImg.css('display','none');
				grayImg.css('display','block');				
			}
		});
		
		stick.click(function(){
			$('html,body').animate({'scrollTop':0},1000,'linear');
			return false;
		})
	})();
		//获取数据
		function createA(val){
			for(var attr in data){
				if(attr==val){
					return data[val];
				}
			}
		}