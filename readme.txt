/****************************** HTML Usage:

<div id="elementID" class="v23-togglebox tab-style1" data-template="(tab/accordion)" data-breakpoints="(integer):(tab/accordion)">
	<div class="v23-togglebox__nav">
		<* class="v23-togglebox__btn" data-boxid="#boxID">...</*>
		...
	</div>
	<div class="v23-togglebox__items">
		<div id="boxID" class="v23-togglebox__item">...</div>
		...
	</div>
</div>

/****************************** JS Usage:
cont options = {	
	initialTemplate : 			// (optional) (string) accordion | tab , default = tab

	// Used for scrolling when header is fixed
	headerHeight : 				// (optional) (integer) 
	
	// Breakpoints to handle template changes
	breakpoints : 				// (optional) (obj) { (integer) : {template: (string) accordion | tab }, ... }
								// default = { 768 : {template:'accordion'} }
}

V23_ToggleBox.init(options);

--or-- 

var el = document.getElementById('elementID');

V23_ToggleBox.create( 
	el,								// (required) (DOMElement)
	options							// (optional) (obj)
);

/****************************** Changelog:

6.8.23 (26-08-2022)
- v6: handle template in diferent devices with breakpoints

5.8.29 (26-08-2022)
- find the item in node tree

5.8.28 (20-08-2022)
- _handle_template() function simplified
- looking for buttons outside nav in case of accordion template

5.8.27 (19-08-2022)
- refactoring _handle_template(): move buttons instead of moving items

5.8.26 (17-08-2022)
- silent removing implementation

5.8.25 (16-08-2022)
- _findAncestor() implementation on buttons
- separation of test and library's css
- silent adding implementation
- _attach_click_events() function delegated to nav
- refactoring _handle_active_class() function

5.8.24 (29-07-2022)
- changes for dark theme
- init method accept options
- addItem method 
- removeItem method 

5.8.23 (22-09-2021)
- implementation: init() function
- V23_ToggleBox.create() return instance object
- _handle_active_class is triggered on resize

4.8.23 (16-08-2021)
- implementation: scroll commented

3.8.23 (13-01-2021)
- implementation: headerHeight option 
- implementation: dont do _handle_template() re arrange if is the same tab template 
3
2.8.23 (26-03-2020)
- implementation: _cleanHash() function

/****************************** TO-DO LIST

* _saveItems() agregar posible falta de # hash en el atributo data del elemento
* add the class .disabled to make a tab inaccessible