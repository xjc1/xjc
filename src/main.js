import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import less from 'less'

/*引入css*/
import 'element-ui/lib/theme-chalk/index.css'


/*插件配置*/
Vue.use(ElementUI);
Vue.use(less);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
