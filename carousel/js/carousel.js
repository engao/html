/**
 * [carouselBegin description]
 * @param  {[type]} carouselData [description]
 * @return {[type]}              [description]
 * carouselData是一个对象，包含基本配置，高度，宽度，自动移动，方向，图片列表，a链接列表
 * @auth  keg<1067547248@qq.com>
 */
var carouselBegin = function(data){
	
	//无缝轮播
	var carousel_base_width = data.initWidth;  //轮播宽度
	var carousel_base_height = data.initHeight;	//轮播高度
	var isAutoMove = data.autoMove;				//是否自动移动
	var moveWidth = data.initWidth;		//每次轮播移动距离
	var isCanMove = 1;		//是否可以执行移动，主要针对鼠标移动到轮播上需要停止移动
	var moveStyle = data.moveStyle;		//移动方向，1右 0左 ，暂时只支持0，1两个参数
	var moveSpeed = data.moveSpeed;		//轮播移动速度，秒
	var imgsNum = 0;				//轮播数量
	var pageIndex = 0;				//轮播下方提示小点点位置
	var imgsIndex = 0;				//图片移动到第几张的位置
	var carouselDivObj = $('#carousel');		//轮播div对象
	var carouselUlObj = $('#carousel_ul');		//轮播图片ul对象
	var carouselPage = $('#carousel_page');		//点点对象


	//轮播图片列表
	var imgArray = data.imgArray;

	//轮播图对应a标签对象
	var aImgArray = data.aImgArray;


	//由于需要无缝滑动，所以此处有个小技巧，需要把第一张图片复制一张到最后
	//然后当滑动到最后一张图片的时候切回第一张
	//或者滑动到第一张的时候切换到最后一张
	this.initCarousel = function(){
		var strsImgs = '';
		var strsPage = '';
		var lastLi = '';
		for(k in imgArray){
			strsImgs += '<li><a href="'+aImgArray[k]+'"><img src="'+imgArray[k]+'"></a></li>';
			if(k==0){
				lastLi = '<li><a href="'+aImgArray[k]+'"><img src="'+imgArray[k]+'"></a></li>';
				strsPage += '<li class="selected"></li>';
			}else{
				strsPage += '<li><a href="javascript:;"></a></li>';
			}
			imgsNum++;
		}
		strsImgs += lastLi;
		//填充图片
		carouselUlObj.html(strsImgs);
		carouselUlObj.find('li').css({"width":carousel_base_width+"px","height":carousel_base_height+"px"});
		carouselUlObj.find('img').css({"width":carousel_base_width+"px","height":carousel_base_height+"px"});	
		//设置整体的宽高
		carouselDivObj.css({"width":carousel_base_width+"px","height":carousel_base_height+"px"});
		//设置图片ul的宽度
		carouselUlObj.css({"width":(imgsNum+1)*carousel_base_width+"px","height":carousel_base_height+"px"});  
		//设置点点数量
		carouselPage.html(strsPage);	
		//设置整体点点偏移量
		carouselPage.css({"margin-left":"-"+carouselPage.width()/2+"px"});

		setInterval(goToMove,moveSpeed*1000);
	}

	

	//鼠标移入，移出设置是否还能自动滑动，同时移入显示左右移动按钮
	carouselDivObj.mouseover(function(){
		$('.move_a').show();
		isCanMove = 0;

	}).mouseout(function(){
		$('.move_a').hide();
		isCanMove = 1;
	});

	//左右移动
	$('.pre').click(function(){
		imgsIndex--;
		carouselMove();
	});

	$('.next').click(function(){
		imgsIndex++;
		carouselMove();
	});

	//点击小点时的操作
	carouselPage.on('click','li',function(){
		var _index = $(this).index();
		imgsIndex = _index;
		carouselMove();
	});


	//轮播移动函数
	carouselMove = function(){
		pageIndex = imgsIndex;
		if(imgsIndex>imgsNum){
			pageIndex = imgsIndex = 1;
			carouselUlObj.css({"left":0});
		}else if(imgsIndex==imgsNum){
			pageIndex = 0
		}else if(imgsIndex < 0){
			pageIndex = imgsIndex = imgsNum - 1;
			carouselUlObj.css({"left":"-"+imgsNum*moveWidth+"px"});
		}
		//平滑移动
		carouselUlObj.stop().animate({"left":"-"+imgsIndex*moveWidth+"px"},moveWidth);
		//小点点设置选中状态
		carouselPage.find('li').siblings().removeClass('selected').eq(pageIndex).addClass('selected');
	},


	goToMove = function(){
		//自动移动，而且可以移动的时候执行
		if(isAutoMove==1 && isCanMove==1){
			if(moveStyle==1){
				imgsIndex++;
			}else{
				imgsIndex--;
			}

			carouselMove();
		}
	}
	

}