define('widget/newslist/newslist', ['require', 'exports', 'module', 'components/jquery/jquery', 'components/template/template'],function(require, exports, module) {
var $ = require('components/jquery/jquery');
var Template = require('components/template/template');
var app = module.exports = function(opt) {
	var list = {
		init : function(){
			this.listTemplate = "<% for(var i = 0,len = data.data.length; i<len ;i++){%>\r\n<% var info = data.data[i],path = data.contextpath ; %>\r\n    <article data=\"<%=info.id %>\">\r\n        <a class=\"pic info_flow_news_image badge-o2o before-fade-in after-fade-in\" data-fit-mobile=\"true\" href=\"<%=path %>/p/<%=info.id %>\" style=\"background-image: url(<%=info.image %>);\">\r\n            <span class=\"mask-tags\" data-type=\"<%=info.infoCategory.code %>\" style=\"background-color: <%=info.infoCategory.colorCode %>\"><%=info.infoCategory.name %></span>\r\n        </a>\r\n        <div class=\"desc\">\r\n            <a class=\"title info_flow_news_title\" href=\"<%=path %>/p/<%=info.id %>\" target=\"_blank\"><%=info.title %></a>\r\n            <div class=\"author\">\r\n            <a href=\"<%=path %>/a/<%=info.author.id %>\">\r\n                <span class=\"avatar before-fade-in\" style=\"background-image: url(<%=info.author.image %>);\"></span>\r\n                <span class=\"name\"><%=info.author.nickname %></span></a>\r\n                <span class=\"time\">&nbsp;•&nbsp;<time class=\"timeago\" title=\"<%=info.createDate %>\" datetime=\"<%=info.createDate %>\"><%=info.createDate %></time></span>\r\n            </div>\r\n            <div class=\"brief\"><%=info.shortDesc %></div>\r\n        </div>\r\n    </article>\r\n<%}%>    ";
			this.addEvent();
		},
		addEvent : function(){
			var _this = this;
			$(opt.dom).click(function(){
				var url,
					$J_loadMore = $('.J_listLoadMore');
				if($('.J_newsListNavBar').length == 0 || $('.J_newsListNavBar .firstList').hasClass('active')){
					url = opt.newsUrl
				}else{
					url = opt.pageCateUrl + $('.J_newsListNavBar .active').attr('data')
				}
				if(!$J_loadMore.hasClass('no-data')){
					$J_loadMore.addClass('loading');
					_this.getList(url,{
						offset : $('#listWrap').children(':last').attr('data'),
						d : 'next'
					},function(data){
						if(data.code == 0){
							if(data.data.length){
								$J_loadMore.removeClass('loading no-data');
								var result = Template.parse(_this.listTemplate,{data:data});
								$("#listWrap").append(result);
							}else{
								$J_loadMore.removeClass('loading').addClass('no-data');
							}
				   		}
					});
				}
			});
			$('.J_newsListNavBar').length && $('.J_newsListNavBar').delegate('.tab','click',function(e){
				var url = ($(this).hasClass('firstList') ? opt.newsUrl : opt.pageCateUrl) + $(this).attr('data')
				$('.J_listLoadMore').removeClass('loading no-data');
				_this.getList(url,{
					d : 'next'
				},function(data){
					if(data.code == 0){
						var result = Template.parse(_this.listTemplate,{data:data});
						$("#listWrap").html(result);
						$(e.target).addClass('active').siblings().removeClass('active');
			   		}
				});
			});
		},
		getList : function(url,opt,callback){
			var _this = this;
			$.ajax({
			   	type: "get",
			   	url: url,
			   	data: opt,
			   	success: callback
			}).complete(function(){
				console.log('success');
			});
		} 
	};
	list.init();
};
});