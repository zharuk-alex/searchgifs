var $ = require('jquery');
var jQueryBridget = require('jquery-bridget');
var Masonry = require('masonry-layout');
var imagesLoaded = require('imagesloaded');
var masonryImagesReveal = require('./masonryImagesReveal');
// make Masonry a jQuery plugin
jQueryBridget( 'masonry', Masonry, $ );

// now you can use $().masonry()
imagesLoaded.makeJQueryPlugin( $ );

function initMasonryContainer(grid){
	grid.masonry({
		itemSelector: '.grid-item',
		percentPosition: true,
		columnWidth: '.grid-sizer',
		horizontalOrder: true,
		hiddenStyle: {
			transform: 'translateY(100px)',
			opacity: 0
		},
		visibleStyle:{
			transform: 'translateY(0px)',
			opacity: 1
		},
		transitionDuration:'0.8s'
	});
}

function addItem(itemdata) {
	return $("<div>",{
		class:"grid-item",
		"data-id":itemdata.id,
		"data-still":itemdata.images['480w_still'].url,
		"data-gif":itemdata.images['original'].url
	}).append(
		$("<img>").attr('src', itemdata.images['480w_still'].url),
		$("<a>",{
			class: "grid-item-link",
			href: itemdata.url,
			target: '_blank',
			alt: itemdata.url
		}),
		$("<div>",{}).append(
			$("<span>").append(

			)
		)
	)
}

function getQueryItems(e, query, offset) {
	var offset = offset || 0;
	$.ajax({
		url: 'https://api.giphy.com/v1/gifs/search',
		method: 'GET',
		data: {
			q: query,
			api_key:"uGttNVYPg4W1mo2BLUqmNfeive55Wixv",
			limit: 8,
			offset: offset
		},
		beforeSend: function() {
			$('.input-search-icon').attr('src','images/loading.png').addClass('loading');
		},
		success: function( data ){
			if(data.data.length){
				var $items = [];
				var count = {
					offset: offset,
					limit: 8
				};
				data.data.map(function (item, index) {
					$items.push(addItem(item));
				})
				var $grid = $('.grid');
				$items = $items.map(function(el){return el.get()[0].outerHTML;}).join('');
				initMasonryContainer($grid);
				$grid.masonryImagesReveal( $($items) );
				(!$('#loadmore').length) ? addLoadMore(count):updateLoadMore(count);
				$('.input-search').blur();
			}
		},
		complete: function () {
			$('.input-search-icon').attr('src','images/search_icon.png').removeClass('loading');
		}
	})
}

function addLoadMore(count){
	$('#loadmore-wrapper').append(
		$('<button>',{
			id:"loadmore",
			"data-offset": count.offset,
			"data-limit": count.limit
		}).append(
			$('<img>',{
				src:"./images/thin-arrowheads-pointing-down.png",
				alt:"loadmore",
			})
		).hide().fadeIn(300)
	)
}

function updateLoadMore(count){
	$('#loadmore').attr({
		"data-offset": count.offset + count.limit,
		"data-limit": count.limit
	})
}

function removeLoadMoreButton(){
	$('#loadmore-wrapper').html('');
}

function removeSearchResults() {
	$('#search-content-wrapper .grid-item').css({
		opacity: 0,
    transform: "translateY(100px)",
    transition: "opacity 0.8s ease-out, transform 0.8s"
	}).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
		$(this).remove();
	})
}

function loadMoreButtonEvent(){
	$('#loadmore-wrapper').on('click', '#loadmore', function(e) {
		var offset = $(this).data('offset')+$(this).data('limit');
		var value = $("#search-submit-form-1").find('input:first').val();
		$(this).data('offset',offset);
		if(value){
			getQueryItems(e, value, offset);
		}
	});
}

$("document").ready(function() {
  $("#search-submit-form-1").on('submit', function (e) {
  	e.preventDefault();
		var value = $(this).find('input').val();
		$('#search-content-wrapper .item-holder').html('');
		getQueryItems(e, value, 0);
  }).find('input:first').focus().on('change paste keyup', function (e) {
			removeSearchResults();
			removeLoadMoreButton();
	})

$('#search-content-wrapper').on('mouseenter','.grid-item',function (e) {
		var $img = $(this).find('img');
		var gif_img = $(this).data('gif');
		var $link = $(this).find('.grid-item-link');
		$img.attr('src', gif_img);
		$link.css({
			opacity: 1,
			visibility: 'visible'
		});
	}).on('mouseleave','.grid-item',function (e) {
		var $img = $(this).find('img');
		var still_img = $(this).data('still');
		var $link = $(this).find('.grid-item-link')
		$img.attr('src', still_img);
		$link.css({
			opacity: 0,
			visibility: 'hidden'
		});
	});

	loadMoreButtonEvent();

});
