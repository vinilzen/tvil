$(function(){
	var wh,
		ww,
		supportsOrientationChange = "onorientationchange" in window,
		orientationEvent = supportsOrientationChange ? "orientationchange" : "resize",
		js_sidebar_scroll = $('.js-sidebar-scroll');

	function setMapHeight(){
		wh = $(window).height();
		ww = $(window).width();

		if ($('#js-map').length > 0){
			if (ww>768){
				$('#js-map, .ymaps-map').show().css({
					height:wh-60,
					width:(ww-768)
				});
				$('.ymaps-map').height(wh-60);
			} else {
				$('#js-map').hide();
			}
		}

		// if (wh>811){
			js_sidebar_scroll.height(wh - 111);
		// } else {
			// js_sidebar_scroll.height(wh - 111);
		// }

	}
	if (window.addEventListener){
		window.addEventListener(orientationEvent, setMapHeight);
	} else {
		window.attachEvent('resize', setMapHeight);
	}

	setMapHeight();

	$('[data-toggle="popover"]').popover();
	
	if (js_sidebar_scroll.length > 0 || $('#js-map').length > 0) {
		$(document).scroll(function(){

			var top_offset = $(this).scrollTop();
				wh = $(window).height();

			if (js_sidebar_scroll.length > 0) {
				if (top_offset > 60){
					js_sidebar_scroll.height(wh - 51);
				} else {
					js_sidebar_scroll.height(wh - 111 + top_offset);
				}
			}

			if ($('#js-map').length > 0){
				if (top_offset > 60){
					$('#js-map').height(wh);
					$('.ymaps-map').height(wh);
				} else {
					$('#js-map').height(wh-60+top_offset);
					$('.ymaps-map').height(wh-60+top_offset);
				}
			}
		});
	}

	$(document).scroll(function(){
		var top_offset = $(this).scrollTop();
		if (top_offset > 550){
			if ($('.affixtop').height() == 0){
				$('.affixtop')
					.width($('.row-main').width())
					.show()
					.animate({'height':60}, 200)
			}
		} else {
			$('.affixtop').hide().css('height',0);
		}

		wh = $(window).height();

		if (top_offset<60){
			$('.sidebar-right.sidebar-right-obj')
				.height(wh-60 + top_offset);
			$('.sidebar-left.sidebar-cabinet')
				.height(wh-60 + top_offset);
		} else {
			$('.sidebar-right.sidebar-right-obj').height(wh)
			$('.sidebar-left.sidebar-cabinet').height(wh);
		}
	});

	function setMessageHeight(){
		if ( $('#js_messages').length ){
			var col_height = $('.col-gray').height(),
				header_height = $('.col-gray .page-header').outerHeight(),
				owner_message_height = $('.owner-message').outerHeight(),
				write_height = $('.write').outerHeight();
			$('#js_messages').height(
				col_height-header_height-owner_message_height-write_height-65
			);
		}
	}

	setMessageHeight();
	
	if (window.addEventListener){
		window.addEventListener(orientationEvent, setMapHeight);
	} else {
		window.attachEvent('resize', setMessageHeight);
	}

	if ($('.slider').length) {
		// set price range for popover and show it
		window.setSliderValue = function(){
			var values = $('input.slider').val();
			if (!values)
				values = $('input.slider').data('slider-value');
			else
				values = values.split(',');

			$('.js-slider-handle-left').attr('data-content',values[0]+' Р');
			$('.js-slider-handle-right').attr('data-content',values[1]+' Р');
			$('.slider-handle').popover('show');
		}
		var slider = $('.slider').slider()
			.on('slideStart', function(){
				$('.slider-handle').popover('destroy');
			})
			.on('slide', function(){
				setTimeout('window.setSliderValue()', 5);
			})
			.on('slideStop', function(){
				setTimeout('window.setSliderValue()', 10);
			});

		window.setSliderValue();

		$('[data-toogle="slider"]').click(function(){
			var values = $(this).data('value');
			slider.slider('setValue',values);
			$('input.slider').val(values[0]+','+values[1]);
			window.setSliderValue();
			$('[data-toogle="slider"]').removeClass('selected');
			$(this).addClass('selected')
		});
	}

	$('#js-collapseExample').on('show.bs.collapse', function () {
		setTimeout('window.setSliderValue()', 200);
	});

	$('.search-pin').on('show.bs.popover', function () {
		$('.search-pin').removeClass('selected').popover('hide');
	}).on('shown.bs.popover', function () {
		var pin_position = $(this).addClass('selected').position();
		$('.search-pins .popover').css('top',pin_position.top-220); // height modified popover
	});

	if ($('.search-mapmodal').length>0){
		$('.search-mapmodal').click(function(){
			$(this).fadeOut();
		});
		setTimeout("$('.search-mapmodal').fadeOut()", 5000);
	}

	$('.sidebar-left.sidebar-light')
		.on('affixed.bs.affix affixed-top.bs.affix',function(a,b,c){
			var st = $(document).scrollTop();
			console.log(st,a,b,c);
			ww = $(window).width();

			if ($(document).scrollTop()>=60){
				if (ww>1440){
					var left = (ww - 1440)/2;
					$(this).css('left',left);
				}
			} else {
				$(this).css('left',0);
			}
		});

	$('.sidebar-right.sidebar-right-obj')
		.height($(window).height()-60)
		.on('affixed.bs.affix affixed-top.bs.affix',function(a,b,c){
			var st = $(document).scrollTop();
			console.log(st, a,b,c);
			ww = $(window).width();
			if ($(document).scrollTop()>=60){
				if (ww>1440){
					var right = (ww - 1440)/2;
					$(this).css('right',right);
				}
			} else {
				$(this).css('right',0);
			}
		});

	$('#js_tomap').click(function(){
		$('.search-line').removeClass('ready');
		$('.search-list').fadeOut();
	})

});
