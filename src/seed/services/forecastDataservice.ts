interface GraphQLError {
  message: string;
}

export interface GraphQLQueryResponse<T extends {} = {}> {
  data: T;
  errors?: GraphQLError[];
}

export interface User {
  ukey: string,
  access_token: string
}
export interface Forecast {
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
export interface LoginResponse {
  user: User;
}

export interface RegisterResponse {
  ukey: string,
  confirm_token: string
}

interface Base {
  address: string;
  query<T extends {} = {}>(domain: string, query: string, variables?: {}): Promise<T>;
}

const base: Base = {
  address: 'http://localhost:3000',
  async query<T extends {} = {}>(domain: any, query: any, variables: any) {
    const res = await fetch(`${this.address}/${domain}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    });

    if (res.status === 404) {
      throw Error(await res.text());
    }

    const json: GraphQLQueryResponse<T> = await res.json();

    if (json.errors) {
      throw Error(json.errors[0].message);
    }

    return json.data;
  }
};

export const forecastService = {
  async getForecast(location: string) {
    return await base.query<Promise<Forecast>>('forecast', `
   query{
  getForecast(location:"${location}"){
  location{
  name
	region
  country
  localtime
}
  current{
    temp_c
    condition{
      text
      icon
    }
    wind_kph
    humidity
    cloud
    feelslike_c
    precip_mm
  }
}
}
    `);
  }
}