export default {
    template: `<section>
    <h1>V23 ToggleBox Demo</h1>
    <div id="demo" class="v23-togglebox">				
        <div class="v23-togglebox__nav">
			<p class="v23-togglebox__btn" data-boxid="#box1">Primer Item</p>
            <p class="v23-togglebox__btn" data-boxid="#box2"><i>Segundo Item</i></p>
            <p class="v23-togglebox__btn" data-boxid="#box3">Tercer Item</p>
        </div>
		<div class="v23-togglebox__items">
			<div id="box1" class="v23-togglebox__item">
				<div class="componente">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo! Dolores debitis architecto ratione sit, molestias reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur?</div>
			</div>
			<div id="box2" class="v23-togglebox__item">
				<div class="componente">Dolores debitis architecto ratione sit, molestias reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo!</div>
			</div>
			<div id="box3" class="v23-togglebox__item">
				<div class="componente">Reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo! Dolores debitis architecto ratione sit, molestias ret.</div>
			</div>
		</div>
	</div></section>`,
    init: (V23_ToggleBox, options) => {
        var togglebox = document.getElementById('demo'), 
            options = {
                headerHeight: 'headerHeight-options',
                breakpoints: options.breakpoints
            };
        V23_ToggleBox.create(togglebox, options);
    }
}