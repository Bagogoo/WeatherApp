import Vue from 'vue';
import { Forecast, forecastService } from '../../services/forecastDataservice';
import CurrentWeather from '../CurrentWeather';
import { BIcon, BIconBullseye } from 'bootstrap-vue';


interface Data {
    data: {
        forecast: Forecast[],
        locationArray: Array<string>,
        dataLoaded: boolean,
        location:string
    }
}

export default Vue.extend({
    name: 'Forecast',
    components: { CurrentWeather, BIcon, BIconBullseye },
    props: {
        locationProp: String
    },
    data(): Data {
        return {
            data: {
                forecast: [],
                locationArray:[],
                dataLoaded: false,
                location:''
            }
        }
    },
    methods: {
            
        async getForecast() {
            this.data.locationArray.forEach((value) => {
                forecastService.getForecast(value).then((response) => {
                    this.data.forecast?.push(response);
                    this.data.dataLoaded = true;
                    return response;
                });
            })
            this.data.locationArray.splice(0, this.data.locationArray.length);
        },
        async addCity() {
            this.data.locationArray.push(this.data.location);
            this.getForecast();
            this.data.location = '';
         },
        async getLocation() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.data.location=( `${position.coords.latitude}, ${position.coords.longitude}`);
                }
            )
        },
        getCitiesFromProp(str: string) {
            if (str != '') {
                const arr: Array<string> = str.split(',');
                arr.forEach((value) => {
                    this.data.locationArray.push(value);
                })
            }
        },
        onKeydown(e: KeyboardEvent) {
            if (e.key === 'Enter') {
                this.getForecast();
            }
        }
    },
    beforeMount() {
        this.getCitiesFromProp(this.locationProp);
        this.getForecast();
    }
});
