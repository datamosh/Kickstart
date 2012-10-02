Kickstart project
=================

## Javacript kickstart object

### Plugins

#### Debounced resize event for jQuery

[*More info*](http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/)

*Example:*

	$(window).smartresize(function() {
		console.log('do something on resize');
	});

### Util

#### GUID/UUID generator

[*More info*](http://es.wikipedia.org/wiki/Globally_Unique_Identifier)

*Example:*

	kickstart.util.guid();

#### Contains (for string or array)

*Example:*

	var string = 'this is a test',
		array = ['this', 'is', 'a', 'test'];

	kickstart.util.contains(string, 'is');
	kickstart.util.contains(array, 'is');

#### Clone object

*Example:*

	var oldObject = {
		prop: true
	};
	var newObject = kickstart.util.clone(oldObject);

#### Template engine

*Author: Addy Osmani*

[*More info*](https://github.com/addyosmani/microtemplatez)

*Example:*

	<script  id="myTemplate" type="text/micro">
		<div class='username'> {{username}} </div>
		<div class="features"> {{features.hair}}, {{features.eyes}}, {{features.height}}</div>
	</script>

	<script>
		var markup = $("#myTemplate").html(),
			data = {
				username: "addyosmani",
				features:{
					hair:'black',
					eyes: 'brown',
					height:'5.8'
				}
			};

		// Log the templated output or populate some an element
		// on the page with it
		console.log('Test:' + kickstart.template(markup, data));
	</script>

#### Preload images, CSS and JavaScript files without executing them

[*More info*](http://www.phpied.com/preload-cssjavascript-without-execution/)

*Example:*

	kickstart.preload([
		'http://tools.w3clubs.com/pagr2/1.sleep.expires.png',
		'http://tools.w3clubs.com/pagr2/1.sleep.expires.js',
		'http://tools.w3clubs.com/pagr2/1.sleep.expires.css'
	]);