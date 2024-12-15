import { createApp } from 'vue'
import App from './App.vue'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router';
import {vuetifyPresets} from './vuetify-presets';
import './assets/scss/main.scss'


const vuetify = createVuetify({
    components,
    directives,
    ...vuetifyPresets
})


createApp(App).use(vuetify).use(router).mount('#app')
