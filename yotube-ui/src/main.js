import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import GAuth from 'vue-google-oauth2'
 
const gauthOption = {
  clientId: 'CLIENT_ID.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.config.productionTip = false
//Socket Config
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
