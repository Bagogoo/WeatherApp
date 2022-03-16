import Vue from 'vue';
import { Forecast, forecastService } from '../../services/forecastDataservice';
import CurrentWeather from '../CurrentWeather';
import { BIcon, BIconBullseye, BIconXCircle } from 'bootstrap-vue';
import { users } from '../../services/userDataService';


interface Data {
    data: {
        forecast: Forecast[],
        locationArray: Array<string>,
        dataLoaded: boolean,
        location: string
    }
}

export default Vue.extend({
    name: 'Forecast',
    components: { CurrentWeather, BIcon, BIconBullseye, BIconXCircle },
    data(): Data {
        return {
            data: {
                forecast: [],
                locationArray: [],
                dataLoaded: false,
                location: ''
            }
        }
    },
    async created() {
        await this.getLocation();
        await this.getForecast();
    },
    methods: {
        async getForecast() {
            try {
                this.data.forecast.splice(0, this.data.forecast.length);
                this.data.locationArray.forEach((value) => {
                    forecastService.getForecast(value).then((response) => {
                        this.data.forecast?.push(response);
                        this.data.dataLoaded = true;
                        return response;
                    });
                })
            }  
            catch (error) {
                alert(error);
            }

        },
        async addCity() {
            this.data.locationArray.push(this.data.location);
            this.getForecast();
            this.data.location = '';
        },
        async getClientLocation() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.data.location = (`${position.coords.latitude}, ${position.coords.longitude}`);
                }
            )
        },
        saveCities() {
            if (localStorage.getItem('ukey')) {
                const ukey = localStorage.getItem('ukey');
                const cities = this.data.locationArray.toString();
                if (ukey !== null && cities !== '') {
                    users.saveCities(cities, ukey);
                    alert('Zapisano poprawnie');
                }
            }
            else alert('Musisz być zalogowany!');
        },
        deleteCity(index: number) {
            this.data.locationArray.splice(index, 1);
            this.getForecast();
        },
        async getLocation() {
            if (localStorage.getItem('ukey')) {
                const ukey = localStorage.getItem('ukey');
                if (ukey != null) {
                    await users.getProfile(ukey).then((response) => {
                        if (response != undefined) {
                            const str = response.profile.cities;
                            if (str != '') {
                                const arr: Array<string> = str.split(',');
                                arr.forEach((value) => {
                                    this.data.locationArray.push(value);
                                })
                            }
                        }
                    });
                }
            }
        },
        onKeydown(e: KeyboardEvent) {
            if (e.key === 'Enter') {
                this.addCity();
            }
        }
    }
});
