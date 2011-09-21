/*
---
script: onAvailable.js

description: Allow the detection and retrieval of DOM nodes before the DOM has finished loading

license: MIT-style license.

authors:
- Yannick Croissant

provides: [onAvailable]

...
*/

(function(scope){

	scope.onAvailable = function(selector, callback, checkContent){
		// Push the element in the queue
		els.push({
			selector: selector,
			callback: callback,
			checkContent: checkContent || false
		});
		// Launch the detection
		if (!interval) interval = setTimeout(check, freq);
		setTimeout(check, 0);       // Check immediately if the element already exists
	}
	
	var freq     = 200,             // Frequency of the retries (in ms)
	    limit    = 50,              // Maximum number of attempts
	    i        = 0,
	    els      = [],
	    interval = null,
	    // Detect the elements
	    check    = function(){
			for (var j = 0, elsL = els.length; j < elsL; j++){
				var el = document.getElementById(els[j].selector); // If you want you can replace this by a more powerful selector function ($, querySelector, etc.)
				if (!el || el && els[j].checkContent && !el.nextSibling && !el.parentNode.nextSibling && !document.readyState != 'complete') continue;
				els[j].callback.apply(el);
				els.splice(j, 1);   // Remove the found element
				--elsL;             // Update the length
			}
			// Stop the detection
			clearTimeout(interval);
			// Continue to check if the limit was not reached or if the list isn't empty
			if (++i < limit && els.length) interval = setTimeout(check, freq);
			else interval = null;
		};

})(this);