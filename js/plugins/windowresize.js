// Debounced resize event for jQuery
// More info: https://github.com/louisremi/jquery-smartresize/
// Example: $(window).smartresize(function() { console.log('do something'); });
(function($) {
	var event = $.event, resizeTimeout
	event.special[ "smartresize" ] = {
		setup: function() {
			$( this ).bind( "resize", event.special.smartresize.handler )
		},
		teardown: function() {
			$( this ).unbind( "resize", event.special.smartresize.handler )
		},
		handler: function( event, execAsap ) {
			// Save the context
			var context = this, args = arguments
			// set correct event type
			event.type = "smartresize"
			if(resizeTimeout) clearTimeout(resizeTimeout)
			resizeTimeout = setTimeout(function() {
				jQuery.event.handle.apply( context, args )
			}, execAsap === "execAsap"? 0 : 100)
		}
	}
	$.fn.smartresize = function( fn ) {
		return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] )
	}
})(jQuery)