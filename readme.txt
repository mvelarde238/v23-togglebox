/****************************** HTML Usage:

<div id="elementID" class="v23-togglebox tab-style1" data-desktoptemplate="(tab/accordion)" data-moviltemplate="(tab/accordion)">
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
	desktopTemplate : 			// (optional) (string) accordion | tab , default = tab
	movilTemplate : 			// (optional) (string) accordion | tab , default = accordion
	breakpoint : 				// (optional) (integer) breakpoint from desktop to movil, default = 768 
	headerHeight : 				// (optional) (integer) used for scrolling when header is fixed
}

V23_ToggleBox.init(options);

--or-- 

var el = document.getElementById('elementID');

V23_ToggleBox.create( 
	el,								// (required) (DOMElement)
	options							// (optional) (obj)
);

/****************************** Changelog:

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

2.8.23 (26-03-2020)
- implementation: _cleanHash() function

/****************************** TO-DO LIST

* _saveItems() agregar posible falta de # hash en el atributo data del elemento
* add the class .disabled to make a tab inaccessible