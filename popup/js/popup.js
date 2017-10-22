//可以支持多个
var kjStr = '<div  class="kel-mask"></div>';
	kjStr += '<div class="kel-popul">';
	kjStr += '<div class="kel_popul_title">';
	kjStr += '<span class="kel_popul_span">自定义标题</span>';
	kjStr += '<a href="javascript:;" class="kel_popul_close">x</a>';
	kjStr += '</div>';
	kjStr += '<div class="kel_popul_content"></div>';
	kjStr += '</div>';

$('body').append(kjStr);


var kelPopul = function(){
	
	this.run = function(data, html){
		var initWidth = data.width;
		var initHeight = data.height;
		var initTitle = data.title;

		$('.kel_popul_content').html(html);
		$('.kel_popul_span').html(initTitle);
		$('.kel-popul').css({"top":"50%","left":"50%"});
		$('.kel-popul').css({"height":initHeight,"width":initWidth,"margin-left":"-"+initWidth/2+"px","margin-top":"-"+initHeight/2+"px"});

		//调用此方法，就显示
		$('.kel-mask').show();
		$('.kel-popul').show();

		$('.kel-mask').click(function(){
			$('.kel-mask').hide();
			$('.kel-popul').hide();
		});

		$('.kel_popul_close').click(function(){
			$('.kel-mask').hide();
			$('.kel-popul').hide();
		});

		//移动窗口
		$(document).on('mousedown', '.kel_popul_title', function(ev){
			var initPopulLeft =  $('.kel-popul').offset().left;
			var initPopulTop = $('.kel-popul').offset().top;
			var initX = ev.pageX - initPopulLeft;
			var initY = ev.pageY - initPopulTop;
			
			var isMove = true; 
			$(document).mousemove(function(nev){
				
				if(isMove){
					var nX = nev.pageX - initX;
					var nY = nev.pageY - initY;

					$('.kel-popul').css({"left":nX,"top":nY, 'margin-left':'0px', 'margin-top':'0px'});
				}
			}).mouseup(function(){
				isMove = false; 
			});
		});
	}

	//关闭事件
	this.close = function(){
		$('.kel-mask').hide();
		$('.kel-popul').hide();
	}
}