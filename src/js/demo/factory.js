export default {
    template: `<section>
    <h1>V23 ToggleBox Demo</h1>
    <div id="demo" class="togglebox">				
        <div class="togglebox__nav">
			<button type="button" class="togglebox__btn" data-item-uuid="7b1e9e5a-9b8b-4c8e-a1ad-000000000001">
                <i class="togglebox__icon">☘</i>
                <span class="togglebox__title">First Item</span>
                <span class="togglebox__subtitle">This is a subtitle</span>
            </button>
            <button type="button" class="togglebox__btn" data-item-uuid="7b1e9e5a-9b8b-4c8e-a1ad-000000000002">
                <i class="togglebox__icon">☘</i>
                <span class="togglebox__title">Second Item</span>
                <span class="togglebox__subtitle">This is a subtitle</span>
            </button>
            <button type="button" class="togglebox__btn" data-item-uuid="7b1e9e5a-9b8b-4c8e-a1ad-000000000003">
                <i class="togglebox__icon">☘</i>
                <span class="togglebox__title">Third Item</span>
                <span class="togglebox__subtitle">This is a subtitle</span>
            </button>
        </div>
		<div class="togglebox__items">
			<div id="box1" class="togglebox__item" data-uuid="7b1e9e5a-9b8b-4c8e-a1ad-000000000001">
				<div class="componente">01. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo! Dolores debitis architecto ratione sit, molestias reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur?</div>
			</div>
			<div id="box2" class="togglebox__item" data-uuid="7b1e9e5a-9b8b-4c8e-a1ad-000000000002">
				<div class="componente">02. Dolores debitis architecto ratione sit, molestias reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo!</div>
			</div>
			<div id="box3" class="togglebox__item" data-uuid="7b1e9e5a-9b8b-4c8e-a1ad-000000000003">
				<div class="componente">03. Reiciendis corrupti rem. Quasi assumenda quidem, officiis consectetur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo expedita tempore a voluptatum fugiat nemo! Dolores debitis architecto ratione sit, molestias ret.</div>
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