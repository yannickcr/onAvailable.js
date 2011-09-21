onAvailable {#onAvailable}
=========================================

onAvailable.js allow the detection and retrieval of DOM nodes before the DOM has finished loading.

This is very useful if you have to quickly bind some events on a slow page.

### Syntax:

	document.onAvailable(selector, callback, checkContent);

### Arguments:

1. selector - (string) An element ID.
2. callback - (function) The function to execute when the element is available.
2. checkContent - (boolean) If true the callback will be called after the element's content is fully loaded. Default to false.

### Example:

#### HTML:

	<div id="foo">
		My content
	</div>

#### JavaScript:

	document.onAvailable('foo', function(){
		// #foo is available
		this.style.background = 'green';
	});

With content checking:

#### HTML:

	<div id="foo2">
		<button id="bar">FooBar</button>
	</div>

#### JavaScript:


	document.onAvailable('foo', function(){
		// #foo and #foobar are available
		document.getElementById('foobar').addEventListener('click', function(){
			// do stuffs
		});
	}, true);

### Notes

 * By default onAvailable use getElementById to find the elements, but you can easily replace it by a more powerful function (like querySelector or jQuery.$).
 * By default onAvailable will check for element every 200ms and will stop after 50 attempts. You can easily customize this rate and the retry limit in the function.