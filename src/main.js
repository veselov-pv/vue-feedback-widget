import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// PrimeVue imports
import 'primevue/resources/themes/md-light-indigo/theme.css'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import InputTextarea from 'primevue/textarea'
import Button from 'primevue/button'

const app = createApp(App);

app.use(PrimeVue, { ripple: true });

app.component('InputText', InputText)
app.component('InputMask', InputMask)
app.component('InputNumber', InputNumber)
app.component('InputTextarea', InputTextarea)
app.component('Button', Button)

app.mount('#app');