# V23 ToggleBox

### HTML
```html
<link href="./dist/v23-togglebox.css" rel="stylesheet">
<script src="./dist/v23-togglebox.js"></script>

<div id="elementID" class="v23-togglebox">
	<div class="v23-togglebox__nav">
		<p class="v23-togglebox__btn" data-boxid="#boxID">...</p>
		...
	</div>
	<div class="v23-togglebox__items">
		<div id="boxID" class="v23-togglebox__item">...</div>
		...
	</div>
</div>
```

### JS
```js
cont options = {	
	headerHeight : 100,
	breakpoints : {}
}
V23_ToggleBox.init(options);

--or-- 

var el = document.getElementById('elementID');

V23_ToggleBox.create( 
	el,								// (required) (DOMElement)
	options						// (optional) (obj)
);
```

## Summary

* Library name: `v23-togglebox`

## Options

| Option | Description | Default |
|-|-|-
| `headerHeight` | (optional) (integer) Used for scrolling when header is fixed | 0 |
| `breakpoints` | (optional) (obj) Breakpoints to handle template and styles changes { (integer/'desktop') : {template: (string) accordion | tab, style: (string) }, ... } | { desktop: { template: 'tab', style: '' }, 768: { template:'accordion', style: '' } } |


## Download

* GIT
  * `git clone https://github.com/mvelarde238/v23-togglebox.git`

## Development

Clone the repository

```sh
$ git clone https://github.com/mvelarde238/v23-togglebox.git
$ cd v23-togglebox
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm run start
```

Build the source

```sh
$ npm run build
```

## Changelog

9.0.0 (16-07-2025)
- Merge with changes made in mv23theme repo

8.8.24 (19-09-2022)
- color scheme inherit --ui-color-1 and --ui-color-2 variables

8.8.23 (13-09-2022)
- version 8.8.23
- handle style for diferent devices with breakpoints
- new [tab/accordion] styles
- webpack implementation for development

6.8.23 (26-08-2022)
- v6: handle template for diferent devices with breakpoints

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

2.8.23 (26-03-2020)
- implementation: _cleanHash() function

## License

MIT
