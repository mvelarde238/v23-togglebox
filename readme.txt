/****************************** TO-DO LIST

* _saveItems() agregar posible falta de # hash en el atributo data del elemento
* add the class .disabled to make a tab inaccessible

/****************************** Usage:

<div id="elementID" class="v23-togglebox">
	<div class="v23-togglebox__nav">
		<* class="v23-togglebox__btn" data-boxid="#boxID">...</*>
		...
	</div>
	<div class="v23-togglebox__items">
		<div id="boxID" class="v23-togglebox__item">...</div>
		...
	</div>
</div>

var el = document.getElementById('elementID');

V23_ToggleBox.create( 
	el,								(required) (DOMElement)
	{	
		desktopTemplate : 			(optional) (string) accordion | tab , default = tab
		movilTemplate : 			(optional) (string) accordion | tab , default = accordion
		breakpoint : 				(optional) (integer) breakpoint from desktop to movil, default = 768 
		headerHeight : 				(optional) (integer) used for scrolling when header is fixed
	}
);

/****************************** Changelog:

2.8.23 (26-03-2020)
- implementation: _cleanHash() function

3.8.23 (13-01-2021)
- implementation: headerHeight option 

3.8.23 (13-05-2021)
- implementation: dont do _handle_template() re arrange if is the same tab template 

3.8.24 (16-08-2021)
- implementation: scroll commented