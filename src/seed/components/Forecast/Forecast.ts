import Vue from 'vue';
import { forecastService } from '../../services/forecastDataservice';

interface Forecast {
    location: {
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
        tz_id: string,
        localtime_epoch: number,
        localtime: string
    },
    current: {
        last_updated_epoch: number,
        last_updated: string,
        temp_c: number,
        temp_f: number,
        is_day: boolean,
        condition: {
            text: string,
            icon: string,
            code: number
        },
        wind_mph: number,
        wind_kph: number,
        wind_degree: number,
        wind_dir: string,
        pressure_mb: number,
        pressure_in: number,
        precip_mm: number,
        precip_in: number,
        humidity: number,
        cloud: number,
        feelslike_c: number,
        feelslike_f: number,
        vis_km: number,
        vis_miles: number,
        uv: number,
        gust_mph: number,
        gust_kph: number
    }
}

interface Data {
    data: {
        forecast: Forecast[],
        location: string,
        dataLoaded: boolean
    }
}

export default Vue.extend({
    name: 'Forecast',
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
            }));
            console.log(this.data.forecast);
        }
    }

});
