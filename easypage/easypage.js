(function($){
	$.fn.easyPage = function(options) {
		var _this = $(this);
		var settings = $.extend({
			count: 4,
			color: [
				{
					"background":"#428BCA","color":"#fff","border-color":"#428BCA"
				},
				{
					"background":"#fff","color":"#428BCA","border-color":"#ccc"
				},
				{
					"background":"#eee","color":"#428BCA","border-color":"#ccc"
				}
			]
		}, options);
		var pages = new Easypage(_this, settings);
	}
})(jQuery);

function Easypage(pages, settings){
	this.settings = settings;
	this.init(pages);
}

Easypage.prototype = {
	'init': function(pages){
		var that = this;
		// $(pages).hide();
		$parent = $(pages).parent();
		$parent.children('.easy_pages').remove();
		this.$ul = $('<ul>').addClass('easy_pages').appendTo($parent);
		num = Math.ceil(pages.length/this.settings.count);
		for(var i = 0;i < num;i ++){
			j = i + 1;
			this.$ul.append("<li value='"+j+"'>"+j+"</li>");
		}
		this.$li = this.$ul.children('li');
		this.pageToggle(this.$li, this.settings.count, pages);
    this.$ul.width(this.pageWidth(this.$li));
		this.colorToggle(this.$li,this.settings.color[0], this.settings.color[1],this.settings.color[2]);
	},
	'pageToggle': function(li, count, pages){
    $pages = $(pages);
		$pages.hide(); //先隐藏所有
		for(var i = 0;i < count;i ++){ //初始显示最后count个元素
		 $pages.eq(i).show();
		}
		//分页标签切换
		for(var i = 0;i < li.length;i ++){ //点击标签根据标签的value值计算并显示相对应的元素
			$(li[i]).on("click",function(event){
				var n = $(this).val()-1;
				$pages.hide();
				for(var i = count*n+1;i <= count*(n+1);i ++){
					$pages.eq(i-1).show();
				}
				event.stopPropagation(); //阻止冒泡以防触发上级元素的点击事件
			});
		}
	},
	'pageWidth': function(li){
		li_w = li.outerWidth(true);
		return l = (li.length)*li_w + "px";
	},
	'colorToggle': function(li, a, b, c){
		var fir = $(li).first();	 //li表示标签数组,a表示标签在click后的样式,
		$(fir).css(a).siblings().css(b).hover(function(){ //b表示普通状态的样式,c表示获得焦点时的样式
			$(this).css(c);
		},function(){
			$(this).css(b);
		});
		for(var i = 0;i < li.length;i ++){
			$(li[i]).click(function(){
				$(this).css(a).siblings().css(b).hover(function(){
					$(this).css(c);
				},function(){
					$(this).css(b);
				});
				$(this).hover(function(){
					$(this).css(a);
				},function(){
					$(this).css(a);
				});
			});
		}
	}
}