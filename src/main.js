import { createApp } from 'vue'
import App from './App.vue'
import {store}  from './store/index.js'
import 'normalize.css'

import '../../root-shadow.css' // first
import '../../root-color.css'  

createApp(App).use(store).mount('#app')
