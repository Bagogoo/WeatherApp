import Vue from 'vue';
import { Forecast, forecastService } from '../../services/forecastDataservice';
import CurrentWeather from '../CurrentWeather';
import { BIcon, BIconBullseye} from 'bootstrap-vue';
import { response } from 'express';


interface Data {
    data: {
        forecast: Forecast[],
        location: string,
        dataLoaded: boolean
    }
}

export default Vue.extend({
    name: 'Forecast',
    components: {CurrentWeather, BIcon, BIconBullseye},
    props: {
        locationProp: String
    },
    data(): Data {
        return {
            data: {
                forecast:[],
                location: this.locationProp,
                dataLoaded: false
            }
        }
    },
    methods: {
        async getForecast() {
            const forecastResponse = (await forecastService.getForecast(this.data.location).then((response) => {
                this.data.forecast?.push(response);
                this.data.dataLoaded = true;
                this.data.location = '';
            }));
        },
        async getLocation() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.data.location = `${position.coords.latitude}, ${position.coords.longitude}`;
                }
            )
        },
        onKeydown(e: KeyboardEvent) {
           if(e.key === 'Enter') {
                this.getForecast();
            }
          }
    }

});
