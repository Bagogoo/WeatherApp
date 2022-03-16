import Vue from 'vue';
import Hourly from '../Hourly';
export default Vue.extend({
    name: 'DailyForecast',
    components:{Hourly},
    props: ["dayWeather"]
});