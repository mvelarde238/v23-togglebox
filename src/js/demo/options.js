export default {
    'tabs-demo': {
        breakpoints: {
            desktop: {template: 'tab', style: ''},
            // tablet: {template: 'tab', style: 'tab-style-3'}, // 992px
            // mobileLandscape: {template: 'tab', style: 'tab-style-5'}, // 768px
            // mobilePortrait: {template: 'tab', style: 'tab-style-1'}, // 480px
            1440: {template: 'tab', style: 'tab-style-2'},
            1024: {template: 'tab', style: 'tab-style-4'},
            768: {template: 'tab', style: 'tab-style-3'},
            425: {template: 'tab', style: 'tab-style-6'},
            375: {template: 'tab', style: 'tab-style-5'},
            320: {template: 'tab', style: 'tab-style-1'},
        }
    },
    'accordions-demo': {
        breakpoints: {
            desktop: {template: 'accordion', style: ''},
            1440: {template: 'accordion', style: 'accordion-style-1'},
            1024: {template: 'accordion', style: 'accordion-style-2'},
        }
    }
}