import "./sass/v23-togglebox.sass";

/**!
 * V23 ToggleBox
 * @author	Mvelarde   <miguel@velarde23.com>
 * @license MIT
 */

 (function v23ToggleBoxModule(factory) {
	"use strict";

	if (typeof define === "function" && define.amd) {
		define(factory);
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["V23_ToggleBox"] = factory();
	}
})(function v23ToggleBoxFactory() { 
	"use strict";

	var instances = [],
		version = '7.8.23',
		timers = {};

	/**
	 * @class  V23_ToggleBox
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function V23_ToggleBox(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			console.log( 'V23 ToggleBox Error: `el` must be HTMLElement, and not ' + {}.toString.call(el) );
			return;
		}

		if (!this._createInstance(el)) return;
		
		this.el = el; // root element
		this._handleOptions(options);
		this.options.previousBreakpoint = null;

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		this.nav = this.el.getElementsByClassName('v23-togglebox__nav')[0];
		this.itemsBox = this.el.getElementsByClassName('v23-togglebox__items')[0];

		this.items = this._saveItems();
		if (this.items.length > 0) {
			this._handle_template();
			this._attach_click_events();
			this._change_active_tab_if_hash_in_url();
			this._attach_resize_events();	
		}
	};

	V23_ToggleBox.prototype = {
		_handleOptions( options ){
			// options configured as data-attributes
			var dataOptions = {},
				dataBreakpoints = this.el.dataset.breakpoints,
				dataHeaderHeight = this.el.dataset.headerheight;
			if (dataBreakpoints != undefined) dataOptions.breakpoints = this._handleDataBreakpoints(dataBreakpoints); 
			if (dataHeaderHeight != undefined) dataOptions.headerHeight = dataHeaderHeight;
						
			var defaults = {
				breakpoints : {
					desktop: { template: 'tab', style: '' },
					768: { template:'accordion', style: '' }
				},
				headerHeight : 0
			};
			
			this.options = {...defaults, ...options, ...dataOptions};
			if( !('desktop' in this.options.breakpoints) ) this.options.breakpoints.desktop = { template: 'tab', style: '' };
		},
		_handleDataBreakpoints(str){
			var _obj = {},
				items = str.split(',');

			if( Array.isArray(items) ){
				items.map( item =>{
					if(item != ''){
						var options = item.split('|');
						if(Array.isArray(options) && options.length && options[0]) {
							_obj[options[0]] = { 
								template: options[1],
								style: options[2] || '',
							};
						}
					}
				});
			} 
			return _obj;
		},
		_createInstance(el){
			for (var i = 0; i < instances.length; i++) {
				if (instances[i].el === el) {
					console.log('V23 ToggleBox Error: el elemento id:'+el.id+' | class:'+el.className+' solo puede ser instanciado una vez.');
					return false;
				}
			}
			return true;
		},
		_saveItems(){
			var btns = this.el.getElementsByClassName('v23-togglebox__btn'), 
				items = [];
			for (var i = 0; i < btns.length; i++) {
				var boxid = btns[i].dataset.boxid;

				if (boxid) {
					var boxEl = this.el.querySelector(boxid);
					if ( boxEl && boxEl.nodeType && boxEl.nodeType === 1 ) {
						items.push({ btn: btns[i], box: boxEl });
					}
						
				}
			}
			return items;
		},
		_attach_click_events(){
			_on(this.el, 'click', this._open_tab);
		},
		_open_tab(event){
			event.preventDefault();
			var item = _hasClass(event.target, 'v23-togglebox__btn') ? event.target : _findAncestor(event.target, '.v23-togglebox__btn');
			if(item) this._handle_active_class(item);
		},
		_handle_active_class(btn){
			const currentBreakpoint = this._get_current_breakpoint(),
				activeTemplate = this.options.breakpoints[currentBreakpoint].template; 

			if (btn) { // method is triggered by a user click event
				for (var i = 0; i < this.items.length; i++) {
					let item = this.el.querySelector( this.items[i].btn.dataset.boxid );

					if ( this.items[i].btn.dataset.boxid === btn.dataset.boxid ) {
						if (activeTemplate === 'accordion'){
							_toggleClass(btn, 'active');
							_toggleClass(item, 'active');
							// _scrollTo(document.documentElement, (btn.offsetTop - this.options.headerHeight), 500);
						} else {
							_addClass(btn, 'active');
							_addClass(item, 'active');	
						}
					} else {
						_removeClass(this.items[i].btn, 'active');
						_removeClass(item, 'active');	
					}
				};				
			} else { // method is triggered on init or on resize
				for (var i = 0; i < this.items.length; i++) {
					_removeClass(this.items[i].btn, 'active');
					_removeClass(this.items[i].box, 'active');	
				};				

				if (activeTemplate === 'tab') {
					_addClass(this.items[0].btn, 'active');
					_addClass(this.items[0].box, 'active');	
				}
			}
		},
		_change_active_tab_if_hash_in_url(){
			if(window.location.hash) {
            	var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
            	var cleaned_hash = _cleanHash(hash);
            	for (var i = 0; i < this.items.length; i++) {
					if ( this.items[i].box.id === cleaned_hash ) this.items[i].btn.click();
				}
    	    } 
		},
		_handle_template(){
			var previousBreakpoint = this._get_previous_breakpoint(),
				currentBreakpoint = this._get_current_breakpoint(),
				{template, style} = this.options.breakpoints[currentBreakpoint];
				
			if(currentBreakpoint != previousBreakpoint){
				const previousTemplate = this.options.breakpoints[previousBreakpoint];

				if(template != previousTemplate){
					for (var i = 0; i < this.items.length; i++) {
						if(template=='tab') this.nav.appendChild(this.items[i].btn);
						if(template=='accordion') _insertBefore(this.items[i].btn, this.items[i].box);
					};
				}

				this.el.dataset.template = template;
				this.el.dataset.style = style;
				this._handle_active_class();
				this.options.previousBreakpoint = currentBreakpoint;
			}
		},
		_get_previous_breakpoint(){
			return this.options.previousBreakpoint;
		},
		_get_current_breakpoint(){
			var viewportWidth = _getViewportDimensions().width,
				breakpoints = this.options.breakpoints,
				breakpoint = null;
				
			if( Object.keys(breakpoints).length > 0 ){
				var breakpointZones = [];
					
				for(var bp in breakpoints){
					if (bp != 'desktop' && bp >= viewportWidth) { breakpointZones.push(bp); }
				}
				if( breakpointZones.length ){
					var shortest = Math.min.apply(Math, breakpointZones);
						breakpoint = shortest;
				}
			} 

			return breakpoint || 'desktop';
		},
		_attach_resize_events(){
			var timeToWaitForLast = 100, 
				that = this,
				id = "v23ToggleBox"+instances.length;

			window.addEventListener('resize', function(){
				_waitForFinalEvent( function() {
					that._handle_template();
				}, timeToWaitForLast, id);
			}, true);
		},
		/**
	 	* Add a New Item
	 	* @param {Object}      [options]
		* {
		* id:           (required) (string)
		* btn:          (optional) (obj) { content:`` }
		* box:          (optional) (obj) { content:`` }
		* setActive:    (optional) (bool)
		* afterAddItem: (optional) (function)
		* silent:       (optional) (bool) if true there is not cloning neither adding operations
		*                                 useful when working with models that render the view themselves
		*                                 btn: (required) (DOMElement)
		*                                 box: (required) (DOMElement)
		* }
	 	*/
		addItem(options){
			if(!options.silent){
				if(options.id === undefined) return;

				const currentBreakpoint = this._get_current_breakpoint(),
					activeTemplate = this.options.breakpoints[currentBreakpoint].template; 

				var newBtn = this.items[0].btn.cloneNode(true);
				newBtn.innerHTML = (options.btn && options.btn.content) ? options.btn.content : 'New Item';
				newBtn.dataset.boxid = '#'+options.id;
				
				var newBox = this.items[0].box.cloneNode(true);
				newBox.innerHTML = (options.box && options.box.content) ? options.box.content : 'Lorem ipsum dolor sit amet consectetur...';
				newBox.id = options.id;
				
				if(activeTemplate == 'tab') this.nav.appendChild(newBtn);
				if(activeTemplate == 'accordion') this.itemsBox.appendChild(newBtn);
				this.itemsBox.appendChild(newBox);
			} else {
				var newBtn = options.btn;
				var newBox = options.box;
			}

			this.items.push({ btn: newBtn, box: newBox });
			if(options.setActive) this._handle_active_class(newBtn);
			if(typeof options.afterAddItem == 'function') options.afterAddItem(newBtn,newBox);
		},
		/**
	 	* Remove Item
	 	* @param {Object}      [options]
		* {
		* index:           (required) (integer) index of item to be removed
		* setActive:       (optional) (integer) index of item to be set as active
		* afterRemoveItem: (optional) (function)
		* silent:          (optional) (bool) if true there is not removing operations
		*                                 useful when working with models that manage the view themselves
		* }
	 	*/
		removeItem(options){
			var index = options.index;
			if(index <= this.items.length && this.items.length > 1 && index >= 0){
				if(!options.silent){
					this.items[index].btn.remove();
					this.items[index].box.remove();
				}
				var deletedItem = this.items.splice(index, 1);
				
				if(options.setActive != undefined){
					if(options.setActive >= 0 && options.setActive <= this.items.length){
						this.items[options.setActive].btn.click();
					}
				} else {
					const currentBreakpoint = this._get_current_breakpoint(),
						activeTemplate = this.options.breakpoints[currentBreakpoint].template; 
					if(activeTemplate == 'tab' && _hasClass(deletedItem[0].btn,'active')){
						this.items[(this.items.length - 1)].btn.click();
					}
				}
				if(typeof options.afterRemoveItem == 'function') options.afterRemoveItem(deletedItem);
			}
		}
	};

	function _on(el, event, fn) {
		el.addEventListener(event, fn, false);
	};

	function _hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	};

	function _addClass(elem, className) {
		// TODO : ELEM IS ARRAY
		if (!_hasClass(elem, className)) {
			elem.className += ' ' + className;
		}
	};	

	function _removeClass(elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
		if (_hasClass(elem, className)) {
			while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
				newClass = newClass.replace(' ' + className + ' ', ' ');
			}
			elem.className = newClass.replace(/^\s+|\s+$/g, '');
		}
	};

	function _toggleClass(element, cls) {
		if ( _hasClass(element,cls) ) { _removeClass(element,cls);
		} else { _addClass(element,cls); }
	};

	function _getViewportDimensions() { 
		var w=window,
		d=document,
		e=d.documentElement,
		g=d.getElementsByTagName('body')[0],
		x=w.innerWidth||e.clientWidth||g.clientWidth,
		y=w.innerHeight||e.clientHeight||g.clientHeight;

		return { width:x,height:y };
	};

	function _scrollTo(element, to, duration) {
    	var start = element.scrollTop,
        	change = to - start,
        	currentTime = 0,
        	increment = 20;
	        
    	var animateScroll = function(){        
        	currentTime += increment;
        	var val = Math.easeInOutQuad(currentTime, start, change, duration);
        	element.scrollTop = val;
        	if(currentTime < duration) {
            	setTimeout(animateScroll, increment);
        	}
    	};
    	animateScroll();
	};

	function _findAncestor(el, selector) {
		while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,selector)));
		return el;
	}

	Math.easeInOutQuad = function (t, b, c, d) {
		//t = current time
		//b = start value
		//c = change in value
		//d = duration
  		t /= d/2;
    		if (t < 1) return c/2*t*t + b;
    		t--;
    		return -c/2 * (t*(t-2) - 1) + b;
	};

	function _cleanHash(hash){
		// remove query vars
		var index = hash.indexOf("?");
		var result;
		if (index < 0) {
		    result = hash;
		} else {
		    result = hash.substr(0, index);
		}
		return result;
	};

	function _insertAfter(newNode, referenceNode) {
    	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	};

	function _insertBefore(newNode, referenceNode) {
    	referenceNode.parentNode.insertBefore(newNode, referenceNode);
	};

	function _waitForFinalEvent(callback, ms, uniqueId) {
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
			timers[uniqueId] = setTimeout(callback, ms);
	};

	/**
	 * Create v23ToggleBox instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	V23_ToggleBox.create = function (el, options) {
		var options = (options) ? options : {},
			togglebox = new V23_ToggleBox(el, options);

		if (togglebox.el) {
			instances.push(togglebox);
		}
		return togglebox;
	};

	V23_ToggleBox.v = function () {
		console.log( version );
	};

	V23_ToggleBox.init = function (options) {
		var toggleboxes = document.getElementsByClassName('v23-togglebox');

        for (var i = 0; i < toggleboxes.length; i++) {
            V23_ToggleBox.create( toggleboxes[i], options);
        }

        return instances;
	};

	// Export
	return V23_ToggleBox;
});