import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'normalize-scss'
import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
import {
  firestorePlugin
} from 'vuefire'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import AsyncComputed from 'vue-async-computed'
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';


import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);



const toastOptions = {
  transition: "Vue-Toastification__slideBlurred",
  maxToasts: 3,
  newestOnTop: true,
};


Vue.use(Toast, toastOptions);
Vue.use(firestorePlugin)
Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});
Vue.use(AsyncComputed)
Vue.use(VueFilterDateFormat);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

