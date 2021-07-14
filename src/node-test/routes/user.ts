import { buildSchema } from "graphql";
import { User } from "../models/user";
import { pool } from "../db";
import { Result } from "../models/result";
import { hash, compare } from "bcryptjs";
import { UserForCreation } from "../models/userForCreation";
import { v4 as uuidv4 } from "uuid";
import { users } from ".";
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
    async register({
      email,
      password,
      confirmation,
    }: {
      email: string;
      password: string;
      confirmation: string;
    }) {
      if (password !== confirmation) {
        const result: Result<Error> = {
          data: Error("Podane hasła nie zgadzają się"),
          status: 400,
        };
        return result.data;
      }
      const u = await this.getUserByEmail({ email });
      if (u != undefined) {
        const result: Result<Error> = {
          data: Error("Użytkownik o podanym mailu istnieje"),
          status: 400,
        };
        return result.data;
      }
      const hpass = await hash(password, 12);
      const user: UserForCreation = {
        email: email,
        password: hpass,
        ukey: uuidv4()
      };
      const [row] = await this.query<User>('INSERT INTO users (ukey, email, password) VALUES ($1, $2, $3) RETURNING  ukey, email, password', [user.ukey, user.email, user.password]);
      return row;
    },

    async confirm({ email }: { email: string }, context: any) {
      const u = await this.getUserByEmail({ email });
      if (u === undefined) {
        const result: Result<Error> = {
          data: Error("Użytkownik nie istnieje"),
          status: 400,
        }
        return result.data;
      }
      if (u.confirmed === true) {
        const result: Result<Error> = {
          data: Error("Użytkownik potwierdzony"),
          status: 400,
        }
        return result.data;
      }
      const success = await this.query<User>("UPDATE Users SET confirm=true where email = $1", [email]);
      if (!success) {
        const result: Result<Error> = {
          data: Error("Wystąpił błąd"),
          status: 500,
        }
        return result.data;
      }
      return true;
    },

    async login(
      { email, password }: { email: string; password: string }
    ) {
      const u = await this.getUserByEmail({ email });
      if (u === undefined) {
        const result: Result<Error> = {
          data: Error("Użytkownik nie istnieje"),
          status: 400,
        }
        return result.data;
      }
      if (u.confirmed==false) {
        const result: Result<Error> = {
          data: Error("Użytkownik nie potwierdzony"),
          status: 401,
        }
        return result.data;
      }
      const valid = await compare(password, u.password);
      if (valid) {
        const accessToken = `accesss-token-${u.ukey}`;
        const result: Result<any> = {
          data:
            { ukey: u.ukey, access_token: accessToken },
          status: 200
        }
        return result.data;
      }
    },

    async profile({ ukey }: { ukey: string }, context: any) {
      return { ukey: "ukey", email: "email" };
    },
    async query<T>(command: string, values?: any[]) {
      const result = await pool.query<T>(command, values);
      return result.rows;
    },
  },
  schema: buildSchema(require("../graphql/user.gql")),
};
