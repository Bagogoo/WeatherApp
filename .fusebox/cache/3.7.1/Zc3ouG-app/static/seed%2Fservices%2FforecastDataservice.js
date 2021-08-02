module.exports = { contents: "\"use strict\";\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.forecastService = void 0;\r\nconst base = {\r\n    address: 'http://localhost:3000',\r\n    query(domain, query, variables) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const res = yield fetch(`${this.address}/${domain}`, {\r\n                method: 'POST',\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                },\r\n                body: JSON.stringify({ query, variables })\r\n            });\r\n            if (res.status === 404) {\r\n                throw Error(yield res.text());\r\n            }\r\n            const json = yield res.json();\r\n            if (json.errors) {\r\n                throw Error(json.errors[0].message);\r\n            }\r\n            return json.data;\r\n        });\r\n    }\r\n};\r\nexports.forecastService = {\r\n    getForecast(location) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield base.query('forecast', `\r\n   query{\r\n  getForecast(location:\"${location}\"){\r\n  location{\r\n  name\r\n\tregion\r\n  country\r\n  localtime\r\n}\r\n  current{\r\n    temp_c\r\n    condition{\r\n      text\r\n      icon\r\n    }\r\n    wind_kph\r\n    humidity\r\n    cloud\r\n    feelslike_c\r\n    precip_mm\r\n  }\r\n  forecast{\r\n    forecastday{\r\n      date\r\n      day{\r\n        avgtemp_c\r\n        avghumidity\r\n        daily_will_it_rain\r\n        condition{\r\n          text\r\n          icon\r\n        }\r\n      }\r\n      hour{\r\n        time\r\n        temp_c\r\n        condition{\r\n          text\r\n          icon\r\n        }\r\n        humidity\r\n      }\r\n    }\r\n  }\r\n}\r\n}\r\n    `);\r\n        });\r\n    }\r\n};\r\n//# sourceMappingURL=forecastDataservice.js.map",
dependencies: [],
sourceMap: "{\"version\":3,\"file\":\"seed/services/forecastDataservice.js\",\"sourceRoot\":\"../../\",\"sources\":[\"src/seed/services/forecastDataservice.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;AA8GA,MAAM,IAAI,GAAS;IACjB,OAAO,EAAE,uBAAuB;IAC1B,KAAK,CAAoB,MAAW,EAAE,KAAU,EAAE,SAAc;;YACpE,MAAM,GAAG,GAAG,MAAM,KAAK,CAAC,GAAG,IAAI,CAAC,OAAO,IAAI,MAAM,EAAE,EAAE;gBACnD,MAAM,EAAE,MAAM;gBACd,OAAO,EAAE;oBACP,cAAc,EAAE,kBAAkB;iBACnC;gBACD,IAAI,EAAE,IAAI,CAAC,SAAS,CAAC,EAAE,KAAK,EAAE,SAAS,EAAE,CAAC;aAC3C,CAAC,CAAC;YAEH,IAAI,GAAG,CAAC,MAAM,KAAK,GAAG,EAAE;gBACtB,MAAM,KAAK,CAAC,MAAM,GAAG,CAAC,IAAI,EAAE,CAAC,CAAC;aAC/B;YAED,MAAM,IAAI,GAA4B,MAAM,GAAG,CAAC,IAAI,EAAE,CAAC;YAEvD,IAAI,IAAI,CAAC,MAAM,EAAE;gBACf,MAAM,KAAK,CAAC,IAAI,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,OAAO,CAAC,CAAC;aACrC;YAED,OAAO,IAAI,CAAC,IAAI,CAAC;QACnB,CAAC;KAAA;CACF,CAAC;AAEW,QAAA,eAAe,GAAG;IACvB,WAAW,CAAC,QAAgB;;YAChC,OAAO,MAAM,IAAI,CAAC,KAAK,CAAoB,UAAU,EAAE;;0BAEjC,QAAQ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;KA4C7B,CAAC,CAAC;QACL,CAAC;KAAA;CACF,CAAA\",\"sourcesContent\":[\"interface GraphQLError {\\r\\n  message: string;\\r\\n}\\r\\n\\r\\nexport interface GraphQLQueryResponse<T extends {} = {}> {\\r\\n  data: T;\\r\\n  errors?: GraphQLError[];\\r\\n}\\r\\n\\r\\ninterface Hour {\\r\\n  time: Date,\\r\\n  temp_c: number,\\r\\n  condition: {\\r\\n    text: string,\\r\\n    icon: string,\\r\\n    code: number\\r\\n  },\\r\\n  wind_kph: number,\\r\\n  wind_degree: number,\\r\\n  wind_dir: string,\\r\\n  pressure_mb: number,\\r\\n  precip_mm: number,\\r\\n  humidity: number,\\r\\n  cloud: number,\\r\\n  feelslike_c: number,\\r\\n  windchill_c: number,\\r\\n  heatindex_c: number,\\r\\n  dewpoint_c: number,\\r\\n  will_it_rain: number,\\r\\n  chance_of_rain: string,\\r\\n  will_it_snow: number,\\r\\n  chance_of_snow: string,\\r\\n  vis_km: number,\\r\\n  gust_kph: number,\\r\\n  uv: number\\r\\n}\\r\\n\\r\\ninterface ForecastDay {\\r\\n  date: Date,\\r\\n  day: {\\r\\n    maxtemp_c: number,\\r\\n    mintemp_c: number,\\r\\n    avgtemp_c: number,\\r\\n    maxwind_kph: number,\\r\\n    totalprecip_mm: number,\\r\\n    avgvis_km: number,\\r\\n    avghumidity: number,\\r\\n    daily_will_it_rain: number,\\r\\n    daily_chance_of_rain: string,\\r\\n    daily_will_it_snow: number,\\r\\n    daily_chance_of_snow: string,\\r\\n    condition: {\\r\\n      text: string,\\r\\n      icon: string,\\r\\n      code: number\\r\\n    }\\r\\n  },\\r\\n  hour: [Hour]\\r\\n}\\r\\n\\r\\nexport interface Forecast {\\r\\n  location: {\\r\\n      name: string,\\r\\n      region: string,\\r\\n      country: string,\\r\\n      lat: number,\\r\\n      lon: number,\\r\\n      tz_id: string,\\r\\n      localtime_epoch: number,\\r\\n      localtime: string\\r\\n  },\\r\\n  current: {\\r\\n      last_updated_epoch: number,\\r\\n      last_updated: string,\\r\\n      temp_c: number,\\r\\n      temp_f: number,\\r\\n      is_day: boolean,\\r\\n      condition: {\\r\\n          text: string,\\r\\n          icon: string,\\r\\n          code: number\\r\\n      },\\r\\n      wind_mph: number,\\r\\n      wind_kph: number,\\r\\n      wind_degree: number,\\r\\n      wind_dir: string,\\r\\n      pressure_mb: number,\\r\\n      pressure_in: number,\\r\\n      precip_mm: number,\\r\\n      precip_in: number,\\r\\n      humidity: number,\\r\\n      cloud: number,\\r\\n      feelslike_c: number,\\r\\n      feelslike_f: number,\\r\\n      vis_km: number,\\r\\n      vis_miles: number,\\r\\n      uv: number,\\r\\n      gust_mph: number,\\r\\n      gust_kph: number\\r\\n  },\\r\\n  forecast: {\\r\\n      forecastday: [ForecastDay]\\r\\n  }\\r\\n}\\r\\n\\r\\ninterface Base {\\r\\n  address: string;\\r\\n  query<T extends {} = {}>(domain: string, query: string, variables?: {}): Promise<T>;\\r\\n}\\r\\n\\r\\nconst base: Base = {\\r\\n  address: 'http://localhost:3000',\\r\\n  async query<T extends {} = {}>(domain: any, query: any, variables: any) {\\r\\n    const res = await fetch(`${this.address}/${domain}`, {\\r\\n      method: 'POST',\\r\\n      headers: {\\r\\n        'Content-Type': 'application/json'\\r\\n      },\\r\\n      body: JSON.stringify({ query, variables })\\r\\n    });\\r\\n\\r\\n    if (res.status === 404) {\\r\\n      throw Error(await res.text());\\r\\n    }\\r\\n\\r\\n    const json: GraphQLQueryResponse<T> = await res.json();\\r\\n\\r\\n    if (json.errors) {\\r\\n      throw Error(json.errors[0].message);\\r\\n    }\\r\\n\\r\\n    return json.data;\\r\\n  }\\r\\n};\\r\\n\\r\\nexport const forecastService = {\\r\\n  async getForecast(location: string) {\\r\\n    return await base.query<Promise<Forecast>>('forecast', `\\r\\n   query{\\r\\n  getForecast(location:\\\"${location}\\\"){\\r\\n  location{\\r\\n  name\\r\\n\\tregion\\r\\n  country\\r\\n  localtime\\r\\n}\\r\\n  current{\\r\\n    temp_c\\r\\n    condition{\\r\\n      text\\r\\n      icon\\r\\n    }\\r\\n    wind_kph\\r\\n    humidity\\r\\n    cloud\\r\\n    feelslike_c\\r\\n    precip_mm\\r\\n  }\\r\\n  forecast{\\r\\n    forecastday{\\r\\n      date\\r\\n      day{\\r\\n        avgtemp_c\\r\\n        avghumidity\\r\\n        daily_will_it_rain\\r\\n        condition{\\r\\n          text\\r\\n          icon\\r\\n        }\\r\\n      }\\r\\n      hour{\\r\\n        time\\r\\n        temp_c\\r\\n        condition{\\r\\n          text\\r\\n          icon\\r\\n        }\\r\\n        humidity\\r\\n      }\\r\\n    }\\r\\n  }\\r\\n}\\r\\n}\\r\\n    `);\\r\\n  }\\r\\n}\"]}",
headerContent: undefined,
mtime: 1626861944660,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}