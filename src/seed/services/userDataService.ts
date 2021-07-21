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

export const users = {
  async register(email: string, password: string, confirmation: string) {
    return await base.query<User>('user', `
    mutation{
      createUser(email: "${email}",
         password:${password},
         confirmation:"${confirmation}"}){
          ukey,
          confirm_token
      }
    }
    `)
  },
  async login(email: string, password: string) {
    const user = await base.query<User>('user', `
    mutation{
      login(email:"${email}", password:"${password}"){
       ukey,
       access_token
     }
   }
    `);
    
    return user;
  },
  async logout() {
    localStorage.removeItem('ukey');
  },
}