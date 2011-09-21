onAvailable.js
====

onAvailable.js allow the detection and retrieval of DOM nodes before the DOM has finished loading.

This is very useful if you have to quickly bind some events on a slow page.

How to use
----------

Call onAvailable

### Example

HTML:

	<div id="foo">
		My content
	</div>

JavaScript:

	document.onAvailable('foo', function(){
		// #foo is available
		this.style.background = 'green';
	});

This way the callback function will be executed when the #foo element will be available in your webpage, even if the DOM loading has not finished.

You may also want to bind events to some elements in #foo, you can check if #foo and his content are fully loaded by passing a third argument to the function. 

HTML:

	<div id="foo2">
		<button id="bar">FooBar</button>
	</div>

JavaScript:


	document.onAvailable('foo', function(){
		// #foo and #foobar are available
		document.getElementById('foobar').addEventListener('click', function(){
			// do stuffs
		});
	}, true);

For more informations please read the [Documentation](https://github.com/Country/onAvailable.js/blob/master/Docs/onAvailable.js.md)