export default {
    'tabs-demo': {
        breakpoints: {
            desktop: {template: 'tab', style: 'tab-style1', animation: 'fadeIn'}, // 1200px
            // tablet: {template: 'tab', style: 'tab-style3'}, // 992px
            // mobileLandscape: {template: 'tab', style: 'tab-style5'}, // 768px
            // mobilePortrait: {template: 'tab', style: 'tab-style1'}, // 480px
            1440: {template: 'tab', style: 'tab-style2', animation: 'fadeIn'},
            1024: {template: 'tab', style: 'tab-style4', animation: 'fadeIn'},
            768: {template: 'tab', style: 'tab-style3', animation: 'fadeIn'},
            425: {template: 'tab', style: 'tab-style6', animation: 'fadeIn'},
            375: {template: 'tab', style: 'tab-style5', animation: 'fadeIn'},
            320: {template: 'tab', style: 'tab-style1', animation: 'fadeIn'},
        }
    },
    'accordions-demo': {
        breakpoints: {
            desktop: {template: 'accordion', style: ''},
            1440: {template: 'accordion', style: 'accordion-style1', animation: 'fadeIn'},
            1024: {template: 'accordion', style: 'accordion-style2', animation: 'fadeIn'},
        }
    }
}