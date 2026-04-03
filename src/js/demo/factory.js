export default {
    template: `<section>
    <h1>V23 ToggleBox Demo</h1>
    <div id="demo" class="togglebox">				
        <div class="togglebox__nav">
			<p class="togglebox__btn" data-boxid="#box1">Primer Item</p>
            <p class="togglebox__btn" data-boxid="#box2"><i>Segundo Item</i></p>
            <p class="togglebox__btn" data-boxid="#box3">Tercer Item</p>
        </div>
		<div class="togglebox__items">
			<div id="box1" class="togglebox__item">
				<div class="componente">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo! Dolores debitis architecto ratione sit, molestias reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur?</div>
			</div>
			<div id="box2" class="togglebox__item">
				<div class="componente">Dolores debitis architecto ratione sit, molestias reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo!</div>
			</div>
			<div id="box3" class="togglebox__item">
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