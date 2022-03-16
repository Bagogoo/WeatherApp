import { buildSchema, validate } from "graphql";
import { User, Validate } from "../models/user";
import { pool } from "../db";
import { Result } from "../models/result";
import { hash, compare } from "bcryptjs";
import { UserForCreation } from "../models/userForCreation";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/sendMail";
export default {
  rootValue: {
    async getUserByKey({ ukey }: { ukey: string }): Promise<User | undefined> {
      const [row] = (
        await pool.query("SELECT * FROM users WHERE ukey = $1", [ukey])
      ).rows;
      return row;
    },
    async getUserByEmail({
      email, }: { email: string; }): Promise<User | undefined> {
      const [row] = (
        await pool.query("SELECT * FROM users WHERE email = $1", [email])
      ).rows;
      return row;
    },
    async register({ email, password, confirmation,
    }: { email: string, password: string, confirmation: string }): Promise<Result<any>> {
      if (password !== confirmation) {
        throw new Error("Hasła nie zgadzają się");
      }
      const u = await this.getUserByEmail({ email });
      if (u != undefined) {
        throw new Error("Użytkownik o podanym mailu istnieje");
      }
      const hpass = await hash(password, 12);
      const user: UserForCreation = {
        email: email,
        password: hpass,
        ukey: uuidv4()
      };
      const [row] = await this.query<User>('INSERT INTO users (ukey, email, password) VALUES ($1, $2, $3) RETURNING  ukey, email, password', [user.ukey, user.email, user.password]);
      await pool.query("INSERT INTO sessions (ukey, expires) values ($1,(NOW()+ interval '3 hour'))", [user.ukey])
      await sendEmail(user.email, "http://localhost:8080/#/confirm/"+user.ukey);
      const result: Result<any> = {
        data: {
          ukey: row.ukey,
          confirm_token: 'ConfirmToken'
        }, status: 200
      }
      return result.data;
    },

    async confirm({ ukey }: { ukey: string }, context: any) {
      const user = await this.getUserByKey({ ukey });
      if (user === undefined) {
        throw new Error("Użytkownik nie istnieje");
      }
      if (user.confirm === true) {
        throw Error("Użytkownik już potwierdzony");
      }
      const success = await this.query<User>("UPDATE Users SET confirm=true where ukey= $1", [ukey]);
      if (!success) {
        throw Error("Wystąpił błąd");
      }
      return true;
    },

    async login(
      { email, password }: { email: string; password: string }, context: any
    ) {
      const user = await this.getUserByEmail({ email });
      if (user === undefined) {
        context.res.status(400);
        throw new Error("Użytkownik nie istnieje");
      }
      if (user.confirm === false) {
        context.res.status(400);
        throw new Error("Użytkownik niepotwierdzony");
      }
      const valid = await compare(password, user.password);
      if (valid) {
        await pool.query("UPDATE sessions SET expires=(NOW()+ interval '3 hour') where ukey = $1", [user.ukey])
        const accessToken = `accesss-token-${user.ukey}`;
        const result: Result<any> = {
          data:
            { ukey: user.ukey, access_token: accessToken},
          status: 200
        }
        context.res.status(200);
       
        return result.data;
      }
      else {
        context.res.status(400);
        throw new Error("Hasło nieprawidłowe");
      }
    },
    async validate({ ukey }: { ukey: string }, context: any){
      const now = Date.now();
      const [row] =(
        await pool.query<Validate>("SELECT expires FROM sessions WHERE ukey = $1", [ukey])
      ).rows;
      if (row === undefined || now > row.expires) {
        context.res.status(400);
        throw new Error("Sesja wygasła");
      } else return true;
    },
    async saveCities({ukey, cities }: {ukey:string, cities:string}) {
      const success = await this.query("UPDATE Users SET cities=$1 where ukey = $2", [cities, ukey]);
      if (!success) {
        throw Error("Wystąpił błąd podczas zapisywania");
      }
      return true;
    },
    async profile(ukey: { ukey: string }, context: any) {
      const user = await this.getUserByKey(ukey);
      if (user === undefined) {
        context.res.status(404);
        throw new Error('Użytkownik nieprawidłowy')
      }
      return user;
    },
    async query<T>(command: string, values?: any[]) {
      const result = await pool.query<T>(command, values);
      return result.rows;
    },
  },
  schema: buildSchema(require("../graphql/user.gql")),
};
