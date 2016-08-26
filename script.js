/* global jQuery, YoastSEO, MBYoastSEO */
(function ( $, fields ) {
	var module = {
		// Initialize
		init: function () {
			addEventListener( 'load', function () {
				module.load();
			} );
		},

		// Load plugin and add hooks.
		load: function () {
			YoastSEO.app.registerPlugin( 'MetaBox', {status: 'loading'} );
			module.bind();
			YoastSEO.app.pluginReady( 'MetaBox' );
			YoastSEO.app.registerModification( 'content', module.addContent, 'MetaBox', 5 );
		},

		// Add content to Yoast SEO Analyzer.
		addContent: function ( content ) {
			fields.map( function ( fieldId ) {
				content += ' ' + document.getElementById( fieldId ).value;
			} );
			return content;
		},

		// Update Yoast SEO analyzer when fields are updated.
		// Use debounce technique, which triggers refresh only when keys stop being pressed.
		bind: function () {
			var timeout;

			function refresh() {
				clearTimeout( timeout );
				timeout = setTimeout( function () {
					YoastSEO.app.refresh();
				}, 250 );
			}

			fields.map( function ( fieldId ) {
				document.getElementById( fieldId ).addEventListener( 'keyup', refresh );
			} );
		}
	};

	// Run on document ready
	$( module.init );
})( jQuery, MBYoastSEO );
