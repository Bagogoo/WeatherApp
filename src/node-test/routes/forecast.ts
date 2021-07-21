import { buildSchema } from "graphql";
import fetch from 'node-fetch';

interface Hour {
  time: Date,
  temp_c: number,
  condition: {
    text: string,
    icon: string,
    code: number
  },
  wind_kph: number,
  wind_degree: number,
  wind_dir: string,
  pressure_mb: number,
  precip_mm: number,
  humidity: number,
  cloud: number,
  feelslike_c: number,
  windchill_c: number,
  heatindex_c: number,
  dewpoint_c: number,
  will_it_rain: number,
  chance_of_rain: string,
  will_it_snow: number,
  chance_of_snow: string,
  vis_km: number,
  gust_kph: number,
  uv: number
}

interface ForecastDay {
  date: Date,
  day: {
    maxtemp_c: number,
    mintemp_c: number,
    avgtemp_c: number,
    maxwind_kph: number,
    totalprecip_mm: number,
    avgvis_km: number,
    avghumidity: number,
    daily_will_it_rain: number,
    daily_chance_of_rain: string,
    daily_will_it_snow: number,
    daily_chance_of_snow: string,
    condition: {
      text: string,
      icon: string,
      code: number
    }
  },
  hour: [Hour]
}

interface apiResponse {
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
  },
  forecast: {
    forecastday: [ForecastDay]
  }
}
export default {
  rootValue: {
    async getForecast({ location }: { location: String }) {
      const requestOptions = {
        method: "GET"
      };
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b11f7c983a874854994103425211607&q=${location}&days=3&lang=pl`, requestOptions);

      const data: apiResponse = await response.json();
      return data;
    }
  },
  schema: buildSchema(require("../graphql/forecast.gql")),
}