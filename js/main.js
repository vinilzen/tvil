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
					height:wh,
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

	window.addEventListener(orientationEvent, setMapHeight);

	setMapHeight();

	$('.sidebar-left .label .glyphicon').popover();


	
	if (js_sidebar_scroll.length > 0) {
		$(document).scroll(function(){
			var top_offset = $(this).scrollTop();
				wh = $(window).height();

			console.log(wh, top_offset);

			if (top_offset > 60){
				js_sidebar_scroll.height(wh - 51);
			} else {
				js_sidebar_scroll.height(wh - 111 + top_offset);
			}
		});
	}

});