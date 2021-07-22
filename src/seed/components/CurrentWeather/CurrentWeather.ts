import Vue from 'vue';
import DailyForecast from '../DailyForecast';
export default Vue.extend({
    name: 'CurrentWeather',
    components:{DailyForecast},
    props:["currentWeather"]
});