import { getDirectiveValues, validate } from "graphql";
import { getParsedCommandLineOfConfigFile } from "typescript";
import { Validate } from "../../node-test/models/user";

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

export interface LoginResponse {
  login: {
    access_token: string;
    ukey: string;
  }
}
export interface Validation {
  validate: boolean
}
export interface Confirmation {
  confirm: boolean
}
export interface Profile {
  profile: {
    ukey: string;
    cities: string;
  }
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

export const users = {
  async register(email: string, password: string, confirmation: string) {
    return await base.query<User>('user', `
    mutation{
      register(email: "${email}",
         password:"${password}",
         confirmation:"${confirmation}"){
          ukey,
          confirm_token
      }
    }
    `)
  },
  async login(email: string, password: string) {
    const user = await base.query<LoginResponse>('user', `
    mutation{
      login(email:"${email}", password:"${password}"){
       ukey,
       access_token
     }
   }
    `);
  return user;
  },
  async validate(ukey: string | null) {
    if (ukey !== null) {
      const isValid = await base.query<Validation>('user', `query{
      validate(ukey: "${ukey}")}`);
      return isValid.validate;
    }
    else return false;
  },
  async confirm(email: string) {
    if (email !== null) {
      const isConfirm = await base.query<Confirmation>('user', `mutation{
        confirm(email:"${email}")
      }`);
      return isConfirm.confirm;
    }
    else return false;
  },
  async saveCities(cities: string, ukey: string) {
    if (cities != null && ukey != null) {
      return await base.query('user', `mutation{
        saveCities(cities:"${cities}", ukey:"${ukey}")
      }`);
    }
  },
  async getProfile(ukey: string) {
    if (ukey != null) {
      const profile = await base.query<Profile>('user', `query{
      profile(ukey: "${ukey}"){
        ukey
        cities
      }
    }`);
      return profile;
    }
  }
}