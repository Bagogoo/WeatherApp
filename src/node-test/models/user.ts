export interface User {
  id: number;
  ukey: string;
  email: string;
  refreshIndex:string;
  password: string;
  confirmed: boolean;
}