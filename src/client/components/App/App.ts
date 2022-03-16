import Vue from 'vue';
import { BootstrapVue} from 'bootstrap-vue';
import Nav from '../Nav';
import Footer from '../Footer'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);


export default Vue.extend({
  name: 'App',
  components: { Nav, Footer }
});

