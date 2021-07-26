import { buildSchema } from "graphql";
import { User } from "../models/user";
import { pool } from "../db";
import { Result } from "../models/result";
import { hash, compare } from "bcryptjs";
import { UserForCreation } from "../models/userForCreation";
import { v4 as uuidv4 } from "uuid";
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
      const result: Result<any> = {
        data: {
          ukey: row.ukey,
          confirm_token: 'ConfirmToken'
        }, status: 200
      }
      return result.data;
    },

    async confirm({ email }: { email: string }, context: any) {
      const user = await this.getUserByEmail({ email });
      if (user === undefined) {
        throw new Error("Użytkownik nie istnieje");
      }
      if (user.confirmed === true) {
        throw Error("Użytkownik już potwierdzony");
      }
      const success = await this.query<User>("UPDATE Users SET confirm=true where email = $1", [email]);
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
      if (user.confirmed === false) {
        context.res.status(400);
        throw new Error("Użytkownik niepotwierdzony");
      }
      const valid = await compare(password, user.password);
      if (valid) {
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
