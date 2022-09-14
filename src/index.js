import options from "./js/demo/options";
import factory from "./js/demo/factory";
import "./sass/demo.sass";

const demo = {
	1 : 'tabs-demo',
	2 : 'accordions-demo',
};

const root = document.getElementById('root');
const template = new DOMParser().parseFromString(factory.template, 'text/html').body.firstChild;
root.appendChild( template );
factory.init(V23_ToggleBox, options[ demo['1'] ]);

// document.querySelector('body').classList.add("text-color-2");