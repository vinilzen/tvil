$(function(){
	var wh,
		ww,
		supportsOrientationChange = "onorientationchange" in window,
		orientationEvent = supportsOrientationChange ? "orientationchange" : "resize",
		js_sidebar_scroll = $('#js-sidebar-scroll');

	function setMapHeight(){
		wh = $(window).height();
		ww = $(window).width();

		if ($('#js-map').length > 0){
			if (ww>768){
				$('#js-map').show().css({
					height:wh-60,
					width:(ww-768)
				});
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

	// $('.sidebar-left .label .icontvil').popover();
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
				} else {
					$('#js-map').height(wh-60);
				}
			}
		});
	}


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
		.on('slideStop', function(){
			setTimeout('window.setSliderValue()', 100);
		});

	window.setSliderValue();
	$('[data-toogle="slider"]').click(function(){
		var values = $(this).data('value');
		slider.slider('setValue',values);
		$('input.slider').val(values[0]+','+values[1]);
		window.setSliderValue();
		$('[data-toogle="slider"]').removeClass('selected');
		$(this).addClass('selected')
	})
});