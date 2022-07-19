import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faCoffee } from '@fortawesome/pro-light-svg-icons';

const app = createApp(App)


// library.add(faHatWizard, faCoffee)


app.use(router);
// app.use(FontAwesomeIcon);
app.use(store);

app.mount('#app');
