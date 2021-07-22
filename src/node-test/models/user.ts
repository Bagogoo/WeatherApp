export interface User {
  id: number;
  ukey: string;
  email: string;
  refreshIndex: string;
  cities: string;
  password: string;
  confirmed: boolean;
}