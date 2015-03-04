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

		if (wh>811){
			js_sidebar_scroll.height(wh - 111);
		} else {
			js_sidebar_scroll.height(wh - 111);
		}

	}
	if (window.addEventListener){
		window.addEventListener(orientationEvent, setMapHeight);
	} else {
		window.attachEvent('resize', setMapHeight);
	}

	setMapHeight();

	// $('.sidebar-left .label .icontvil').popover();
	$('[data-toggle="popover"]').popover();
	
	if (js_sidebar_scroll.length > 0) {
		$(document).scroll(function(){
			var top_offset = $(this).scrollTop();
				wh = $(window).height();

			if (top_offset > 60){
				js_sidebar_scroll.height(wh - 51);
			} else {
				js_sidebar_scroll.height(wh - 111 + top_offset);
			}
		});
	}

});