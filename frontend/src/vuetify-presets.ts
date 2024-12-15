const dark = {
    colors: {
        primary: '#56b7f1',
        accent: '#607df9',
        secondary: '#4370e4',
        info: '#0164d3',
        warning: '#fec500',
        error: '#ff4d7e',
        success: '#2cdd9b',
    },
}
const light = {
    dark: false,
    colors: {
        background: '#F8F9FA',
        surface: '#FFFFFF',
        'surface-variant': '#424242',
        'on-surface-variant': '#FFFFFF',
        'primary-darken-1': '#3700B3',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        success: '#7fd9a3',
        warning: '#FB8C00',
        primary: '#668093',
        secondary: '#a6bcc8',
        info: '#0164d3',
        accent: '#849eaf',
        color1: '#294557',
        color2: '#23495c',
/*
        color3: '#b0c5d4',
*/
        color3: '#d7eaf4'
    },
}

export const vuetifyPresets = {
    theme: {
        defaultTheme: 'light',
        themes: {
            light,
            dark,
        },
    },
    defaults: {
        VNavigationDrawer:{
            class: 'custom-scrollbar'
        }
    },
}
