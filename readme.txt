/****************************** TO-DO LIST

* _saveItems() agregar posible falta de # hash en el atributo data del elemento
* add the class .disabled to make a tab inaccessible
* dont change template option

/****************************** Usage:

<div id="elementID" class="v23-togglebox" data-moviltemplate="tab" data-desktoptemplate="tab">
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
	}
);

if (el.dataset.desktoptemplate != undefined) options.desktopTemplate = el.dataset.desktoptemplate; 
if (el.dataset.moviltemplate != undefined) options.movilTemplate = el.dataset.moviltemplate;