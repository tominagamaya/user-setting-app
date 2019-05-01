import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate, { Validator } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faCheck, faCog, faQuestionCircle, faSignInAlt, faSearch, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faHome, faCheck, faCog, faQuestionCircle, faSignInAlt, faSearch, faEdit)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Validator.localize('ja', ja)
Vue.use(VeeValidate, { locale: ja })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
