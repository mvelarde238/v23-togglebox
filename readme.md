# V23 ToggleBox

### HTML
```html
<link href="./dist/v23-togglebox.css" rel="stylesheet">
<script src="./dist/v23-togglebox.js"></script>

<div id="elementID" class="togglebox">
	<div class="togglebox__nav" role="tablist">
		<button class="togglebox__btn" data-boxid="#boxID"
			role="tab" aria-selected="true" aria-controls="boxID">...</button>
		...
	</div>
	<div class="togglebox__items">
		<div id="boxID" class="togglebox__item"
			role="tabpanel" aria-labelledby="tab-boxID">...</div>
		...
	</div>
</div>
```

> **Note:** The component automatically manages ARIA attributes (`role`, `aria-selected`, `aria-expanded`, `aria-controls`, `aria-labelledby`) and keyboard navigation (Arrow keys, Home, End). Buttons should be `<button>` elements or elements with `role="button"`. If buttons have no `id`, the library generates one with the `tab-` prefix.

### JS
```js
const options = {	
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
| `breakpoints` | (optional) (obj) Breakpoints to handle template and styles changes: (integer/'desktop') : template: (string) accordion, tab, ...  style: (string) ...  scroll_target: (string) button, item, component, ... animation: (string) fadeIn, slideDown, ... | { desktop: { template: 'tab', style: '' }, 768: { template:'accordion', style: '' } } |
| `tab_button_behavior` | (optional) (string) Defines the behavior of tab buttons when clicked: 'default' (default) - clicking an active tab button does nothing; 'toggle' - clicking an active tab button will toggle its active state, allowing it to be deactivated. | 'default' |


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
$ pnpm install
```

Start the dev server

```sh
$ pnpm run start
```

Build the source

```sh
$ pnpm run build
```

## Changelog

10.2.0 (24-07-2026)
- Accessibility improvements: 
* 1.3.1 Info and Relationships: Roles ARIA tab/tabpanel/tablist
* 1.4.3 Contrast: Focus-visible with outline and color contrast
* 2.1.1 Keyboard: complete navigation with arrow keys, Home/End
* 2.4.3 Focus Order: tabindex managed correctly
* 2.4.7 Focus Visible: `:focus-visible` with outline
* 2.4.6 Headings and Labels: Buttons with textual content
* 4.1.2 Name, Role, Value: roles + aria-selected/expanded + aria-controls
* 7.2.5 Motion: `prefers-reduced-motion`
* 1.3.5 Identify Input Purpose

10.1.3 (23-07-2026)
- Sync src files with mv23theme repo to ensure consistency and compatibility across related projects, improving maintainability and reducing potential integration issues.

10.1.2 (16-06-2026)
- tab_button_behavior option added to define the behavior of tab buttons when clicked, allowing for more flexible interaction patterns based on user preferences.

10.1.1 (?)
- startIndex option added to allow developers to specify which togglebox item should be active by default when the component is initialized, enhancing customization options for different use cases.

10.1.0 (01-05-2026)
- scroll_target and animation properties are now included in the devicesControl object, allowing for better control over the togglebox behavior across different devices and states

10.0.0 (02-04-2026)
- Remove v23- prefix from class names and data attributes for better readability and maintainability.

9.0.2 (11-01-2025)
- Implements _translateBreakpoints() function to map breakpoint keys (desktop, tablet, mobileLandscape, mobilePortrait) to their corresponding pixel values.

- 19-09-2025
- npm migrated to pnpm
- add sass-loader "modern" configuration

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
