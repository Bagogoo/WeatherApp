import Vue from 'vue';
import CurrentWeather from '../CurrentWeather';
import { Forecast, forecastService } from '../../services/forecastDataservice';

interface Data {
    data: {
        forecast: Forecast[],
    }
}

export default Vue.extend({
    name: 'Logged',
    components: {CurrentWeather},
    props: {
       ukey:String
    },
    data(): Data {
        return {
            data: {
                forecast:[],
            }
        }
    },
    methods: {
       
    }

});
