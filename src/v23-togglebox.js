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
		version = '10.2.0',
		timers = {};

	/**
	 * @class  V23_ToggleBox
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function V23_ToggleBox(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			console.log( 'ToggleBox Error: `el` must be HTMLElement, and not ' + {}.toString.call(el) );
			return;
		}

		if (!this._createInstance(el)) return;
		
		this.el = el; // root element
		this.activeTemplate = null;
		this.initialUrl = window.location.href;
		this._handleOptions(options);
		this.options.previousBreakpoint = null;

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		this.nav = this.el.getElementsByClassName('togglebox__nav')[0];
		this.itemsBox = this.el.getElementsByClassName('togglebox__items')[0];

		this.items = [];
		this._saveItems();
		this._create_live_region();
		if (this.items.length > 0) {
			setTimeout(() => {
				this._attach_click_events();
				this._attach_keyboard_events();
				this._handle_template();
				this._change_active_tab_if_hash_in_url();
				this._attach_resize_events();
				this._attach_hash_change_events();
	
				_addClass(this.el, 'togglebox-initialized');
			}, this.options.delay);
		}
	};

	V23_ToggleBox.prototype = {
		_handleOptions( options ){
			// options configured as data-attributes
			var dataOptions = {},
				dataTemplate = this.el.dataset.template,
				dataBreakpoints = this.el.dataset.breakpoints,
				dataHeaderHeight = this.el.dataset.headerheight,
				dataStartIndex = this.el.dataset.startIndex,
				dataTabButtonBehavior = this.el.dataset.tabButtonBehavior,
				dataDelay = this.el.dataset.delay;

			if (dataTemplate != undefined) dataOptions.initialTemplate = dataTemplate;
			if (dataBreakpoints != undefined) dataOptions.breakpoints = this._handleDataBreakpoints(dataBreakpoints); 
			if (dataHeaderHeight != undefined) dataOptions.headerHeight = dataHeaderHeight;
            if (dataStartIndex != undefined) dataOptions.startIndex = parseInt(dataStartIndex);
            if (this.el.hasAttribute("data-multistep")) dataOptions.multistep = 1;
            if (dataTabButtonBehavior != undefined) dataOptions.tab_button_behavior = dataTabButtonBehavior;
            if (dataDelay != undefined) dataOptions.delay = parseInt(dataDelay);
			
            // js-options are overriddden if data-options are passed
			this.options = options = _extend(options, dataOptions);
			
			// defaults if no options are passed
			var defaults = {
				initialTemplate : 'tab',
				/**
				 * Breakpoints object structure:
				 * device-id || breakpoint-width : 
				 * - template: 'tab' || 'accordion'
				 * - style: '', 
				 * - scroll_target: 'button' || 'item' || 'component' || ''
				 * - animation: 'fadeIn' || string with animation name (optional, only used if different than fadeIn)
				 */
				breakpoints : {
					desktop: { template: 'tab', style: '', scroll_target: '', animation: 'fadeIn' },
					768: { template:'accordion', style: '', scroll_target: '', animation: 'fadeIn' },
				},
				headerHeight : 0,
				multistep : 0,
				startIndex: 0, // initial active tab index
				tab_button_behavior: 'default', // default || toggle
				delay: 0 // add a delay to ensure all elements inside are loaded
			};
			
			// Set default options
			this.options = {...defaults, ...options, ...dataOptions};

			// Ensure device-ids on breakpoints are translated
			this.options.breakpoints = this._translateBreakpoints( this.options.breakpoints );

			if( !('desktop' in this.options.breakpoints) ){
				this.options.breakpoints.desktop = { template: 'tab', style: '', scroll_target: '', animation: 'fadeIn' };
			} 
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
								scroll_target: options[3] || '',
								animation: options[4] || 'fadeIn'
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
					console.log('ToggleBox Error: el elemento id:'+el.id+' | class:'+el.className+' solo puede ser instanciado una vez.');
					return false;
				}
			}
			return true;
		},
		_saveItems(){
			var btns = this.nav.getElementsByClassName('togglebox__btn');
			this.btns = btns;
			for (var i = 0; i < btns.length; i++) {
				var boxid = btns[i].dataset.boxid;

				if (boxid) {
					var boxEl = this.itemsBox.querySelector(boxid);
					if ( boxEl && boxEl.nodeType && boxEl.nodeType === 1 ) {
						// ARIA: button as tab
						btns[i].setAttribute('role', 'tab');
						btns[i].setAttribute('aria-controls', boxEl.id);
						if (!btns[i].id) {
							btns[i].id = 'tab-' + boxEl.id;
						}

						// ARIA: panel
						boxEl.setAttribute('role', 'tabpanel');
						boxEl.setAttribute('aria-labelledby', btns[i].id);

						this.items.push({ btn: btns[i], box: boxEl });
					}
				}
			}
		},
		_attach_click_events(){
			for (var i = 0; i < this.btns.length; i++) {
				_on(this.btns[i], 'click', this._open_tab);
			}

			const go_to_step_btn = this.el.querySelectorAll('.go-to-step');
			for (var i = 0; i < go_to_step_btn.length; i++) {
				_on(go_to_step_btn[i], 'click', this._go_to_step);
			}
		},
		_open_tab(event){
			// event.preventDefault();
			var item = _hasClass(event.target, 'togglebox__btn') ? event.target : _findAncestor(event.target, '.togglebox__btn');
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
							btn.setAttribute('aria-expanded', _hasClass(btn, 'active') ? 'true' : 'false');
						} else {
							const tabButtonBehavior = this.options.tab_button_behavior || 'default';
							if(tabButtonBehavior == 'toggle'){
								_toggleClass(btn, 'active');
								_toggleClass(item, 'active');
							} else {
								_addClass(btn, 'active');
								_addClass(item, 'active');	
							}
							btn.setAttribute('aria-selected', 'true');
							btn.setAttribute('tabindex', '0');
						}

						this._maybe_scroll_to_target(btn, item);
						this._handle_hash_in_url(btn.dataset.boxid);

						// Announce to screen readers
						if (this.liveRegion) this.liveRegion.textContent = btn.textContent;

						// Refresh ScrollTrigger breakpoints
						if (typeof refreshScrollTriggerBreakpoints === 'function'){
							refreshScrollTriggerBreakpoints();
						}

					} else {
						_removeClass(this.items[i].btn, 'active');
						_removeClass(item, 'active');
						if (activeTemplate === 'tab') {
							this.items[i].btn.setAttribute('aria-selected', 'false');
							this.items[i].btn.setAttribute('tabindex', '-1');
						} else {
							this.items[i].btn.setAttribute('aria-expanded', 'false');
						}
					}
				};				
			} else { // method is triggered on init or on resize
				for (var i = 0; i < this.items.length; i++) {
					_removeClass(this.items[i].btn, 'active');
					_removeClass(this.items[i].box, 'active');
					if (activeTemplate === 'tab') {
						this.items[i].btn.setAttribute('aria-selected', 'false');
						this.items[i].btn.setAttribute('tabindex', '-1');
					} else {
						this.items[i].btn.setAttribute('aria-expanded', 'false');
					}
				};				

				if (activeTemplate === 'tab') {
					let startIndex = this.options.startIndex;
					_addClass(this.items[startIndex]?.btn, 'active');
					_addClass(this.items[startIndex]?.box, 'active');
					if (this.items[startIndex]?.btn) {
						this.items[startIndex].btn.setAttribute('aria-selected', 'true');
						this.items[startIndex].btn.setAttribute('tabindex', '0');
					}
				}
			}
			if( this.options.multistep ) this._add_multistep_mode_classes();
		},
		_add_multistep_mode_classes(){
			let foundActive = false;

			for (var i = 0; i < this.btns.length; i++) {
				let button = this.btns[i];
				button.classList.remove('completed-step', 'pending-step');
			
				if (button.classList.contains('active')) {
					foundActive = true;
				} else if (!foundActive) {
					button.classList.add('completed-step');
				} else {
					button.classList.add('pending-step');
				}
  			};
		},
		_go_to_step(ev){
			const boxID = ev.target.dataset.boxid;
			if(boxID){
				const togglebox_btn = this.el.querySelector('.togglebox__btn[data-boxid="'+boxID+'"]');
				if( togglebox_btn ) togglebox_btn.click();
			}
		},
		_handle_hash_in_url(hash = ''){
			var urlObj = new URL(this.initialUrl);
			urlObj.search = '';
			urlObj.hash = '';
			var cleanUrl = urlObj.toString();
			history.pushState({},null,cleanUrl+hash);
		},
		_attach_hash_change_events(){
			var that = this;
			window.addEventListener('mv23ReplaceState', function(){
				that._change_active_tab_if_hash_in_url();
			}, true);
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
				{template, style, animation} = this.options.breakpoints[currentBreakpoint];
				
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
				this.el.dataset.animation = animation;
				this._sync_aria_roles(template);
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
		_translateBreakpoints( breakpoints ){
			var translated = {},
				deviceIdMap = {
					'desktop': 'desktop',
					'tablet': 992,
					'mobileLandscape': 768,
					'mobilePortrait': 480
				};

			for (var bp in breakpoints) {
				var translatedBp = deviceIdMap[bp] || bp;
				translated[translatedBp] = breakpoints[bp];
			}

			return translated;
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
		_maybe_scroll_to_target(btn, item){
			const currentBreakpoint = this._get_current_breakpoint();
			var breakpointScrollTarget = '';
			if(this.options && this.options.breakpoints && this.options.breakpoints[currentBreakpoint]){
				breakpointScrollTarget = this.options.breakpoints[currentBreakpoint].scroll_target || '';
			}
			if(breakpointScrollTarget){
				var scrollTarget = null;
				switch (breakpointScrollTarget) {
					case 'component':
						scrollTarget = $(this.el);
						break;
					case 'item':
						scrollTarget = $(item);
						break;
					case 'button':
						scrollTarget = $(btn);
						break;
					default:
						scrollTarget = $(btn);
						break;
				}
				if( scrollTarget.length ){
					let scrollTargetPosition = scrollTarget.offset().top;

					if( !MV23_GLOBALS.disableHeaderHeightCalculationOnAnchors ){
						var bodyStyles = window.getComputedStyle(document.body);
    					var sticky_header_height = bodyStyles.getPropertyValue('--sticky-header-height');
						scrollTargetPosition = scrollTargetPosition - parseInt(sticky_header_height);
					}

					$("html, body").animate({ scrollTop: scrollTargetPosition }, 
						{ 
							duration: 800,
							queue: false
						}
					);
				}
			}
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
				if (!newBtn.id) {
					newBtn.id = 'tab-' + options.id;
				}
				
				var newBox = this.items[0].box.cloneNode(true);
				newBox.innerHTML = (options.box && options.box.content) ? options.box.content : 'Lorem ipsum dolor sit amet consectetur...';
				newBox.id = options.id;

				// ARIA: set attributes on new items
				if (activeTemplate === 'tab') {
					newBtn.setAttribute('role', 'tab');
					newBox.setAttribute('role', 'tabpanel');
				} else {
					newBtn.setAttribute('role', 'button');
					newBtn.setAttribute('aria-expanded', 'false');
				}
				newBtn.setAttribute('aria-controls', options.id);
				newBox.setAttribute('aria-labelledby', newBtn.id);
				
				if(activeTemplate == 'tab') this.nav.appendChild(newBtn);
				if(activeTemplate == 'accordion') this.itemsBox.appendChild(newBtn);
				this.itemsBox.appendChild(newBox);

				// Re-attach click event for the new button
				_on(newBtn, 'click', this._open_tab);
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
		},
		/**
		 * A11y methods
		 */
		_create_live_region(){
			this.liveRegion = document.createElement('div');
			this.liveRegion.setAttribute('aria-live', 'polite');
			this.liveRegion.setAttribute('aria-atomic', 'true');
			this.liveRegion.className = 'sr-only';
			this.el.appendChild(this.liveRegion);
		},
		_attach_keyboard_events(){
			this.nav.addEventListener('keydown', this._handle_keydown);
		},
		_handle_keydown(event){
			var key = event.key;
			if (['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].indexOf(key) === -1) return;

			event.preventDefault();
			var currentIndex = this._get_focused_btn_index();
			var newIndex;

			switch (key) {
				case 'ArrowRight': case 'ArrowDown':
					newIndex = (currentIndex + 1) % this.btns.length;
					break;
				case 'ArrowLeft': case 'ArrowUp':
					newIndex = (currentIndex - 1 + this.btns.length) % this.btns.length;
					break;
				case 'Home': newIndex = 0; break;
				case 'End': newIndex = this.btns.length - 1; break;
			}

			this.btns[newIndex].focus();
			this.btns[newIndex].click();
		},
		_get_focused_btn_index(){
			for (var i = 0; i < this.btns.length; i++) {
				if (this.btns[i] === document.activeElement) return i;
			}
			return 0;
		},
		_sync_aria_roles(template){
			if (template === 'tab') {
				this.nav.setAttribute('role', 'tablist');
				for (var i = 0; i < this.items.length; i++) {
					this.items[i].btn.setAttribute('role', 'tab');
					this.items[i].box.setAttribute('role', 'tabpanel');
					this.items[i].btn.removeAttribute('aria-expanded');
				}
			} else if (template === 'accordion') {
				this.nav.removeAttribute('role');
				for (var i = 0; i < this.items.length; i++) {
					this.items[i].btn.setAttribute('role', 'button');
					this.items[i].box.removeAttribute('role');
					this.items[i].box.removeAttribute('aria-labelledby');
					var isActive = _hasClass(this.items[i].btn, 'active');
					this.items[i].btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
				}
			}
		}
	};

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	};

	function _on(el, event, fn) {
		el.addEventListener(event, fn, false);
	};

	function _hasClass(element, cls) {
		return (' ' + element?.className + ' ').indexOf(' ' + cls + ' ') > -1;
	};

	function _addClass(elem, className) {
		// TODO : ELEM IS ARRAY
		if (elem && !_hasClass(elem, className)) {
			elem.className += ' ' + className;
		}
	};	

	function _removeClass(elem, className) {
		var newClass = ' ' + elem?.className.replace( /[\t\r\n]/g, ' ') + ' ';
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

	function _findAncestor(el, selector) {
		while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,selector)));
		return el;
	}

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
		var toggleboxes = document.getElementsByClassName('togglebox');

        for (var i = 0; i < toggleboxes.length; i++) {
            V23_ToggleBox.create( toggleboxes[i], options);
        }

        return instances;
	};

	// Export
	return V23_ToggleBox;
});