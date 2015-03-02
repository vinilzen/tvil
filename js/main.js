$(function(){
	var supportsOrientationChange = "onorientationchange" in window,
		orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

	function setMapHeight(){
		var wh = $(window).height(),
			ww = $(window).width();

		if (ww>768){
			$('#js-map').show().css({
				height:wh,
				width:(ww-768)
			});
		} else {
			$('#js-map').hide();
		}
	}

	window.addEventListener(orientationEvent, setMapHeight);

	setMapHeight();

	$('.sidebar-left .label .glyphicon').popover();
});